import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LoadingButton } from "./loading-button";

const meta = {
  title: "components/ui/button/loading-button",
  component: LoadingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "ローディング状態でない時に表示される内容",
    },
    loadingText: {
      description: "ローディング状態で表示されるテキスト",
    },
  },
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Click me",
    loading: true,
  },
};

export const LoadingWithText: Story = {
  args: {
    children: "Click me",
    loading: true,
    loadingText: "Loading...",
  },
};
