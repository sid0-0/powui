import { SpiderSenseWrapper } from "@/components/ui/spiderSenseWrapper";

export const StorybookSpiderSense = () => {
  return (
    <SpiderSenseWrapper>
      <img src="public/spider.svg" />
      {/* <img style={{ height: 200 }} src="public/spider.svg" /> */}
      <div>Hover me!</div>
    </SpiderSenseWrapper>
  );
};
