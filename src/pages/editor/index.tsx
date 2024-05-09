import dynamic from "next/dynamic";
import { useState } from "react";
import { Input, Button, Space } from "antd";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from "./index.module.scss";
// import * as commands from "@uiw/react-md-editor/commands";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const handleSave = () => {
  console.log("save");
};
const handlePublish = () => {
  console.log("publish");
};
function Editor() {
  const [value, setValue] = useState("**Hello world!**");
  return (
    <div className={styles.wrapper}>
      <div className={styles.action}>
        <Input className={styles.title} placeholder="请输入标题" />
        <Space>
          <Button onClick={handleSave}>保存</Button>
          <Button type="primary" onClick={handlePublish}>
            发布
          </Button>
        </Space>
      </div>
      <MDEditor value={value} onChange={setValue as any} />
    </div>
  );
}

Editor.layout = null;

export default Editor;
