import { message } from "antd";

export const success = (text) => {
  message.success(text);
};

export const error = (text) => {
  message.error(text);
};

export const warning = (text) => {
  message.warning(text);
};
