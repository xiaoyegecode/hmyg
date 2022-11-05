import fly from '@/utils/request.js'
// 获取轮播图
export const getBannersAPI = () => {
  return fly.get('/home/swiperdata')
}
// 获取分类导航
export const getNavListAPI = () => {
  return fly.get('/home/catitems')
}
// 获取楼层图片
export const getFloorListAPI = () => {
  return fly.get('/home/floordata')
}
