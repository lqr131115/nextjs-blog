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
  Statistic,
} from "antd";
import { GithubOutlined } from "@ant-design/icons";
import request from "@/service/fetch";
import styles from "./login.module.scss";

type PropsType = {
  open: boolean;
  onClose: () => void;
  deadline: number;
  setDeadline: () => void;
};
const { Option } = Select;
const { Text } = Typography;
const { Countdown } = Statistic;
const Login: FC<PropsType> = (props) => {
  const { open, onClose, deadline, setDeadline } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [isShowLoginMethod, setIsShowLoginMethod] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const getVerifyCode = () => {
    form
      .validateFields(["phone"])
      .then((values) => {
        setDeadline();
        setIsShowVerifyCode(true);
        // 发送验证码
        const { phone } = values;
        request
          .post("/api/user/sendVerifyCode", { to: phone, templateId: "1" })
          .then(() => {
            setIsShowVerifyCode(true);
            setDeadline();
          });
      })
      .catch((err) => {
        console.log("getVerifyCode err", err);
      });
  };
  const handleLogin = () => {
    const { phone, verification } = form.getFieldsValue();
    request
      .post("/api/user/login", { phone, verification })
      .then((res) => {
        console.log("login res", res);
      })
      .catch((err) => {
        console.log("login error", err);
      })
      .finally(() => {
        onClose && onClose();
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Modal title="登录" open={open} onCancel={onClose} footer={null}>
      <Form
        form={form}
        initialValues={{ agreement: true, prefix: "86" }}
        onFinish={onFinish}
        style={{ marginTop: 20 }}
        validateTrigger={["onSubmit"]}
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
            <Button
              type="primary"
              onClick={getVerifyCode}
              disabled={isShowVerifyCode}
            >
              {isShowVerifyCode ? (
                <Countdown
                  valueStyle={{ fontSize: 12 }}
                  value={deadline}
                  format="剩余 s 秒"
                  onFinish={() => setIsShowVerifyCode(false)}
                />
              ) : (
                <span>获取验证码</span>
              )}
            </Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item style={{ marginBottom: 5 }}>
          <Button block type="primary" htmlType="submit" onClick={handleLogin}>
            Log in
          </Button>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Text
            className={styles.title}
            onClick={(e) => {
              e.stopPropagation();
              setIsShowLoginMethod(!isShowLoginMethod);
            }}
          >
            其他登录方式
          </Text>
        </Form.Item>
        {isShowLoginMethod && (
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
