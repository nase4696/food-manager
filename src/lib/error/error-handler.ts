import { AppError } from "./app-error";
import { logError } from "./logging";

export async function withErrorHandling<T>(
  operation: string,
  fn: () => Promise<T>,
  context?: Record<string, unknown>,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const appError = AppError.fromUnknown(error, {
      operation,
      ...context,
    });

    logError(appError);

    throw appError;
  }
}
