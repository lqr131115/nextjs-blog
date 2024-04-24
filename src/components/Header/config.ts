type NavConfig = {
  label: string;
  key: string;
  [key: string]: any;
};

export const nav: NavConfig[] = [
  {
    label: "首页",
    key: "/",
  },
  {
    label: "信息",
    key: "/info",
  },
  {
    label: "标签",
    key: "/tag",
  },
];
