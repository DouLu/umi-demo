import { Col, DatePicker, Input, Row, Select } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

type CodeInfoType = {
  status?: "pre" | "doing" | "done";
  name?: string;
  date?: string;
};

export const CodeInfo = ({
  id,
  value,
  onChange,
}: {
  id?: string;
  value?: CodeInfoType;
  onChange?: (value: CodeInfoType) => void;
}) => {
  const [codeInfo, setCodeInfo] = useState<CodeInfoType | undefined>(value);
  const handleChange = (name: string, val: string | null) => {
    if (value) {
      setCodeInfo({ ...value, [name]: val });
    } else {
      setCodeInfo({ [name]: val });
    }
    let newValue = { [name]: val };
    if (codeInfo) {
      newValue = { ...codeInfo, [name]: val };
    }
    setCodeInfo(newValue);
    onChange?.(newValue);
  };
  return (
    <Row gutter={10}>
      <Col>
        <Select
          style={{ width: 150 }}
          options={[
            { label: "未开始", value: "pre" },
            { label: "进行中", value: "doing" },
            { label: "已完成", value: "done" },
          ]}
          value={codeInfo?.status}
          onChange={(val) => {
            handleChange("status", val);
          }}
        />
      </Col>
      <Col>
        <Input
          value={codeInfo?.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
        />
      </Col>
      <Col>
        <DatePicker
          style={{ width: 150 }}
          format={dateFormat}
          value={codeInfo?.date ? dayjs(codeInfo?.date, dateFormat) : null}
          onChange={(_, val) => {
            handleChange("date", val);
          }}
        />
      </Col>
    </Row>
  );
};
