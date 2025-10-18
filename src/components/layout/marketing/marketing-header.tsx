export function MarketingHeader() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">🍎</span>
        </div>
        <span className="text-2xl font-bold text-green-800">FoodManager</span>
      </div>
      {/* <Button asChild variant="outline">
          <Link href="/login">サインイン</Link>
        </Button> */}
    </header>
  );
}
