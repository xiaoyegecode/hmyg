import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
fly.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
fly.interceptors.request.use((request) => {
  uni.showLoading({
    title: "加载中..."
  })
  request.headers["X-Tag"] = "flyio";
  return request
})
fly.interceptors.response.use((response) => {
  uni.hideLoading()
  if (response.data.meta.status !== 200) {
    uni.showToast({
      title: '获取数据失败',
      icon: 'error'
    })
    return Promise.reject(new Error('请求失败'))
  }
  return response.data
}, (err) => {
  return Promise.resolve(err)
})
export default fly
