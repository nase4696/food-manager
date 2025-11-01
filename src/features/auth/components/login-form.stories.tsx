import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, mocked, userEvent, within } from "storybook/test";

import { LoginAction } from "#auth-actions";

import { LoginForm } from "./login-form";

const meta = {
  title: "Features/Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  beforeEach: async () => {
    mocked(LoginAction).mockClear();
  },
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

const playSubmit: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
};

const playFillEmail: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    canvas.getByLabelText("メールアドレス"),
    "test@example.com",
  );
};

const playFillPassword: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByLabelText("パスワード"), "password123");
};

const playFillAll: Story["play"] = async (args) => {
  await playFillEmail(args);
  await playFillPassword(args);
};

const playInvalidEmail: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByLabelText("メールアドレス"), "invalidEmail");
};

export const Default: Story = {};

export const EmptyValidation: Story = {
  play: async (args) => {
    await playSubmit(args);
    const canvas = within(args.canvasElement);

    await expect(
      canvas.getByText("メールアドレスを入力して下さい"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("パスワードを入力して下さい"),
    ).toBeInTheDocument();
  },
};

export const InvalidEmail: Story = {
  play: async (args) => {
    await playInvalidEmail(args);
    await playSubmit(args);

    const canvas = within(args.canvasElement);

    await expect(
      canvas.getByText("メールアドレスの形式が不正です"),
    ).toBeInTheDocument();
  },
};

export const SuccessfulLogin: Story = {
  play: async (args) => {
    await playFillAll(args);
    await playSubmit(args);

    const canvas = within(args.canvasElement);

    await expect(
      canvas.queryByText("メールアドレスを入力して下さい"),
    ).not.toBeInTheDocument();

    await expect(
      canvas.queryByText("パスワードを入力して下さい"),
    ).not.toBeInTheDocument();

    await expect(LoginAction).toHaveBeenCalled();
  },
};
