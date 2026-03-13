// ./mock/users.ts
import Mock from "mockjs";

export default {
  // 返回值可以是数组形式
  "GET /api/users": [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
  ],
  // 返回值也可以是对象形式
  "GET /api/users/1": { id: 1, name: "foo" },
  "POST /api/login": (req: Request, res: Response) => {
    console.log("req----", req.body);
    return res.json({ success: true });
  },
  "GET /api/notices": Mock.mock({
    success: true,
    "data|6": [
      { id: "@id", name: "@cname", content: Mock.Random.cparagraph(1, 3) },
    ],
  }),
  "GET /api/list": Mock.mock({
    success: true,
    total: 22,
    "data|22": [
      {
        id: "@id",
        sId: "@guid",
        type: Mock.Random.pick(["t1", "t2", "t3"]),
        status: Mock.Random.pick(["pre", "doing", "done"]),
        sName: "@cname",
        l: "@cword",
        date: Mock.Random.datetime(),
      },
    ],
  }),
};
