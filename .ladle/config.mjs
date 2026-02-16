/**
 * @type {import('@ladle/react').UserConfig}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  viteConfig: process.cwd() + "/.ladle/vite.config.ts",
  addons: {
    a11y: {
      enabled: true,
    },
    action: {
      enabled: true,
    },
    control: {
      enabled: true,
    },
    ladle: {
      enabled: true,
    },
    mode: {
      enabled: true,
    },
    rtl: {
      enabled: true,
    },
    source: {
      enabled: true,
    },
    theme: {
      enabled: true,
      defaultState: "light",
    },
    width: {
      enabled: true,
      options: {
        xsmall: 414,
        small: 640,
        medium: 768,
        large: 1024,
        xlarge: 1280,
      },
      defaultState: 0,
    },
  },
};
