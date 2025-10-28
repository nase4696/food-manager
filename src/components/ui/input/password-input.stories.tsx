import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { PasswordInput } from "./password-input";

const meta = {
  title: "components/ui/password-input",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "入力前に表示されるヒントテキスト",
    },
    disabled: {
      control: "boolean",
      description: "入力の無効化状態",
    },
    "aria-invalid": {
      control: "boolean",
      description: "バリデーションエラー状態",
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "パスワードを入力",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    "aria-invalid": true,
  },
};

export const TogglePasswordVisibility: Story = {
  args: { placeholder: "テスト用パスワード" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("テスト用パスワード");
    const button = canvas.getByRole("button");

    await expect(input).toHaveAttribute("type", "password");

    await userEvent.click(button);
    await expect(input).toHaveAttribute("type", "text");

    await userEvent.click(button);
    await expect(input).toHaveAttribute("type", "password");
  },
};
