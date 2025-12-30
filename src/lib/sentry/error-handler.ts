import * as Sentry from "@sentry/nextjs";

import { AppError } from "@/lib/error/app-error";

type ErrorContext = {
  userId?: string;
  component?: string;
  [key: string]: unknown;
};

export function captureError(error: unknown, context?: ErrorContext): void {
  if (error instanceof AppError) {
    Sentry.captureException(error, {
      tags: { type: error.type, code: error.code || "unknown" },
      extra: { ...error.context, ...context, userMessage: error.userMessage },
    });
    return;
  }

  if (error instanceof Error) {
    Sentry.captureException(error, { extra: context });
    return;
  }

  Sentry.captureException(new Error(String(error)), { extra: context });
}

export function setUserContext(user: { id: string; email?: string }) {
  Sentry.setUser({ id: user.id, email: user.email });
}

export function clearUserContext() {
  Sentry.setUser(null);
}

export function withSentryErrorBoundary<T>(
  operation: string,
  fn: () => Promise<T>,
  context?: ErrorContext,
): Promise<T> {
  return Sentry.startSpan({ name: operation, op: "function" }, async () => {
    try {
      return await fn();
    } catch (error) {
      captureError(error, { ...context, operation });
      throw error;
    }
  });
}
