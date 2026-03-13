import Mock from "mockjs";

export default {
  "GET /api/informations": Mock.mock({
    success: true,
    total: 55,
    "data|55": [
      {
        id: "@id",
        sendName: "@cname",
        type: Mock.Random.pick(["退休", "其他"]),
        content: Mock.Random.cparagraph(1, 3),
        docs: "@url",
        date: Mock.Random.datetime("yyyy-MM-dd"),
        status: Mock.Random.pick(["已读", "未读"]),
      },
    ],
  }),
};
