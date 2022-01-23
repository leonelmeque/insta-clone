module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', "module:metro-react-native-babel-preset"],
    "plugins": [
      [
        "module-resolver",
        {
          "root": ["."],
          "extensions": [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json"
          ],
          "alias": {
            "@navigation": "./src/navigation",
            "@components": "./src/components",
            "@assets": "./src/assets",
            "@screens": ["./src/screens"],
            "@library": ["./src/library"],
            "@hooks": ["./src/hooks"],
            "@redux": ["./src/redux"],
            "@shared": ["./src/shared"]
          }
        }
      ],
      // 'react-native-reanimated/plugin'
    ]
  };
};
