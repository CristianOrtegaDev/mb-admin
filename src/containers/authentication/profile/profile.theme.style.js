function shadeColor(color, percent) {
  /* eslint no-bitwise: ["error", { "allow": [">>", "&"] }] */
  const f = parseInt(color.slice(1), 16)
  const t = percent < 0 ? 0 : 255
  const p = percent < 0 ? percent * -1 : percent
  const R = f >> 16
  const G = (f >> 8) & 0x00ff
  const B = f & 0x0000ff
  return (
    '#' +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  ) // eslint-disable-line
}

const styles = theme => ({
  background: {
    background: shadeColor(theme.palette.secondary.main, 0.22),
    '&:before': {
      background: shadeColor(theme.palette.secondary.main, 0.12)
    },
    '&:after': {
      background: theme.palette.secondary.main
    },
    overflow: 'auto',
    color: theme.palette.common.blue
  }
})

export default styles
