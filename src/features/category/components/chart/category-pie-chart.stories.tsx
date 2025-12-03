import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategoryPieChart } from "./category-pie-chart";

const meta = {
  title: "features/category/components/chart/category-pie-chart",
  component: CategoryPieChart,
  parameters: {
    layout: "padded", // centered → padded に変更
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// テスト用のサンプルデータ
const sampleData = [
  { name: "野菜", value: 15, color: "#22c55e" },
  { name: "肉", value: 8, color: "#ef4444" },
  { name: "魚", value: 5, color: "#3b82f6" },
  { name: "飲み物", value: 12, color: "#06b6d4" },
  { name: "調味料", value: 7, color: "#f59e0b" },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const MassData: Story = {
  args: {
    data: [
      { name: "野菜", value: 25, color: "#22c55e" },
      { name: "肉", value: 18, color: "#ef4444" },
      { name: "魚", value: 12, color: "#3b82f6" },
      { name: "飲み物", value: 22, color: "#06b6d4" },
      { name: "調味料", value: 15, color: "#f59e0b" },
      { name: "インスタント", value: 10, color: "#f97316" },
    ],
  },
};
