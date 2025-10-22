export const SIMPLE_FEATURES = [
  {
    id: "cost",
    icon: "👛",
    title: "費用低減",
    description: "余計な食費を抑える",
    bgColor: "bg-green-100",
    href: "#feature-cost",
    ariaLabel: "費用低減の詳細説明へスクロール",
  },
  {
    id: "notification",
    icon: "⏰",
    title: "期限通知",
    description: "忘れずに消費",
    bgColor: "bg-orange-100",
    href: "#feature-notification",
    ariaLabel: "通知機能の詳細説明へスクロール",
  },
  {
    id: "inventory",
    icon: "📊",
    title: "在庫管理",
    description: "一目で把握",
    bgColor: "bg-blue-100",
    href: "#feature-inventory",
    ariaLabel: "在庫管理の詳細説明へスクロール",
  },
] as const;

export const DETAILED_FEATURES = [
  {
    id: "cost",
    icon: "👛",
    title: "費用低減機能",
    color: "green",
    bgColor: "bg-green-50",
    sections: [
      {
        title: "主な機能",
        items: [
          "月間食費の自動集計と可視化",
          "カテゴリー別支出分析",
          "無駄な買い物の特定",
          "節約目標の設定と進捗管理",
        ],
      },
      {
        title: "期待できる効果",
        items: ["平均20%の食費削減", "重複購入の防止", "計画的な買い物の実現"],
      },
    ],
  },
  {
    id: "notification",
    icon: "⏰",
    title: "期限通知機能",
    color: "orange",
    bgColor: "bg-orange-50",
    sections: [
      {
        title: "通知タイミング",
        items: [
          "賞味期限3日前に通知",
          "消費期限当日に緊急通知",
          "まとめて消費するべき食品の提案",
        ],
      },
      {
        title: "対応方法の提案",
        items: [
          "すぐに使える簡単レシピ",
          "冷凍保存のアドバイス",
          "他の食材との組み合わせ提案",
        ],
      },
    ],
  },
  {
    id: "inventory",
    icon: "📊",
    title: "在庫管理機能",
    color: "blue",
    bgColor: "bg-blue-50",
    sections: [
      {
        title: "登録方法",
        items: [
          "バーコード読み取りで簡単登録",
          "音声入力対応",
          "写真からの文字認識",
          "手動入力も簡単",
        ],
      },
      {
        title: "管理機能",
        items: [
          "カテゴリー別在庫一覧",
          "買い物リスト自動作成",
          "消費ペースの分析",
          "在庫切れ予測",
        ],
      },
    ],
  },
] as const;

export type SimpleFeature = (typeof SIMPLE_FEATURES)[number];

export type DetailedFeature = (typeof DETAILED_FEATURES)[number];
