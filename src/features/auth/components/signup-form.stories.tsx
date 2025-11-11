import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, mocked, userEvent, within } from "storybook/test";

import { SignupAction } from "#auth-actions";

import { SignupForm } from "./signup-form";

const meta = {
  title: "Features/Auth/SignupForm",
  component: SignupForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  beforeEach: async () => {
    mocked(SignupAction).mockClear();
  },
} satisfies Meta<typeof SignupForm>;
export default meta;

type Story = StoryObj<typeof meta>;

const playSubmit: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "登録" }));
};

const playFillName: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByLabelText("ユーザー名"), "テストユーザー");
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
  await userEvent.type(canvas.getByLabelText("パスワード"), "Password123");
};

const playFillConfirmPassword: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    canvas.getByLabelText("確認用パスワード"),
    "Password123",
  );
};

const playFillAll: Story["play"] = async (args) => {
  await playFillName(args);
  await playFillEmail(args);
  await playFillPassword(args);
  await playFillConfirmPassword(args);
};

export const Default: Story = {};

export const EmptyValidation: Story = {
  play: async (args) => {
    await playSubmit(args);
    const canvas = within(args.canvasElement);

    await expect(
      canvas.getByText("ユーザー名を入力して下さい"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("メールアドレスを入力して下さい"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("パスワードを入力して下さい"),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("確認用パスワードを入力して下さい"),
    ).toBeInTheDocument();
  },
};

export const NameTooLong: Story = {
  play: async (args) => {
    const canvas = within(args.canvasElement);

    await userEvent.type(
      canvas.getByLabelText("ユーザー名"),
      "とても長いユーザー名です",
    );

    await userEvent.click(canvas.getByLabelText("メールアドレス"));

    await expect(
      canvas.getByText("ユーザー名は10文字以内でお願いします"),
    ).toBeInTheDocument();
  },
};

export const InvalidEmail: Story = {
  play: async (args) => {
    const canvas = within(args.canvasElement);

    await playFillName(args);
    await userEvent.type(
      canvas.getByLabelText("メールアドレス"),
      "invalid-email",
    );
    await userEvent.click(canvas.getByLabelText("パスワード"));

    await expect(
      canvas.getByText("メールアドレスの形式が不正です"),
    ).toBeInTheDocument();
  },
};

export const WeakPassword: Story = {
  play: async (args) => {
    const canvas = within(args.canvasElement);

    await playFillName(args);
    await playFillEmail(args);
    await userEvent.type(canvas.getByLabelText("パスワード"), "weak");
    await userEvent.click(canvas.getByLabelText("確認用パスワード"));

    await expect(
      canvas.getByText(
        "少なくとも1つの英字、1つの数字を含んでいる必要があります",
      ),
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("パスワードは8文字以上でお願いします"),
    ).toBeInTheDocument();
  },
};

export const PasswordMismatch: Story = {
  play: async (args) => {
    const canvas = within(args.canvasElement);

    await playFillName(args);
    await playFillEmail(args);
    await userEvent.type(canvas.getByLabelText("パスワード"), "Password123");
    await userEvent.type(
      canvas.getByLabelText("確認用パスワード"),
      "Different456",
    );
    await userEvent.click(canvas.getByLabelText("ユーザー名"));

    await expect(
      canvas.getByText("パスワードが一致しません"),
    ).toBeInTheDocument();
  },
};

export const SuccessfulSignup: Story = {
  play: async (args) => {
    await playFillAll(args);
    await playSubmit(args);

    const canvas = within(args.canvasElement);

    await expect(
      canvas.queryByText("ユーザー名を入力して下さい"),
    ).not.toBeInTheDocument();

    await expect(
      canvas.queryByText("メールアドレスを入力して下さい"),
    ).not.toBeInTheDocument();

    await expect(SignupAction).toHaveBeenCalled();
  },
};
