export default `
<svg
  width="200"
  height="200"
  viewBox="0 0 220 220"
  xmlns="http://www.w3.org/2000/svg"
  className="hidden"
>
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

  <filter id="chromaticAberrationFilter">
      <feComponentTransfer in='SourceGraphic'>
          <feFuncR type="identity" />
          <feFuncG type="table" tableValues="0" />
          <feFuncB type="table" tableValues="0" />
      </feComponentTransfer>
      <feOffset dx=-1 dy=1 result="redChannel" />

      <feComponentTransfer in='SourceGraphic'>
          <feFuncR type="table" tableValues="0 0" />
          <feFuncG type="identity" />
          <feFuncB type="table" tableValues="0 0" />
      </feComponentTransfer>
      <feOffset dx=1 dy=-1 result="greenChannel" />

      <feComponentTransfer in="SourceGraphic">
          <feFuncR type="table" tableValues="0 0" />
          <feFuncG type="table" tableValues="0 0" />
          <feFuncB type="identity" />
      </feComponentTransfer>

      <feOffset dx=2 dy=-2 result="blueChannel" />

      <feBlend in="redChannel" mode="lighten" />
      <feBlend in="greenChannel" mode="lighten" />
      <feBlend in="blueChannel" mode="lighten" />
  </filter>
</svg>
`;
