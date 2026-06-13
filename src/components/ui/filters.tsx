"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

let filterId = 0;
const useCreateFilterId = () => {
  const mounted = useRef(false);
  const id = useRef(filterId);
  if (!mounted.current) {
    filterId += 1;
  }
  useEffect(() => {
    mounted.current = true;
  }, []);
  return `pow-filter-${id.current}`;
};

const SVGWithFilterDefs = (
  props: PropsWithChildren<{
    filterBody: React.ReactNode;
    className?: string;
    containerClassName?: string;
  }>,
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute size-0 invisible"
      >
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
  }>,
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
  }>,
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
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="
            1 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 1 0"
            result="redOnly"
          />
          <feOffset in="redOnly" dx={-offset} dy={offset} result="redChannel" />

          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="
            0 0 0 0 0
            0 1 0 0 0
            0 0 0 0 0
            0 0 0 1 0"
            result="greenOnly"
          />
          <feOffset
            in="greenOnly"
            dx={offset}
            dy={-offset}
            result="greenChannel"
          />

          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 1 0 0
            0 0 0 1 0"
            result="blueOnly"
          />
          <feOffset
            in="blueOnly"
            dx={2 * offset}
            dy={-2 * offset}
            result="blueChannel"
          />

          <feBlend
            in="redChannel"
            in2="greenChannel"
            mode="screen"
            result="rgBlend"
          />
          <feBlend in="rgBlend" in2="blueChannel" mode="screen" />
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
  }>,
) => {
  const {
    buckets = 5,
    className = "",
    containerClassName = "",
    children,
  } = props;
  const range = Array.from(
    { length: buckets },
    (_, idx) => idx / (buckets - 1),
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

const Ripple = (
  props: PropsWithChildren<{
    scale?: number;
    minFrequency?: number;
    maxFrequency?: number;
    duration?: number;
    className?: string;
    containerClassName?: string;
  }>,
) => {
  const {
    scale = 6,
    minFrequency = 0.01,
    maxFrequency = 0.03,
    duration = 2,
    className = "",
    containerClassName = "",
    children,
  } = props;
  const values = `${minFrequency};${maxFrequency};${minFrequency}`;
  return (
    <SVGWithFilterDefs
      className={className}
      containerClassName={containerClassName}
      filterBody={
        <>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={minFrequency}
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values={values}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </feTurbulence>
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

export const Filters = {
  Displacement,
  ChromaAberr,
  Posterize,
  Ripple,
};
