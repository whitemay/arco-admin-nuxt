import type { GlobalThemeOverrides } from 'naive-ui'
import { generated } from './generated'

enum ColorSet {
  PRIMARY = '#016D6D',
  INFO = '#528CCC',
  SUCCESS = '#016D6D',
  WARNING = '#CC842E',
  ERROR = '#E33443',
}

export const useColors = {
  primary: generated(ColorSet.PRIMARY),
  info: generated(ColorSet.INFO),
  success: generated(ColorSet.SUCCESS),
  warning: generated(ColorSet.WARNING),
  error: generated(ColorSet.ERROR),
}

export const colorOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: useColors.primary[5],
    primaryColorHover: useColors.primary[4],
    primaryColorPressed: useColors.primary[6],
    primaryColorSuppl: useColors.primary[4],

    infoColor: useColors.info[5],
    infoColorHover: useColors.info[4],
    infoColorPressed: useColors.info[6],
    infoColorSuppl: useColors.info[4],

    successColor: useColors.success[5],
    successColorHover: useColors.success[4],
    successColorPressed: useColors.success[6],
    successColorSuppl: useColors.success[4],

    warningColor: useColors.warning[5],
    warningColorHover: useColors.warning[4],
    warningColorPressed: useColors.warning[6],
    warningColorSuppl: useColors.warning[4],

    errorColor: useColors.error[5],
    errorColorHover: useColors.error[4],
    errorColorPressed: useColors.error[6],
    errorColorSuppl: useColors.error[4],
  },
}
