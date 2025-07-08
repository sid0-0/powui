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
</svg>
`;
