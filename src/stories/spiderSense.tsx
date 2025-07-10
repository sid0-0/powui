import { Button } from "@/components/ui/button";
import { SpiderSenseWrapper } from "@/components/ui/spiderSenseWrapper";
import { useRef, useState } from "react";

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

  const [size, setSize] = useState(100);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <input
        type="range"
        min="1"
        max="300"
        value={size}
        className="slider w-52"
        onChange={(e) => {
          setSize(Number(e.target.value));
        }}
      />
      <br />
      <div className="flex items-center justify-center w-full">
        <SpiderSenseWrapper {...props} getManualTrigger={getManualTrigger}>
          <img width={size} src="spider.svg" />
          {trigger !== "manual" && (
            <>
              <br />
              <div className="w-full text-center">{trigger} me!</div>
            </>
          )}
        </SpiderSenseWrapper>
      </div>
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
    </div>
  );
};
