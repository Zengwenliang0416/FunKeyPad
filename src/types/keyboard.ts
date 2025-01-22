// 键盘模式类型
export type KeyboardMode = '3x3' | '4x4' | '5x5'

// 字符集类型
export type CharsetType = 'number' | 'letter' | 'symbol'

// 键盘配置接口
export interface IKeyboardConfig {
  mode: KeyboardMode
  charset: CharsetType
  animation: boolean
}

// 全局数据接口
export interface IGlobalData {
  theme: 'light' | 'dark'
  keyboardConfig: IKeyboardConfig
}

// 应用配置接口
export interface IAppOption {
  globalData: IGlobalData
} 