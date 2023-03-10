import { FilePdfOutlined } from "@ant-design/icons";
import ErrorBoundary from "../../../../UIComponents/ErrorBoundary";
import { openNotificationWithIcon } from "../../../../UIComponents/Toast/notification";
import { getRequestHeader } from "../../../../../helpers/service";
import { getFileType } from "../../../../../helpers/utility";
import { Col, Row, Spin, Tooltip, Typography } from "antd";
import axios from "axios";
import { get } from "lodash";
import React from "react";

const { Text } = Typography;

/**
 * Renders Customer Details Component
 */
const CustomerDocuments = props => {
  const downloadDocument = async doc => {
    const rest = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_ENDPOINT}/api/get_s3_file_by_url?url=${get(doc, "s3_url").trim()}`,
      headers: { ...getRequestHeader() },
    });
    const fileExt = get(doc, "s3_url", "").split(".").pop();
    var link = document.createElement("a");
    link.setAttribute("href", `${getFileType(fileExt)};base64,${get(rest, "data.file")}`);
    link.setAttribute("download", `${get(doc, "document_name")}-${new Date().getTime()}.${fileExt}`);
    document.body.appendChild(link); // Required for FF
    link.click();
    openNotificationWithIcon("success", "Document", `${get(doc, "document_name")} Download Successful`);
  };

  return (
    <ErrorBoundary>
      <div className="common_card_section">
        <Spin spinning={get(props, "loading", false)}>
          <Row style={{ fontSize: "0.9rem" }}>
            {get(props, "documents", []).map((doc, index) => {
              return (
                <Col span={6} key={index} style={{ cursor: "pointer" }} className="text-overflow mb-3">
                  <FilePdfOutlined style={{ paddingRight: 5 }} />
                  <Tooltip placement="topLeft" title={<>{get(doc, "document_name")}</>}>
                    <Text onClick={() => downloadDocument(doc)}>{get(doc, "document_name")}</Text>
                  </Tooltip>
                </Col>
              );
            })}
            {get(props, "documents", []).length === 0 && <Col xs={{ span: 24 }} sm={{ span: 6 }}>No Documents Available</Col>}
          </Row>
        </Spin>
      </div>
    </ErrorBoundary>
  );
};

export default CustomerDocuments;
