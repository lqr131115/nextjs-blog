import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import { useRequest } from "ahooks";
import { Form, Input, Button, Space, message } from "antd";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useStore } from "@/store";
import request from "@/service/fetch";
import styles from "./index.module.scss";
// import * as commands from "@uiw/react-md-editor/commands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type FieldType = {
  title: string;
  description?: string;
};

function Editor() {
  const [content, setContent] = useState("**Hello world!**");
  const [form] = Form.useForm();
  const { push } = useRouter();
  const { user } = useStore();
  const { loading, run: handlePublish } = useRequest(
    async () => {
      const { title, description } = form.getFieldsValue();
      if (!title) {
        message.error("标题不能为空");
        return;
      }
      return await request.post("/api/article/create", {
        title,
        description,
        content,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess(res: any) {
        const { code } = res ?? {};
        if (code === 0) {
          // TODO: 跳转
          const { id } = user.userInfo;
          id ? push(`/user/${id}`) : push("/");
          message.success("发布成功");
        }
      },
    }
  );
  const onContentChange = (value?: string) => {
    setContent(value!);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.action}>
        <Form form={form} layout="inline">
          <Form.Item<FieldType>
            label="标题"
            name="title"
            style={{ width: 500 }}
            rules={[{ required: true, message: "标题不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            style={{ width: 400 }}
            label="描述"
            name="description"
          >
            <Input />
          </Form.Item>
        </Form>
        <Space>
          <Button
            disabled={loading}
            icon={loading ? <LoadingOutlined /> : null}
            type="primary"
            onClick={handlePublish}
          >
            发布
          </Button>
        </Space>
      </div>
      <MDEditor value={content} height={800} onChange={onContentChange} />
    </div>
  );
}

Editor.layout = null;

export default Editor;
