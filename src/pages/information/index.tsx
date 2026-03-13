import { useRequest } from "ahooks";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";

type FieldsType = {
  content: string;
  sendName: string;
  type: "退休" | "其他";
  status: "已读" | "未读";
};
type ColumnsType = {
  id: number;
  sendName: string;
  type: "退休" | "其他";
  content: string;
  docs: string;
  date: string;
  status: "已读" | "未读";
};

export default () => {
  const [form] = Form.useForm<FieldsType>();
  const { data } = useRequest(() =>
    fetch("/api/informations", { method: "GET" }).then((res) => res.json()),
  );

  const handleSearch = () => {
    alert(JSON.stringify(form.getFieldsValue()));
  };
  const handleReset = () => {
    form.resetFields();
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: 20,
        overflow: "scroll",
        maxHeight: "calc(100vh - 189px)",
      }}
    >
      <Form layout="vertical" form={form} style={{ marginBottom: 30 }}>
        <Row gutter={20}>
          <Col>
            <Form.Item label="内容" name="content">
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="寄件人" name="sendName">
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="信息类型" name="type">
              <Select
                placeholder="请选择"
                options={[
                  { label: "退休", value: "t" },
                  { label: "其他", value: "o" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="阅读状态" name="status">
              <Select
                placeholder="请选择"
                options={[
                  { label: "已读", value: "done" },
                  { label: "未读", value: "undo" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
          </Col>
          <Col>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </Form>
      <Table<ColumnsType>
        rowKey={"id"}
        columns={[
          { title: "序号", dataIndex: "id" },
          { title: "寄件人", dataIndex: "sendName" },
          { title: "信息类型", dataIndex: "type" },
          { title: "内容", dataIndex: "content" },
          { title: "附件", dataIndex: "docs" },
          { title: "发送时间", dataIndex: "date" },
          { title: "阅读状态", dataIndex: "status" },
        ]}
        loading={!data?.success}
        dataSource={data?.data || []}
        pagination={{ current: 2, pageSize: 10, total: data?.total || 0 }}
      />
    </div>
  );
};
