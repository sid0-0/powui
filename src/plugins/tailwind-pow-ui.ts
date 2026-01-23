import plugin from "tailwindcss/plugin";

export default plugin(({ addUtilities }) => {
  addUtilities({
    ".bg-dot": {
      "--dot-color": "black",
      "--dot-size": "0.15rem",
      background:
        "radial-gradient(circle at center, rgba(0,0,0,0.3) 0.02rem, var(--dot-color) 0), var(--dot-color)",
      backgroundSize: "var(--dot-size) var(--dot-size)",
    },
  });
});
