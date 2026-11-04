import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const MAX_DIGITS = 12;
const MAX_HISTORY = 50;
const HISTORY_KEY = 'calculator_history';

// Evalúa una lista como ['2', '+', '3', '×', '4'] respetando el orden de operaciones
const evaluate = (tokens: string[]): number => {
  const nums: number[] = [parseFloat(tokens[0])];
  const ops: string[] = [];

  // Paso 1: resolver × y ÷ primero, guardar + y - para después
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const n = parseFloat(tokens[i + 1]);
    if (op === '×') {
      nums[nums.length - 1] *= n;
    } else if (op === '÷') {
      if (n === 0) return NaN; // división entre 0
      nums[nums.length - 1] /= n;
    } else {
      ops.push(op);
      nums.push(n);
    }
  }

  // Paso 2: resolver + y - de izquierda a derecha
  let result = nums[0];
  ops.forEach((op, i) => {
    result = op === '+' ? result + nums[i + 1] : result - nums[i + 1];
  });
  return result;
};

// Da formato al resultado: redondea, evita decimales raros y usa notación científica si es muy grande/pequeño
const format = (n: number): string => {
  if (!Number.isFinite(n)) return 'Error';
  const rounded = parseFloat(n.toPrecision(12));
  const abs = Math.abs(rounded);
  if (abs >= 1e12 || (abs !== 0 && abs < 1e-6)) return rounded.toExponential(3);
  return String(rounded);
};

export default function useCalculator() {
  const [tokens, setTokens] = useState<string[]>([]);        // operación en curso: ['2', '+', '3', '×']
  const [current, setCurrent] = useState('0');               // número que se está escribiendo ('' = esperando uno nuevo)
  const [justEvaluated, setJustEvaluated] = useState(false); // true justo después de presionar "="
  const [history, setHistory] = useState<string[]>([]);

  const hasError = current === 'Error';

  // Al abrir la app, carga el historial guardado
  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY)
      .then((saved) => {
        if (saved) setHistory(JSON.parse(saved));
      })
      .catch(() => {});
  }, []);

  // Actualiza el historial en pantalla y lo guarda en el celular
  const saveHistory = (list: string[]) => {
    setHistory(list);
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(list)).catch(() => {});
  };

  const clearHistory = () => saveHistory([]);

  const clear = () => {
    setTokens([]);
    setCurrent('0');
    setJustEvaluated(false);
  };

  const pressNumber = (digit: string) => {
    if (justEvaluated) {
      // Después de "=", escribir un número empieza una operación nueva
      setTokens([]);
      setJustEvaluated(false);
      setCurrent(digit);
      return;
    }
    if (current === '' || current === '0') return setCurrent(digit);
    if (current === '-0') return setCurrent('-' + digit);
    if (current.replace(/[-.]/g, '').length >= MAX_DIGITS) return;
    setCurrent(current + digit);
  };

  const pressDot = () => {
    if (justEvaluated) {
      setTokens([]);
      setJustEvaluated(false);
      setCurrent('0.');
      return;
    }
    if (current === '') return setCurrent('0.');
    if (current === '-') return setCurrent('-0.');
    if (!current.includes('.')) setCurrent(current + '.');
  };

  const pressOperator = (op: string) => {
    // Después de "=", se sigue operando con el resultado
    if (justEvaluated) {
      setTokens([current, op]);
      setCurrent('');
      setJustEvaluated(false);
      return;
    }

    // Se presionó un operador y luego otro: se cambia, o se inicia un negativo (5 × -3)
    if (current === '') {
      const last = tokens[tokens.length - 1];
      if (op === '-' && (last === '×' || last === '÷')) {
        setCurrent('-');
      } else {
        setTokens([...tokens.slice(0, -1), op]);
      }
      return;
    }

    // Negativo al inicio: -5 + 2
    if (op === '-' && current === '0' && tokens.length === 0) {
      setCurrent('-');
      return;
    }
    if (current === '-') return;

    setTokens([...tokens, format(parseFloat(current)), op]);
    setCurrent('');
  };

  const pressEquals = () => {
    // No hace nada si no hay operación completa
    if (justEvaluated || tokens.length === 0 || current === '' || current === '-') return;

    const full = [...tokens, format(parseFloat(current))];
    const result = format(evaluate(full));

    setTokens(full);
    setCurrent(result);
    setJustEvaluated(true);

    if (result !== 'Error') {
      saveHistory([`${full.join(' ')} = ${result}`, ...history].slice(0, MAX_HISTORY));
    }
  };

  const percent = () => {
    if (current === '' || current === '-') return;
    setCurrent(format(parseFloat(current) / 100));
    if (justEvaluated) {
      setTokens([]);
      setJustEvaluated(false);
    }
  };

  const backspace = () => {
    if (justEvaluated || current.includes('e')) return;

    // Si se acaba de presionar un operador, DEL lo quita y devuelve el número anterior
    if (current === '') {
      const rest = tokens.slice(0, -1);
      setCurrent(rest[rest.length - 1]);
      setTokens(rest.slice(0, -1));
      return;
    }

    if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) {
      setCurrent(tokens.length > 0 ? '' : '0');
      return;
    }
    setCurrent(current.slice(0, -1));
  };

  const handlePress = (label: string) => {
    // Con "Error" solo se puede usar AC
    if (hasError && label !== 'AC') return;

    if (label.length === 1 && label >= '0' && label <= '9') return pressNumber(label);

    switch (label) {
      case '.': return pressDot();
      case 'AC': return clear();
      case 'DEL': return backspace();
      case '%': return percent();
      case '=': return pressEquals();
      default: return pressOperator(label); // + - × ÷
    }
  };

  // Lo que ve el usuario
  const display = current !== '' ? current : tokens[tokens.length - 2];
  const expression = tokens.join(' ') + (justEvaluated ? ' =' : '');

  return { display, expression, history, handlePress, clearHistory };
}