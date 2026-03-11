import { MenuItemType } from "antd/es/menu/interface";
import { menuHash, unaccessible } from "./router";

const getItem = (path: string, children?: MenuItemType[]) => {
  const route = menuHash[path];
  return {
    key: path.startsWith("/") ? path : `/${path}`,
    icon: route?.icon || <></>,
    children,
    label: route?.label || path,
  } as MenuItemType;
};

export const routesToMenu = (routes?: any[]): MenuItemType[] => {
  if (!routes) {
    return [];
  }
  return routes
    .sort((a, b) => a.path.length - b.path.length) // 根据路由的长短有短到长排序一下
    .filter((i) => {
      const path = i.path.startsWith("/") ? i.path : `/${i.path}`;
      return !unaccessible.includes(path);
    })
    .map((route) => {
      const { path, children } = route;
      if (children) {
        return getItem(path, routesToMenu(children));
      }
      return getItem(path);
    });
};
