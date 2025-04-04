import { AppError } from './app-error';

export const MOCK_DURATION = 1000;
export const MOCK_NUMBER_ARRAY = [1, 2, 3];

interface ProcessWithDelayOptions {
  numbers?: number[];
  duration?: number;
  signal: AbortSignal;
  onProgress?: (current: number, total: number) => void;
}
/**
 *
 * @param numbers: Array of numbers
 * @param duration: Delay time
 * @param signal: Cancellation progress
 * @param onProgress: Tracking progress
 * @returns: Return a Promise and Resolve when all number in array are processed
 */
export default async function processWithDelay({
  numbers = MOCK_NUMBER_ARRAY,
  duration = MOCK_DURATION,
  signal,
  onProgress,
}: ProcessWithDelayOptions): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Validate input
    if (!Array.isArray(numbers)) {
      return reject(new AppError('Invalid input - Expected an array!'));
    }
    if (!numbers.every((num) => typeof num === 'number' && !isNaN(num))) {
      return reject(new AppError('Invalid input - All elements must be numbers!'));
    }
    if (numbers.length === 0) {
      return resolve();
    }
    // Set up cleaner function & abort handler
    let index = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
    const onAbort = () => {
      cleanup();
      return reject(new AppError('Aborted'));
    };
    if (signal.aborted) {
      return onAbort();
    }
    signal.addEventListener('abort', onAbort);
    // Handle logic
    const processNext = () => {
      if (signal.aborted) {
        cleanup();
        return;
      }
      if (index >= numbers.length) {
        cleanup();
        signal.removeEventListener('abort', onAbort);
        return resolve();
      }
      const seconds = ((index + 1) * duration) / 1000;
      const unit = seconds === 1 ? 'second' : 'seconds';
      console.log(`After ${seconds} ${unit}`);
      console.log('Number', numbers[index]);
      index++;
      onProgress?.(index, numbers.length);
      timeoutId = setTimeout(processNext, duration);
    };
    processNext();
  });
}

const abortController = new AbortController();

(async () => {
  try {
    await processWithDelay({
      numbers: [1, 2, 3, 4],
      duration: 1000,
      signal: abortController.signal,
      onProgress: (current, total) => {
        console.log(`Progress: ${current}/${total}`);
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      console.error('Processing error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
})();

setTimeout(() => abortController.abort(), 2500);
