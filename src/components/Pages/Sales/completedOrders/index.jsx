import ErrorBoundary from "../../../UIComponents/ErrorBoundary";
import CustomTable from "../../../UIComponents/Table/responsiveTable";
import { openNotificationWithIcon } from "../../../UIComponents/Toast/notification";
import { TableColumnsList } from "../../../../constants";
import { defaultRequestOptions } from "../../../../settings";
import { getCasedGoods } from "../../../../store/CasedGoods/casedGoods.actions";
import { cancelSalesOrdersRequest, getCompletedSalesOrderRequest } from "../../../../store/SalesOrder/sale.actions";
import { get } from "lodash";
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setCurrentView } from "../../../../store/Auth/auth.actions";
import SearchWithExportUI from "../../../CommonComponents/SearchWithExport";
import CancelOrderConfirmation from "../confirmation/cancelOrderConfirmation";
import { CancelOrderUI } from "../trackOrder/cancelOrder";

/**
 * Renders Completed Sales Order component
 */
const CompletedSalesOrder = (props) => {
  const dispatch = useDispatch();

  const [expectedData, setExpectedData] = React.useState([]);
  const [expectedMetaData, setExpectedMetaData] = React.useState([]);
  const [expectedClonedData, setExpectedClonedData] = React.useState([]);
  const [clearSearchString, setClearSearchString] = React.useState(false);

  const [currentCancelRecord, setCurrentCancelRecord] = React.useState(null);
  const [cancelOrderRequest, setCancelOrderRequest] = React.useState(false);
  const [showReasonModal, setShowReasonModal] = React.useState(false);
  const [cancellationReason, setCancellationReason] = React.useState("");
  const [currentRecord, setCurrentRecord] = React.useState(null);
  const [currentFulfillmentStatus, setCurrentFulfillmentStatus] = React.useState("");

  React.useEffect(() => {
    dispatch(setCurrentView("Completed Orders"));
  }, []);

  const updateState = (data) => {
    setExpectedData(data);
    if (expectedClonedData.length === 0) {
      setExpectedClonedData(data);
    }
  };

  const userRole = useSelector((state) => {
    return get(state, "auth.loggedInUserDetails.data.role", null);
  });

  const isCleared = () => {
    setExpectedData(expectedClonedData);
    setClearSearchString(true);
  };

  const fetchCasedGoods = async () => {
    const searchable_columns = [{ field_name: "deleted", field_value: "no" }];
    const inventoryResponse = await props.getCasedGoods({ ...defaultRequestOptions, searchable_columns });
    if (get(inventoryResponse, "error", false)) {
      openNotificationWithIcon("error", "Inventory", `${get(inventoryResponse, "error.message", "Something Went Wrong")} `);
    }
  };

  const fetchSalesOrders = async (requestOptions) => {
    let salesOrderResp = await props.getCompletedSalesOrderRequest({ ...requestOptions });

    if (get(salesOrderResp, "error", false)) {
      openNotificationWithIcon("error", "Completed Sales Order", `${get(salesOrderResp, "error.message", "Something Went Wrong")} `);
    }

    if (get(salesOrderResp, "response.status")) {
      setExpectedMetaData(get(salesOrderResp, "response.meta"));
      updateState(get(salesOrderResp, "response.data", []));
    }
  };

  React.useEffect(() => {
    fetchSalesOrders(defaultRequestOptions);
  }, []);

  const handleSearch = (searchedData) => {
    if (get(searchedData, "isClient", true)) {
      setExpectedData(get(searchedData, "filteredData", []));
    }
  };

  const handleEditAction = (record, type, custom) => {
    setCurrentRecord(record);
    setCurrentFulfillmentStatus(type);

    if (type === "Cancel Order") {
      setCancelOrderRequest(true);
      setCurrentCancelRecord(record);
    }
    if (get(custom, "status") === "fulfillment_status") {
      if (type === "cancelled" || type === "shipped") {
        setShowReasonModal(true);
      } else {
        updateFulfillmentStatus(type, get(record, "sales_order_id"));
      }
    }
  };

  const updateFulfillmentStatus = async (fulfillment_status, sales_order_id, comments) => {
    let requestPayload = {
      ...defaultRequestOptions,
      fulfillment_status,
      sales_order_id,
    };
    if (comments) {
      requestPayload["comments"] = comments;
    }
    let fulFillmentOrderResp = await props.cancelSalesOrdersRequest({ ...requestPayload });
    if (get(fulFillmentOrderResp, "error", false)) {
      openNotificationWithIcon("error", "Fulfillment Status", `${get(fulFillmentOrderResp, "error.message", "Something Went Wrong")} `);
    }

    if (get(fulFillmentOrderResp, "response.status")) {
      fetchSalesOrders(defaultRequestOptions);
      setCancellationReason("");
      setCurrentFulfillmentStatus("");
      setCurrentRecord(null);
      setShowReasonModal(false);
      fetchCasedGoods();
      openNotificationWithIcon("success", "Fulfillment Status", `${get(fulFillmentOrderResp, "response.message", "Fulfillment Status Successfully")} `);
    }
  };

  const handleCancelOrderRequest = async (comments, sales_order_id) => {
    const requestPayload = {
      ...defaultRequestOptions,
      comments,
      sales_order_id,
      fulfillment_status: "cancelled",
    };

    let cancelSalesOrderResp = await props.cancelSalesOrdersRequest({ ...requestPayload });
    if (get(cancelSalesOrderResp, "error", false)) {
      openNotificationWithIcon("error", "Cancel Order", `${get(cancelSalesOrderResp, "error.message", "Something Went Wrong")} `);
    }

    if (get(cancelSalesOrderResp, "response.status")) {
      fetchSalesOrders(defaultRequestOptions);
      fetchCasedGoods();
      openNotificationWithIcon("success", "Cancel Order", `${get(cancelSalesOrderResp, "response.message", "Order Cancelled Successfully")} `);
      setCancelOrderRequest(false);
      setCurrentCancelRecord(null);
    }
  };

  return (
    <>
      {cancelOrderRequest && (
        <CancelOrderUI
          title="Cancel Order"
          handleCancel={() => setCancelOrderRequest(false)}
          handleSubmit={handleCancelOrderRequest}
          isModalVisible={cancelOrderRequest}
          loading={get(props, "loading", false)}
          record={currentCancelRecord}
        />
      )}
      {showReasonModal && (
        <CancelOrderConfirmation
          handleReason={(reason) => setCancellationReason(reason)}
          cancellationReason={cancellationReason}
          customDetails={{
            fulfillment_status: currentFulfillmentStatus,
            signer_email: get(currentRecord, "signer_email"),
            email_sent_at: get(currentRecord, "email_sent_at"),
          }}
          handleReasonSubmit={handleReasonSubmit}
          showModal={true}
          handleClose={() => setShowReasonModal(false)}
        />
      )}
      {/* <Heading text="Completed Orders" variant="h4" /> */}
      <div className="border-radius-12 bg-white p-4 table-responsive-padding">
        <ErrorBoundary>
          <SearchWithExportUI
            clearSearchString={clearSearchString}
            handleSearch={handleSearch}
            columnType={TableColumnsList.CompletedOrders}
            fetchDetails={(payload) => fetchSalesOrders(payload)}
            isSyncEnabled={true}
            handleSync={() => fetchSalesOrders(defaultRequestOptions)}
            expectedClonedData={expectedClonedData}
            expectedMetaData={expectedMetaData}
            expectedData={expectedData}
          />
          <>
            <CustomTable
              data={expectedData}
              meta={expectedMetaData}
              clonedData={expectedClonedData}
              columnType={TableColumnsList.CompletedOrders}
              isLoading={get(props, "loading", false)}
              isCleared={isCleared}
              isExportAvailable={false}
              isGlobalFilterEnabled={false}
              onFilter={(payload) => fetchSalesOrders({ ...defaultRequestOptions, searchable_columns: payload })}
              onReset={() => fetchSalesOrders(defaultRequestOptions)}
              userRole={userRole}
              handleEdit={(record, type, custom) => handleEditAction(record, type, custom)}
            />
          </>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    loading: get(state, "salesOrder.loading"),
    error: get(state, "salesOrder.failure"),
  }),
  { getCasedGoods, cancelSalesOrdersRequest, getCompletedSalesOrderRequest }
)(CompletedSalesOrder);
