export function getEndOfDay(date: Date): Date {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
}

export function getStartOfDay(date: Date): Date {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
}

export function getEndOfDaysLater(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return getEndOfDay(date);
}

export function getStartOfDaysLater(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return getStartOfDay(date);
}

export function getDaysRemaining(expiryDate: Date | null): number | null {
  if (!expiryDate) return null;

  const today = getStartOfDay(new Date());
  const expiry = getStartOfDay(new Date(expiryDate));
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function getExpiryStatus(expiryDate: Date | null): {
  status: "safe" | "warning" | "urgent" | "expired";
  daysRemaining: number | null;
} {
  const daysRemaining = getDaysRemaining(expiryDate);

  if (daysRemaining === null) {
    return { status: "safe", daysRemaining: null };
  }

  if (daysRemaining < 0) {
    return { status: "expired", daysRemaining };
  } else if (daysRemaining <= 3) {
    return { status: "urgent", daysRemaining };
  } else if (daysRemaining <= 7) {
    return { status: "warning", daysRemaining };
  } else {
    return { status: "safe", daysRemaining };
  }
}
