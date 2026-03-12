// ./mock/users.ts
import Mock from "mockjs";

export default {
  // 返回值可以是数组形式
  "GET /api/users": [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" },
  ],
  "GET /api/list": Mock.mock({
    "data|10": [
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
  // 返回值也可以是对象形式
  "GET /api/users/1": { id: 1, name: "foo" },
  "POST /api/login": (req: Request, res: Response) => {
    console.log("req----", req.body);
    return res.json({ success: true });
  },
};
