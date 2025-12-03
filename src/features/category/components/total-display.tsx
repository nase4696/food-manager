"use client";

interface TotalDisplayProps {
  total: number;
}

export function TotalDisplay({ total }: TotalDisplayProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-between text-sm text-gray-600">
        <span>合計食品数</span>
        <span className="font-semibold">{total}品</span>
      </div>
    </div>
  );
}
