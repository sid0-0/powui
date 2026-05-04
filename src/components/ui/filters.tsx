import { useEffect, useRef, type PropsWithChildren } from "react";

let filterId = 1;
const useCreateFilterId = () => {
  const id = useRef(filterId);
  useEffect(() => {
    filterId += 1;
  }, []);
  return `pow-filter-${id.current}`;
};

const SVGWithFilterDefs = (
  props: PropsWithChildren<{
    filterBody: React.ReactNode;
    className?: string;
    containerClassName?: string;
  }>
) => {
  const {
    children,
    filterBody,
    className = "",
    containerClassName = "",
  } = props;
  const filterId = useCreateFilterId();
  return (
    <div className={containerClassName}>
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id={filterId}>{filterBody}</filter>
        </defs>
      </svg>
      <div className={className} style={{ filter: `url(#${filterId})` }}>
        {children}
      </div>
    </div>
  );
};

const Displacement = (
  props: PropsWithChildren<{
    scale?: number;
    frequency?: number;
    className?: string;
    containerClassName?: string;
  }>
) => {
  const {
    scale = 2,
    className = "",
    containerClassName = "",
    frequency = 0.1,
    children,
  } = props;
  return (
    <SVGWithFilterDefs
      className={className}
      containerClassName={containerClassName}
      filterBody={
        <>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={frequency}
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </>
      }
    >
      {children}
    </SVGWithFilterDefs>
  );
};

const ChromaAberr = (
  props: PropsWithChildren<{
    offset?: number;
    className?: string;
    containerClassName?: string;
  }>
) => {
  const {
    offset = 0.7,
    className = "",
    containerClassName = "",
    children,
  } = props;
  return (
    <SVGWithFilterDefs
      className={className}
      containerClassName={containerClassName}
      filterBody={
        <>
          <feComponentTransfer in="SourceGraphic">
            <feFuncR type="identity" />
            <feFuncG type="table" tableValues="0" />
            <feFuncB type="table" tableValues="0" />
          </feComponentTransfer>
          <feOffset dx={-offset} dy={offset} result="redChannel" />

          <feComponentTransfer in="SourceGraphic">
            <feFuncR type="table" tableValues="0" />
            <feFuncG type="identity" />
            <feFuncB type="table" tableValues="0" />
          </feComponentTransfer>
          <feOffset dx={offset} dy={-offset} result="greenChannel" />

          <feComponentTransfer in="SourceGraphic">
            <feFuncR type="table" tableValues="0" />
            <feFuncG type="table" tableValues="0" />
            <feFuncB type="identity" />
          </feComponentTransfer>
          <feOffset dx={2 * offset} dy={-2 * offset} result="blueChannel" />

          <feBlend in="redChannel" mode="lighten" />
          <feBlend in="greenChannel" mode="lighten" />
          <feBlend in="blueChannel" mode="lighten" />
        </>
      }
    >
      {children}
    </SVGWithFilterDefs>
  );
};

const Posterize = (
  props: PropsWithChildren<{
    className?: string;
    containerClassName?: string;
    buckets?: number;
  }>
) => {
  const {
    buckets = 5,
    className = "",
    containerClassName = "",
    children,
  } = props;
  const range = Array.from(
    { length: buckets },
    (_, idx) => idx / (buckets - 1)
  ).join(" ");

  return (
    <SVGWithFilterDefs
      className={className}
      containerClassName={containerClassName}
      filterBody={
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues={range} />
          <feFuncG type="discrete" tableValues={range} />
          <feFuncB type="discrete" tableValues={range} />
        </feComponentTransfer>
      }
    >
      {children}
    </SVGWithFilterDefs>
  );
};

export const Filters = {
  Displacement,
  ChromaAberr,
  Posterize,
};
