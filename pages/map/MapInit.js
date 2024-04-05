// 初始化地图
export default {
  init () {
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if (window.T) {
        console.log('地图脚本初始化成功...')
        resolve(window.T)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('error')
      }
    })
  }
}
