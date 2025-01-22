import { KeyboardMode, CharsetType } from '../../types/keyboard'

interface IPageData {
  inputText: string
  keys: string[]
  isShuffling: boolean
  mode: KeyboardMode
  charset: CharsetType
  showAnimation: boolean
}

Page<IPageData>({
  data: {
    inputText: '',
    keys: [],
    isShuffling: false,
    mode: '3x3',
    charset: 'number',
    showAnimation: true
  },

  onLoad() {
    this.initKeyboard()
  },

  // 初始化键盘
  initKeyboard() {
    const keys = this.generateKeys()
    this.setData({ keys })
  },

  // 生成按键数组
  generateKeys(): string[] {
    const { mode, charset } = this.data
    let chars: string[] = []

    switch (charset) {
      case 'number':
        chars = Array.from({ length: 9 }, (_, i) => String(i + 1))
        break
      case 'letter':
        chars = Array.from({ length: 26 }, (_, i) => 
          String.fromCharCode(65 + i)
        ).slice(0, 9)
        break
      case 'symbol':
        chars = ['@', '#', '$', '%', '&', '*', '(', ')', '?']
        break
    }

    return this.shuffleArray(chars)
  },

  // 打乱键盘
  shuffleKeys() {
    this.setData({ isShuffling: true })
    let newKeys = [...this.data.keys]
    
    while (!this.isValidShuffle(newKeys)) {
      newKeys = this.shuffleArray(newKeys)
    }

    this.setData({
      keys: newKeys,
      isShuffling: false
    })
  },

  // 验证打乱是否有效
  isValidShuffle(newKeys: string[]): boolean {
    const changedCount = this.data.keys.filter(
      (key, index) => key !== newKeys[index]
    ).length
    return (changedCount / this.data.keys.length) >= 0.3
  },

  // 随机打乱数组
  shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  },

  // 输入字符
  onKeyTap(e: WechatMiniprogram.TouchEvent) {
    const { character } = e.currentTarget.dataset
    this.appendCharacter(character)
    
    // 触感反馈
    wx.vibrateShort({ type: 'light' })
  },

  // 添加字符
  appendCharacter(character: string) {
    const { inputText } = this.data
    this.setData({
      inputText: inputText + character
    })
  },

  // 删除字符
  onDelete() {
    const { inputText } = this.data
    if (inputText.length > 0) {
      this.setData({
        inputText: inputText.slice(0, -1)
      })
    }
  },

  // 清空输入
  onClear() {
    this.setData({ inputText: '' })
  },

  // 切换键盘模式
  onModeChange(e: WechatMiniprogram.TouchEvent) {
    const { mode } = e.currentTarget.dataset
    this.setData({ mode }, () => {
      this.initKeyboard()
    })
  },

  // 切换字符集
  onCharsetChange(e: WechatMiniprogram.TouchEvent) {
    const { charset } = e.currentTarget.dataset
    this.setData({ charset }, () => {
      this.initKeyboard()
    })
  }
}) 