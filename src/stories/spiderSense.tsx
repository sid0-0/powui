import { Button } from "@/components/ui/button";
import { SpiderSenseWrapper } from "@/components/ui/spiderSenseWrapper";
import { useRef } from "react";

export const StorybookSpiderSense = (props: {
  shape?: "zigzag" | "line";
  color?: string;
  trigger?: "hover" | "click" | "mount" | "manual";
}) => {
  const { trigger = "hover" } = props;
  const triggerRef = useRef<() => void>(null);
  const getManualTrigger = (trigger: () => void) => {
    triggerRef.current = trigger;
  };

  return (
    <>
      <SpiderSenseWrapper {...props} getManualTrigger={getManualTrigger}>
        <img src="public/spider.svg" />
        {trigger !== "manual" && <div>{trigger} me!</div>}
      </SpiderSenseWrapper>
      <br />
      {trigger === "manual" && (
        <Button
          onClick={() => {
            triggerRef.current?.();
          }}
        >
          Trigger spider sense
        </Button>
      )}
    </>
  );
};
