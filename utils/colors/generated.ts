import type { HsvColor } from 'colord'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

const hueStep = 2 // 色相阶梯
const saturationStep = 16 // 饱和度阶梯，浅色部分
const saturationStep2 = 5 // 饱和度阶梯，深色部分
const brightnessStep1 = 5 // 亮度阶梯，浅色部分
const brightnessStep2 = 15 // 亮度阶梯，深色部分
const lightColorCount = 5 // 浅色数量，主色上
const darkColorCount = 4 // 深色数量，主色下
// 暗色主题颜色映射关系表
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
]

function getHue({ h }: HsvColor, i: number, light?: boolean): number {
  let hue: number
  // 根据色相不同，色相转向不同
  if (h >= 60 && h <= 240)
    hue = light ? h - hueStep * i : h + hueStep * i
  else
    hue = light ? h + hueStep * i : h - hueStep * i

  if (hue < 0)
    hue += 360
  else if (hue >= 360)
    hue -= 360

  return hue
}

function getSaturation(hsv: HsvColor, i: number, light?: boolean): number {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0)
    return hsv.s

  let saturation: number
  if (light)
    saturation = hsv.s - saturationStep * i
  else if (i === darkColorCount)
    saturation = hsv.s + saturationStep
  else
    saturation = hsv.s + saturationStep2 * i

  // 边界值修正
  if (saturation > 100)
    saturation = 100

  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 10)
    saturation = 10

  if (saturation < 6)
    saturation = 6

  return saturation
}

function getValue(hsv: HsvColor, i: number, light?: boolean): number {
  let value: number
  if (light)
    value = hsv.v + brightnessStep1 * i
  else
    value = hsv.v - brightnessStep2 * i

  if (value > 100)
    value = 100

  return value
}

interface Opts {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}

export function generate(color: string, opts: Opts = {}): string[] {
  const patterns: string[] = []
  const pColor = colord(color)
  const hsv = pColor.toHsv()
  console.log(hsv)
  for (let i = lightColorCount; i > 0; i -= 1) {
    const colorString: string = colord({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true),
    }).toHex()
    patterns.push(colorString)
  }
  patterns.push(pColor.toHex())
  for (let i = 1; i <= darkColorCount; i += 1) {
    const colorString: string = colord({
      h: getHue(hsv, i),
      s: getSaturation(hsv, i),
      v: getValue(hsv, i),
    }).toHex()
    patterns.push(colorString)
  }

  // dark theme patterns
  if (opts.theme === 'dark') {
    return darkColorMap.map(({ index, opacity }) =>
      colord(opts.backgroundColor || '#141414')
        .mix(patterns[index], opacity)
        .toHex(),
    )
  }
  return patterns
}

export function generated(color: string): string[] {
  const cd = colord(color)
  const tints = cd.tints(7).reverse().slice(1)
  const shades = cd.shades(6).slice(1, 5)
  return [...tints, ...shades].map(c => c.toHex())
}
