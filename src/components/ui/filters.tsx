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

const Electricity = (
  props: PropsWithChildren<{
    scale?: number;
    frequency?: number;
    duration?: number;
    className?: string;
    containerClassName?: string;
  }>,
) => {
  const {
    scale = 15,
    frequency = 0.065,
    duration = 2.5,
    className = "",
    containerClassName = "",
    children,
  } = props;

  const xFilterId = useCreateFilterId();
  const yFilterId = useCreateFilterId();

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <style>{`
        @keyframes pow-electricity-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute size-0 invisible"
      >
        <defs>
          {/* X-axis displacement: noise in R, G pinned to 0.5 → only X moves */}
          <filter id={xFilterId}>
            <feTurbulence
              type="turbulence"
              baseFrequency={frequency}
              numOctaves="2"
              seed="1"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0.5  0 0 1 0 0  0 0 0 1 0"
              result="noiseX"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noiseX"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {/* Y-axis displacement: R pinned to 0.5, noise moved to G → only Y moves */}
          <filter id={yFilterId}>
            <feTurbulence
              type="turbulence"
              baseFrequency={frequency}
              numOctaves="2"
              seed="2"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.5  1 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="noiseY"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noiseY"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          display: "flex",
          width: "200%",
          willChange: "transform",
          animation: `pow-electricity-slide ${duration}s linear infinite`,
        }}
      >
        <div
          className={className}
          style={{ width: "50%", filter: `url(#${xFilterId})` }}
        >
          {children}
        </div>
        <div
          className={className}
          style={{ width: "50%", filter: `url(#${yFilterId})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Filters = {
  Displacement,
  ChromaAberr,
  Posterize,
  Electricity,
};
