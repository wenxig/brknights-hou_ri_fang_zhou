module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
      grid: true,
    },
    postCssPxToRem: {
      // 自适应，px>rem转换
      rootValue: 16, // 1rem的大小
      propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
    },
  },
}
