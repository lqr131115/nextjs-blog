import React, { FC } from "react";
import { Space } from "antd";

interface IProps {
  icon: React.FC;
  text: string;
}

const IconText: FC<IProps> = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default IconText;
