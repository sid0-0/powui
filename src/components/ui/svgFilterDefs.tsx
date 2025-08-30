const ABERRATION_OFFSET = 0.7;

export const SVGFilterDefs = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
    <defs>
      <filter id="displacementFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.02"
          numOctaves="1"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="2"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      <filter id="chromaAberFilter">
        <feComponentTransfer in="SourceGraphic">
          <feFuncR type="identity" />
          <feFuncG type="table" tableValues="0" />
          <feFuncB type="table" tableValues="0" />
        </feComponentTransfer>
        <feOffset
          dx={-ABERRATION_OFFSET}
          dy={ABERRATION_OFFSET}
          result="redChannel"
        />

        <feComponentTransfer in="SourceGraphic">
          <feFuncR type="table" tableValues="0" />
          <feFuncG type="identity" />
          <feFuncB type="table" tableValues="0" />
        </feComponentTransfer>
        <feOffset
          dx={ABERRATION_OFFSET}
          dy={-ABERRATION_OFFSET}
          result="greenChannel"
        />

        <feComponentTransfer in="SourceGraphic">
          <feFuncR type="table" tableValues="0" />
          <feFuncG type="table" tableValues="0" />
          <feFuncB type="identity" />
        </feComponentTransfer>
        <feOffset
          dx={2 * ABERRATION_OFFSET}
          dy={-2 * ABERRATION_OFFSET}
          result="blueChannel"
        />

        <feBlend in="redChannel" mode="lighten" />
        <feBlend in="greenChannel" mode="lighten" />
        <feBlend in="blueChannel" mode="lighten" />
      </filter>

      <filter id="posterize">
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0  0.25 0.4 0.5 0.75 1" />
          <feFuncG type="discrete" tableValues="0  0.25 0.4 0.5 0.75 1" />
          <feFuncB type="discrete" tableValues="0 0.25 0.4 0.5 0.75 1" />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
);
