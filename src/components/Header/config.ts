type NavConfig = {
  label: string;
  path: string;
  [key: string]: any;
};

export const nav: NavConfig[] = [
  {
    label: "首页",
    path: "/",
  },
  {
    label: "信息",
    path: "/info",
  },
  {
    label: "标签",
    path: "/tag",
  },
];
