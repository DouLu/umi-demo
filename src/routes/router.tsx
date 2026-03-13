import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/interface";
import { Link } from "umi";
// 映射路由文案
export const menuHash: any = {
  "/": {
    label: "系统首页",
    icon: <PieChartOutlined />,
  },
  works: {
    label: "工作台",
    icon: <PieChartOutlined />,
  },
  "works/recognition": {
    label: "认定",
  },
  "works/recognition/info": {
    hidden: true,
    label: "认定-一般笔记",
  },
  information: {
    label: "讯息广场",
    icon: <PieChartOutlined />,
  },
  "information/notary-information": {
    label: "所有信息",
  },
  "/services": {
    label: "服务受理",
    icon: <PieChartOutlined />,
  },
  "/searchs": {
    label: "查询中心",
    icon: <PieChartOutlined />,
  },
  "/reports": {
    label: "报表中心",
    icon: <PieChartOutlined />,
  },
  user: {
    label: "用户",
    icon: <UserOutlined />,
  },
  login: {
    hidden: true,
  },
};

// 控制菜单是否有权限可见
export const unaccessible = ["/login", "/register"];

export type MenuNode = {
  key: number | string;
  label: string | React.ElementType;
  icon?: React.ElementType;
  hidden?: boolean;
  children?: MenuNode[];
};

const getLinkLabel = (path: string) => {
  if (!menuHash[path]) {
    return {};
  }
  const { label, icon = <></>, hidden = false } = menuHash[path];
  return {
    icon,
    label: (
      <Link to={path} key={path}>
        {label}
      </Link>
    ),
    hidden,
  };
};

/**
 * 将 `[{ id, path }]` 转成层级菜单结构（可直接用于 antd Menu、Tree 等）。
 *
 * - 通过 path 划分层级（"works/recognition" -> works -> recognition）
 * - key 优先使用原始 id，否则使用 path 作为 fallback
 */
export function buildMenuTree(oldItems?: any[]): MenuNode[] {
  if (!oldItems) return [];
  const items = oldItems.map((i) => ({ id: i.id, path: i.path }));
  const idByPath = new Map(items.map(({ path, id }) => [path, id] as const));
  const roots = new Map<string, MenuNode>();

  for (const { path } of items) {
    const segments = path.split("/").filter(Boolean);
    const fullPaths: string[] = [];

    for (let i = 0; i < segments.length; i += 1) {
      fullPaths.push(segments.slice(0, i + 1).join("/"));
    }

    if (segments.length === 0) {
      // 处理根路径
      roots.set("/", { key: idByPath.get("/") ?? "/", ...getLinkLabel("/") });
      continue;
    }

    const rootKey = segments[0];
    let node = roots.get(rootKey);
    if (!node) {
      const rootPath = segments[0];
      node = {
        key: idByPath.get(rootPath) ?? rootPath,
        ...getLinkLabel(rootPath),
      };
      roots.set(rootKey, node);
    }

    for (let i = 1; i < segments.length; i += 1) {
      const fullPath = fullPaths[i];
      const key = idByPath.get(fullPath) ?? fullPath;
      const label = fullPath;

      node.children ??= [];
      let child = node.children.find((n) => n.key === key);
      if (!child) {
        child = { key, ...getLinkLabel(label) };
        node.children.push(child);
      }
      node = child;
    }
  }

  return Array.from(roots.values());
}
