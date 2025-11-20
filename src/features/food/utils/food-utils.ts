import { getDaysRemaining, getExpiryStatus } from "@/lib/utils/date-utils";

export function getFoodStatusStyles(expiryDate: Date | null) {
  const { status } = getExpiryStatus(expiryDate);

  switch (status) {
    case "urgent":
      return {
        border: "border-l-4 border-l-orange-500",
        badge: "bg-orange-100 text-orange-800",
        text: "text-orange-700",
      };
    case "warning":
      return {
        border: "border-l-4 border-l-yellow-500",
        badge: "bg-yellow-100 text-yellow-800",
        text: "text-yellow-700",
      };
    case "expired":
      return {
        border: "border-l-4 border-l-red-500",
        badge: "bg-red-100 text-red-800",
        text: "text-red-700",
      };
    default:
      return {
        border: "border-l-4 border-l-green-500",
        badge: "bg-green-100 text-green-800",
        text: "text-green-700",
      };
  }
}

export function getFoodExpiryText(expiryDate: Date | null): string {
  if (!expiryDate) return "期限未設定";

  const daysRemaining = getDaysRemaining(expiryDate);
  const dateText = expiryDate.toLocaleDateString("ja-JP");

  if (daysRemaining === null) return `期限: ${dateText}`;
  if (daysRemaining < 0) return `期限切れ: ${dateText}`;
  if (daysRemaining === 0) return `期限当日: ${dateText}`;

  return `期限: ${dateText} (残り${daysRemaining}日)`;
}
