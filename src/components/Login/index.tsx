import { FC, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Space,
  Typography,
  Flex,
} from "antd";
import { GithubOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";

type PropsType = {
  open: boolean;
  onClose: () => void;
};
const { Option } = Select;
const { Text } = Typography;
const Login: FC<PropsType> = (props) => {
  const { open, onClose } = props;
  const [show, toggleShow] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="86">
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Modal title="登录" open={open} onCancel={onClose} footer={null}>
      <Form
        form={form}
        onFinish={onFinish}
        style={{ marginTop: 20 }}
        validateTrigger="onFinish"
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
              message: "Please input correct phone number!",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="verification"
          rules={[
            { required: true, message: "Please input your verification code!" },
          ]}
        >
          <Space.Compact style={{ width: "100%" }}>
            <Input />
            <Button type="primary">获取验证码</Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item style={{ marginBottom: 5 }}>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Text
            className={styles.title}
            onClick={(e) => {
              e.stopPropagation();
              toggleShow(!show);
            }}
          >
            其他登录方式
          </Text>
        </Form.Item>
        {show && (
          <Form.Item style={{ marginBottom: 0 }}>
            <Flex justify="center" className={styles.ways}>
              <GithubOutlined />
            </Flex>
          </Form.Item>
        )}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          style={{ marginBottom: 0 }}
        >
          <Checkbox>
            注册登录即表示同意 <a href="">用户协议</a>&nbsp;和&nbsp;
            <a href="">隐私政策</a>
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
