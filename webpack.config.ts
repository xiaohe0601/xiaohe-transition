import * as webpack from "webpack";
import * as path from "path";

import { merge } from "webpack-merge";

const CommonConfig: webpack.Configuration = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    clean: true,
    filename: "index.js"
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      use: ["babel-loader"],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: [".ts"]
  }
};

const CjsConfig = merge(CommonConfig, {
  output: {
    path: path.resolve(__dirname, "lib", "cjs"),
    library: {
      name: "xiaohe-transition",
      type: "umd",
      umdNamedDefine: true
    }
  }
});

const EsmConfig = merge(CommonConfig, {
  output: {
    path: path.resolve(__dirname, "lib", "esm"),
    module: true,
    library: {
      type: "module"
    }
  },
  experiments: {
    outputModule: true
  }
});

export default [CjsConfig, EsmConfig];