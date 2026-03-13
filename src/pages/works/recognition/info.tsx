import {
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
} from "@ant-design/pro-components";
import { Button, Col, message, Row, Steps, Tag } from "antd";
import logo from "@/assets/yay.jpg";
import { useSearchParams } from "umi";
import { PlusOutlined } from "@ant-design/icons";

export default () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <PageContainer
      style={{ backgroundColor: "#fff" }}
      title={
        <Row gutter={20}>
          <Col>
            <img src={logo} width={30} height={30} />
          </Col>
          <Col>
            <h1>认定-一般笔记</h1>
          </Col>
          <Col>
            <Tag
              color={"volcano"}
              style={{ fontSize: 18, padding: "5px 10px" }}
            >
              {id}
            </Tag>
          </Col>
        </Row>
      }
      extra={
        <Steps
          style={{ width: "250px" }}
          current={1}
          percent={60}
          titlePlacement="vertical"
          items={[
            { title: "前台受理" },
            { title: "签署" },
            { title: "已完成" },
          ]}
        />
      }
      footer={[
        <Button type="dashed" key="cancel">
          取消申请
        </Button>,
        <Button type="primary" key="edit">
          编辑
        </Button>,
        <Button key="close">关闭</Button>,
      ]}
    >
      <>
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: "ProForm",
            //   onChange: (e) => setType(e.target.value),
          }}
          options={[
            "LightFilter",
            "ProForm",
            "ModalForm",
            "DrawerForm",
            "QueryFilter",
            "StepsForm",
            "LoginForm",
          ]}
        />
        <div
          style={{
            margin: 24,
          }}
        >
          <ProForm
            // @ts-ignore
            labelWidth="auto"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建表单
              </Button>
            }
            onFinish={async (values: any) => {
              // await waitTime(2000);
              console.log(values);
              message.success("提交成功");
            }}
            initialValues={{
              name: "蚂蚁设计有限公司",
              useMode: "chapter",
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="name"
                label="签约客户名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                width="md"
                name="company"
                label="我方公司名称"
                placeholder="请输入名称"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name={["contract", "name"]}
                width="md"
                label="合同名称"
                placeholder="请输入名称"
              />
              <ProFormDateRangePicker
                width="md"
                name={["contract", "createTime"]}
                label="合同生效时间"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: "chapter",
                    label: "盖章后生效",
                  },
                ]}
                readonly
                width="xs"
                name="useMode"
                label="合同约定生效方式"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: "time",
                    label: "履行完终止",
                  },
                ]}
                name="unusedMode"
                label="合同约定失效效方式"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="主合同编号" />
            <ProFormText
              name="project"
              width="md"
              disabled
              label="项目名称"
              initialValue="xxxx项目"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="商务经理"
              initialValue="启途"
            />
          </ProForm>
        </div>
      </>
    </PageContainer>
  );
};
