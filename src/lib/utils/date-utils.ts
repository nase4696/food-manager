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

  // 日本時間で今日の日付部分のみを取得
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // 期限日の日付部分のみを取得（日本時間として）
  const expiry = new Date(expiryDate);
  const expiryYear = expiry.getFullYear();
  const expiryMonth = expiry.getMonth();
  const expiryDateNum = expiry.getDate();

  // 日付部分のみで比較
  const todayPure = new Date(todayYear, todayMonth, todayDate);
  const expiryPure = new Date(expiryYear, expiryMonth, expiryDateNum);

  const diffTime = expiryPure.getTime() - todayPure.getTime();
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
