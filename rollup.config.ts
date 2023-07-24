import { defineConfig } from "rollup";

import { glob } from "glob";
import path from "node:path";
import url from "node:url";

import typescript from "rollup-plugin-ts";

export default [
  defineConfig({
    external: ["bezier-easing"],
    input: "src/index.ts",
    output: {
      format: "umd",
      name: "xh_transition",
      dir: "lib/cjs",
      exports: "named",
      globals: {
        "bezier-easing": "BezierEasing"
      }
    },
    plugins: [
      typescript({
        transpiler: {
          typescriptSyntax: "typescript",
          otherSyntax: "babel"
        }
      })
    ]
  }),
  defineConfig({
    external: ["bezier-easing"],
    input: Object.fromEntries(
      glob.sync("src/**/*.ts").map((file) => [
        path.relative("src", file.slice(0, file.length - path.extname(file).length)),
        url.fileURLToPath(new URL(file, import.meta.url))
      ])
    ),
    output: {
      format: "es",
      dir: "lib/esm",
      exports: "named",
      globals: {
        "bezier-easing": "BezierEasing"
      }
    },
    plugins: [
      typescript({
        transpiler: {
          typescriptSyntax: "typescript",
          otherSyntax: "babel"
        }
      })
    ]
  })
];