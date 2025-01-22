// app.ts
App<IAppOption>({
  globalData: {
    theme: 'light',
    keyboardConfig: {
      mode: '3x3',
      charset: 'number',
      animation: true
    }
  },
  onLaunch() {
    // 初始化主题
    wx.getSystemInfo({
      success: (res) => {
        const theme = res.theme || 'light'
        this.globalData.theme = theme
        wx.setStorageSync('theme', theme)
      }
    })
  }
}) 