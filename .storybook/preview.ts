import "@/styles/globals.css";
import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        query: { redirect_to: "/dashboard" },
      },
    },
  },
};

export default preview;
