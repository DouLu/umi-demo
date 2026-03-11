import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, TableProps, Tooltip } from "antd";

export default () => {
  const dataSource = [
    {
      id: "1",
      type: "胡彦斌",
      sId: "32",
      sName: "西湖区湖底公园1号",
    },
    {
      id: "2",
      type: "胡彦斌2",
      sId: "322",
      sName: "西湖区湖底公园1号2",
    },
  ];
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
      render: (value: any, record: any, index: number) => (
        <Row gutter={10}>
          <Col>
            <Tooltip title="编辑">
              <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title="删除">
              <Button type="primary" icon={<DeleteOutlined />} />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ];

  type DataType = {
    id: string;
    sId: string;
  };
  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows,
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.id === "1", // Column configuration not to be checked
      id: record.id,
    }),
  };
  return (
    <div>
      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        dataSource={dataSource}
        columns={columns.map((c) => ({ ...c, key: c.dataIndex }))}
      />
    </div>
  );
};
