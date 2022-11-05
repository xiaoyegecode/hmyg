import fly from '@/utils/request.js'
export const getSearchGoodsAPI = data => fly.get('/goods/search', data)
export const getGoodsInfoAPI = (goods_id) => fly.get('/goods/detail', {
  goods_id
})
