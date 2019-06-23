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
      borderColor: 'muted',
    },
    code: {
      fontFamily: 'monospace',
      fontSize: '87.5%',
      color: 'secondary',
      bg: 'muted',
    },
    pre: {
      p: 3,
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
      overflowX: 'auto',
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  }
}
