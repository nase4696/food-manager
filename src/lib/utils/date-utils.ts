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

export function getDaysRemaining(expiryDate: Date | null): number | null {
  if (!expiryDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

export function formatDaysRemaining(expiryDate: Date | null): string {
  if (!expiryDate) return "期限未設定";

  const days = getDaysRemaining(expiryDate);

  if (days === null) return "期限未設定";
  if (days < 0) return "期限切れ";
  if (days === 0) return "今日まで";
  return `残${days}日`;
}
