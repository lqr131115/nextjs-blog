import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import { useRequest } from "ahooks";
import { Input, Button, Space, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import request from "@/service/fetch";
import styles from "./index.module.scss";
// import * as commands from "@uiw/react-md-editor/commands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function Editor() {
  const [title, setTitle] = useState("标题");
  const [content, setContent] = useState("**Hello world!**");
  //   const handleSave = () => {
  //     if (!title) {
  //       message.error("标题不能为空");
  //       return;
  //     }
  //   };
  const { loading, run: handlePublish } = useRequest(
    async () => {
      if (!title) {
        message.error("标题不能为空");
        return;
      }
      return await request.post("/api/article/create", {
        title,
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
          message.success("发布成功");
        }
      },
    }
  );
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onContentChange = (value?: string) => {
    setContent(value!);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.action}>
        <Input
          className={styles.title}
          allowClear
          value={title}
          placeholder="请输入标题"
          onChange={onTitleChange}
        />
        <Space>
          {/* <Button onClick={handleSave}>保存</Button> */}
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
