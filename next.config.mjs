// const removeImports = require("next-remove-imports")();
import nextRemoveImports from "next-remove-imports";
const removeImports = nextRemoveImports();
/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/ant-design/ant-design/issues/46053
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
    "rc-form",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default removeImports(nextConfig);
