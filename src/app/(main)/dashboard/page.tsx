export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-lg p-4 md:p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">食品在庫</h2>
          <p className="text-2xl font-bold text-green-600">24品</p>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">期限間近</h2>
          <p className="text-2xl font-bold text-orange-600">3品</p>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">節約金額</h2>
          <p className="text-2xl font-bold text-blue-600">¥1,240</p>
        </div>
      </div>
    </div>
  );
}
