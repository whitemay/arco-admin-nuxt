import { appName } from './config/const'

export default defineAppConfig({
  title: appName,
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000',
    },
  },
  layout: {
    hideMenu: false,
  },
})
