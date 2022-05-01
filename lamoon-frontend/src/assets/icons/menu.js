const Menu = ({ fill }) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="38" height="38" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          fill="#000"
          xlinkHref="#image0_46_111"
          transform="scale(0.0111111)"
        />
      </pattern>
      <image
        id="image0_46_111"
        width="90"
        height="90"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default Menu;
