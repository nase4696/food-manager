type EmptyStateProps = {
  icon?: string;
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({
  icon = "📊",
  title,
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-gray-800 font-semibold text-lg mb-1">{title}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
