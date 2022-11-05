<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <view class="price">￥{{goods_info.goods_price}}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 底部商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" open-type="contact" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" url="/pages/cart/cart" link-type="switchTab" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button text="立即购买" />
    </van-goods-action>
  </view>
</template>

<script>
  import {
    getGoodsInfoAPI
  } from "@/api/goods.js"
  export default {
    data() {
      return {
        goods_info: {}
      }
    },
    methods: {
      async getGoodsInfo(id) {
        const res = await getGoodsInfoAPI(id)
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="display:block" ')
          .replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(current) {
        const urls = this.goods_info.pics.map(item => item.pics_big_url)
        uni.previewImage({
          current,
          urls
        })
      }
    },
    onLoad(options) {
      this.getGoodsInfo(options.id)
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
</style>
