// import { configure } from "@storybook/react";
// import { initDefaultTheme } from "../src/setup";
//
// initDefaultTheme();
//
// configure(
//   [
//     require.context("../src/stories", true, /\.story\.tsx$/),
//     require.context("../src/stories", true, /\.story\.mdx$/),
//     require.context("../src/modules", true, /\.story\.tsx$/),
//     require.context("../src/modules", true, /\.story\.mdx$/)
//   ],
//   module
// );
module.exports = {
  stories: ['../src/**/*.story.(tsx|mdx)'],
  addons: ['@storybook/addon-docs'],
};
