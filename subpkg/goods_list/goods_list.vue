<template>
  <view>
    <van-card v-for="item in goodsList" :key="item.goods_id" :price="item.goods_price | tofixed"
      :title="item.goods_name" :thumb="item.goods_small_logo || defaultImg"
      :thumb-link=" '/subpkg/goods_detail/goods_detail?id=' + item.goods_id"></van-card>
    <van-divider v-if=" isFinished" contentPosition="center" textColor="#1989fa">亲，暂无更多数据</van-divider>
  </view>
</template>

<script>
  import {
    getSearchGoodsAPI
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        defaultImg: "https://img01.yzcdn.cn/vant/ipad.jpeg",
        isLoading: false,
        isFinished: false
      }
    },
    methods: {
      async getSearchGoods() {
        this.isLoading = true
        const {
          message
        } = await getSearchGoodsAPI(this.queryObj)
        this.isLoading = false
        this.goodsList = [...this.goodsList, ...message.goods]
        this.total = message.total
        if (this.goodsList.length >= this.total) {
          this.isFinished = true
        }
      }
    },
    onLoad({
      query,
      cid
    }) {
      this.queryObj.query = query || ''
      this.queryObj.cid = cid || ''
      this.getSearchGoods()
    },
    onReachBottom() {
      if (this.isLoading || this.isFinished) return
      this.queryObj.pagenum += 1
      this.getSearchGoods()
    }
  }
</script>

<style>

</style>
