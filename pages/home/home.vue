<template>
  <view class="home-container">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in banners" :key="item.goods_id" @click="goGoodsDetail(item.goods_id)">
        <view class="swiper-item">
          <image :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="navs">
      <view v-for="(item,index) in navList" :key="index">
        <image :src="item.image_src" @click="navClickHandler(item)"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor">
      <view class="floor_item" v-for="(item,index) in floorsList" :key="index">
        <image :src="item.floor_title.image_src"></image>
        <view class="image_box">
          <view class="left">
            <image :src="item.product_list[0].image_src" @click="goGoodsList(item.product_list[0].navigator_url)">
            </image>
          </view>
          <view class="right_box">

            <view class="right" v-for="(item2,i) in item.product_list.slice(1)" :key="i">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"
                @click="()=>goGoodsList(item2.navigator_url)"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getBannersAPI,
    getNavListAPI,
    getFloorListAPI
  } from '@/api/home.js'
  export default {
    data() {
      return {
        banners: [],
        navList: [],
        floorsList: []
      }
    },
    onLoad() {
      this.getBanners()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getBanners() {
        const res = await getBannersAPI()
        this.banners = res.message
      },
      // 商品详情
      goGoodsDetail(id) {
        console.log(id)
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      // 分类导航
      async getNavList() {
        const res = await getNavListAPI()
        this.navList = res.message
      },
      // 楼层
      async getFloorList() {
        const res = await getFloorListAPI()
        this.floorsList = res.message
      },
      navClickHandler(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      goGoodsList(url) {
        const query = url.split('?')[1]
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?' + query
        })
      }
    },
  }
</script>

<style lang="scss">
  .home-container {
    swiper {
      height: 330rpx;

      .swiper-item,
      image {
        width: 100%;
        height: 100%;
      }
    }

    .navs {
      display: flex;
      justify-content: space-around;
      margin: 15rpx;

      image {
        width: 128rpx;
        height: 140rpx;
      }
    }

    .floor {
      margin-top: 20rpx;

      .floor_item {
        image {
          height: 60rpx;
          width: 750rpx;

        }
      }

      .image_box {
        display: flex;

        .left image {
          width: 232rpx;
          height: 392rpx;
        }

        .right_box {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }


  }
</style>
