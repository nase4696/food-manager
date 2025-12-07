type DataListItem = {
  name: string;
  value: number;
  color: string;
  percentage: string;
};

type DataListProps = {
  items: DataListItem[];
  title?: string;
};

export function DataList({ items, title = "詳細" }: DataListProps) {
  return (
    <div className="border-2 border-gray-200 rounded-xl p-2 h-full overflow-hidden flex flex-col">
      <h3 className="text-base font-semibold mb-3 text-gray-900">{title}</h3>
      <div className="space-y-2 overflow-y-auto pr-2 flex-1">
        {items.map((item) => (
          <div
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            key={item.name}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-gray-700 text-sm truncate">
                {item.name}
              </span>
            </div>
            <div className="text-right shrink-0 ml-2">
              <div className="font-semibold text-gray-900 text-sm">
                {item.value}個
              </div>
              <div className="text-xs text-gray-500">{item.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
