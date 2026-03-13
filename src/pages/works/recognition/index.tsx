import { CodeInfo } from "@/components/dlForm";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { useState } from "react";
import { history } from "umi";

type FieldType = {
  idInfo?: { id: string; name: string; date?: string };
  sName?: string;
  type?: string;
};
type DataType = {
  id: string;
  sId: string;
  type: "t1" | "t2";
  status: "已完成" | "未开始" | "进行中";
  sName: string;
  l: string;
  date: string;
};

export default () => {
  const { data } = useRequest(() =>
    fetch("/api/list", { method: "GET" }).then((res) => res.json()),
  );

  const [form] = Form.useForm();
  const search = () => {
    alert(JSON.stringify(form.getFieldsValue()));
  };
  const reset = () => {
    form.resetFields();
  };

  const [disabled, setDisabled] = useState(true);
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
      setSelectedRows(selectedRows);
      setDisabled(!selectedRows.length);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.id === "520000202102032773", // Column configuration not to be checked
      id: record.id,
    }),
    // onSelect: (record, selected, selectRows, e) => {
    // console.log("----", record, selected, selectRows, e);
    // },
  };

  const handlePrint = () => {
    alert(JSON.stringify(selectedRows.map((i) => i.sName)));
  };

  const handleSign = () => {
    alert(JSON.stringify(selectedRows.map((i) => i.status)));
  };

  const handleEdit = async (record: DataType) => {
    alert(record.sId);
    history.push(`/works/recognition/info?id=${record.id}`);
  };

  const handleDelete = async (id: string) => {
    alert(id);
  };

  const columns = [
    { title: "申请编号", dataIndex: "id" },
    { title: "服务编号", dataIndex: "sId" },
    { title: "公证行为类别", dataIndex: "type" },
    { title: "状态", dataIndex: "status" },
    { title: "签署人", dataIndex: "sName" },
    { title: "关联主体", dataIndex: "l" },
    { title: "签署/完成日期", dataIndex: "date" },
    {
      title: "操作",
      dataIndex: "action",
      render: (value: any, record: DataType, index: number) => (
        <Row gutter={10} style={{ width: 100 }}>
          <Col>
            <Tooltip title="编辑">
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => {
                  handleEdit(record);
                }}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="删除">
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleDelete(record.id);
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff", padding: 20 }}>
      <Form
        name="basic"
        layout="vertical"
        colon={false}
        form={form}
        style={{ maxWidth: "100%" }}
        initialValues={{
          idInfo: { status: "pre" },
          sName: "zhangsan",
          type: "t1",
        }}
        autoComplete="off"
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item<FieldType> label="申请编号" name="idInfo">
              <CodeInfo />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item<FieldType>
              label="制作人"
              name="sName"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item<FieldType> name="type" label="公证行为细类">
              <Select
                options={[
                  { value: "t1", label: "细类1" },
                  { value: "t2", label: "细类2" },
                  { value: "t3", label: "细类3" },
                ]}
                placeholder="请选择"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" onClick={search}>
                搜索
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" onClick={reset}>
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row justify={"end"} gutter={20} style={{ marginBottom: 20 }}>
        <Col>
          <Button
            size="large"
            type="primary"
            disabled={disabled}
            onClick={handlePrint}
          >
            打印出来
          </Button>
        </Col>
        <Col>
          <Button
            size="large"
            type="primary"
            disabled={disabled}
            onClick={handleSign}
          >
            确认签署
          </Button>
        </Col>
      </Row>
      <Table
        rowKey={"id"}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        dataSource={data ? data?.data : []}
        columns={columns.map((c) => ({ ...c, key: c.dataIndex }))}
        loading={!data?.success}
        pagination={{ total: data?.total || 0, pageSize: 10, current: 2 }}
      />
    </div>
  );
};
