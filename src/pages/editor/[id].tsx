import dynamic from "next/dynamic";
import { useState } from "react";
import { useRequest } from "ahooks";
import { Form, Input, Button, Space, message, Select, Tooltip } from "antd";
import { useRouter } from "next/router";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Article, Tag } from "@/db/entity";
import { getRepository } from "@/db";
import { LoadingOutlined } from "@ant-design/icons";
import request from "@/service/fetch";
import styles from "./index.module.scss";
import { ITag } from "../api";
const { Option } = Select;

export async function getServerSideProps({ query }: any) {
  const { id } = query;
  const articleRep = await getRepository(Article);
  const article = await articleRep.findOne({
    where: { id },
    relations: ["user", "tags"],
  });

  const tagRep = await getRepository(Tag);
  const tags = await tagRep.find();
  return {
    props: {
      id,
      article: JSON.parse(JSON.stringify(article)),
      tags: JSON.parse(JSON.stringify(tags)),
    },
  };
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type FieldType = {
  title: string;
  description?: string;
  tags?: string[];
};

interface IProps {
  id: string;
  article: Article;
  tags: ITag[];
}

function ModifyEditor({ id, article , tags }: IProps) {
  const { title, description, content: initContent, tags:selectTags } = article;
  const [content, setContent] = useState(initContent);
  const selectTagIds = selectTags.map((tag: ITag) => tag.id);
  const [form] = Form.useForm();
  const { push } = useRouter();
  const { loading, run: handleSaveModification } = useRequest(
    async () => {
      const { title, description, tags } = form.getFieldsValue();
      if (!title) {
        message.error("标题不能为空");
        return;
      }
      return await request.post("/api/article/update", {
        id,
        title,
        preTagIds:selectTagIds,
        tagIds: tags,
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
          message.success("编辑成功");
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
          initialValues={{ title, description, tags: selectTagIds}}
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
          <Form.Item<FieldType> name="tags" label="标签">
            <Select
              placeholder="请选择标签"
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: 200 }}
              allowClear
              maxTagPlaceholder={(omittedValues) => (
                <Tooltip
                  overlayStyle={{ pointerEvents: "none" }}
                  title={omittedValues.map(({ label }) => label).join(", ")}
                >
                  <span>...</span>
                </Tooltip>
              )}
            >
              {tags.map((t:ITag) => (
                <Option value={t.id} key={t.id}>
                  {t.title}
                </Option>
              ))}
            </Select>
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
