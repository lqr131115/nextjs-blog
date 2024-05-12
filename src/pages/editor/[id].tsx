import dynamic from "next/dynamic";
import { useState } from "react";
import { useRequest } from "ahooks";
import { Form, Input, Button, Space, message } from "antd";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Article } from "@/db/entity";
import { getRepository } from "@/db";
import { LoadingOutlined } from "@ant-design/icons";
import request from "@/service/fetch";
import styles from "./index.module.scss";

export async function getServerSideProps({ query }: any) {
  const { id } = query;
  const articleRep = await getRepository(Article);
  const article = await articleRep.findOne({
    where: { id },
    relations: ["user"],
  });

  return {
    props: {
      id,
      article: JSON.parse(JSON.stringify(article)),
    },
  };
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type FieldType = {
  title: string;
  description?: string;
};

interface IProps {
  id: string;
  article: Article;
}

function ModifyEditor({ id, article }: IProps) {
  const { title, description, content: initContent } = article;
  const [content, setContent] = useState(initContent);
  const [form] = Form.useForm();
  const { push } = useRouter();
  const { loading, run: handleSaveModification } = useRequest(
    async () => {
      const { title, description } = form.getFieldsValue();
      if (!title) {
        message.error("标题不能为空");
        return;
      }
      return await request.post("/api/article/update", {
        id,
        title,
        description,
        content,
      });
    },
    {
      manual: true,
      onSuccess(res: any) {
        const { code } = res ?? {};
        if (code === 0) {
          // TODO: 跳转
          id ? push(`/article/${id}`) : push("/");
          message.success("更新成功");
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
        <Form
          form={form}
          layout="inline"
          initialValues={{ title, description }}
        >
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
            onClick={handleSaveModification}
          >
            保存
          </Button>
        </Space>
      </div>
      <MDEditor value={content} height={800} onChange={onContentChange} />
    </div>
  );
}

ModifyEditor.layout = null;

export default ModifyEditor;
