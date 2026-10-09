import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import minifyHTML from "@lit-labs/rollup-plugin-minify-html-literals";

const dev = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/librus-synergia-cards.ts",
  output: {
    file: "dist/librus-synergia-cards.js",
    format: "es",
    sourcemap: dev,
  },
  onwarn(warning, warn) {
    // @formatjs/intl-utils (via custom-card-helpers) is compiled TS with
    // `this && this.__assign` helpers at module level - harmless.
    if (warning.code === "THIS_IS_UNDEFINED" && warning.id?.includes("@formatjs")) return;
    warn(warning);
  },
  plugins: [
    // Minifies the markup and CSS inside lit's html`` / svg`` / css``
    // templates (whitespace, comments) - bindings are left untouched.
    // Conservative whitespace collapsing: runs of spaces become one space,
    // never none, so text next to an inline element keeps its gap.
    !dev &&
      minifyHTML({
        include: ["src/**/*.ts"],
        options: {
          minifyOptions: { conservativeCollapse: true },
        },
      }),
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    !dev && terser(),
  ].filter(Boolean),
};
