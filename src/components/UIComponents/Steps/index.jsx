import { ArrowRightOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message, Steps } from "antd";
import { get } from "lodash";
import React from "react";
import "./index.scss";
const { Step } = Steps;

/**
 * Renders Progress Steps component
 */
const CustomStepsProgress = (props) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (props.setToInitial) {
      setCurrent(0);
    }
  }, [props]);
  const next = () => {
    const currentIndex = current + 1;
    setCurrent(current + 1);
    props.currentIndex(currentIndex);
  };

  const prev = () => {
    const currentIndex = current - 1;
    setCurrent(current - 1);
    props.currentIndex(currentIndex);
  };

  const onChange = (current) => {
    setCurrent(current);
    props.currentIndex(current);
  };
  const handleSubmit = () => {
    props.onSubmit();
  };

  const StepsTabs = get(props, "data", []);

  return (
    <>
      <Steps
        current={current}
        type="navigation"
        size="small"
        onChange={onChange}
        className="site-navigation-steps"
        items={StepsTabs}
      />
      <div className="steps-content">
        {get(StepsTabs, `${[current]}.content`, "")}
      </div>
      <div className="steps-action">
        {current < StepsTabs.length - 1 && (
          <Button type="primary" onClick={() => next()} icon={<ArrowRightOutlined />}>
            Next
          </Button>
        )}
        {current === StepsTabs.length - 1 && (
          <Button type="primary" onClick={() => handleSubmit()} icon={<CheckOutlined />}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()} icon={<ArrowLeftOutlined />}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default CustomStepsProgress;
