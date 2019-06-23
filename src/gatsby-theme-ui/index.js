import { base } from '@theme-ui/presets'

export default {
  ...base,
  initialColorMode: 'light',
  styles: {
    ...base.styles,
    th: {
      ...base.styles.th,
      borderWidth: 1,
    },
    td: {
      ...base.styles.td,
      borderWidth: 1,
    }
  }
}
