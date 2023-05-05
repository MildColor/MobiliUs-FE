export default () => ({
  expo: {
    name: "MobiliUs",
    slug: "map-prac",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      config: {
        googleMaps: {
          apiKey: process.env.apiKey,
        },
      },
      package: "com.jiwoonseo.mapprac",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      API_URL: process.env.API_URL,
      eas: {
        projectId: "5526b943-5e6e-4b5b-918c-d7ae100c11fa",
      },
      runtimeVersion: {
        policy: "sdkVersion",
      },
    },
  },
});
