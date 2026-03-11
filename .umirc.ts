import { defineConfig } from "umi";

export default defineConfig({
  title: "中台项目",
  favicons: ["/favicon.ico"],
  plugins: ["@umijs/plugins/dist/antd", "@umijs/plugins/dist/model"],
  antd: {},
  model: {},
});
