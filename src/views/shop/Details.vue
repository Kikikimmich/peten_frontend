<template>
  <div id="details">
    <!-- 头部 -->
  
    <div class="title">
      <p>{{productDetails.name}}</p>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="main">
      <!-- 左侧商品轮播图 -->
      <div class="block">
        <el-carousel height="560px" v-if="productPicture.length>1">
          <el-carousel-item v-for="item, i in productPicture" :key="i">
            <img style="height:560px;" :src="item" :alt="i" />
          </el-carousel-item>
        </el-carousel>
        <div v-if="productPicture.length==1">
          <img
            style="height:560px;"
            :src="productPicture[0]"
            :alt="i"
          />
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{productDetails.name}}</h1>
        <!-- <p class="intro">{{productDetails.introduction}}</p> -->
        
        <div class="customer-service">
        <p class="store">官方自营</p>
          <el-button icon="el-icon-headset" @click="showCustomerService">官方客服</el-button>
        </div>
        
        <div class="price">
          <span>{{productDetails.specialPrice}}元</span>
          <span
            v-show="productDetails.price != productDetails.specialPrice"
            class="del"
          >{{productDetails.price}}元</span>
        </div>
        <div class="pro-list">
          <span class="pro-name">{{productDetails.name}}</span>
          <span class="pro-price">
            <span>{{productDetails.specialPrice}}元</span>
            <span
              v-show="productDetails.price != productDetails.specialPrice"
              class="pro-del"
            >{{productDetails.price}}元</span>
          </span>
          <p class="price-sum">总计 : {{productDetails.specialPrice}}元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button-list">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
          <el-button class="like" @click="addCollect">喜欢</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li>
              <i class="el-icon-circle-check"></i> 官方自营
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 官方发货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天无理由退货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天价格保护
            </li>
          </ul>
        </div>
      </div>

      <!-- 客服窗口 -->
      <div class="chat-window">
        <el-drawer
          title="我是标题"
          size="45%"
          :visible.sync="showChatWindow"
          :with-header="false">
          <div>
            <CustomerService></CustomerService>
          </div>
        </el-drawer>
      </div>
      
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import CustomerService from "@/views/shop/CustomerService.vue";

import { getDetail, addCart, addCollection} from '@/api/product'

import { getCart } from '@/api/shoppingCart'

export default {
  components: { CustomerService },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productId: "", // 商品id
      productDetails: "", // 商品详细信息
      productPicture: "", // 商品图片

      // 客服聊天窗
      showChatWindow: false,
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productId != undefined) {
      this.productId = this.$route.query.productId;
    }
  },
  created(){
    this.productId = this.$route.query.productId;

    this.getDetails(this.productId)
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    // productId: function(id) {
    //   this.getDetails(id);
    //   this.getDetailsPicture(id);
    // }
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),

    // 展示客服聊天框
    showCustomerService(){
      this.showChatWindow = true
    },


    // 获取商品详细信息
    getDetails(id) {
      getDetail(id).then((res)=>{
        this.productDetails = res.data;
        this.productPicture = res.data.images;
      })

    },
   
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      console.log(this.token)
      if(this.token == undefined || this.token == ''){
        this.$router.push({ path: '/login' })
        return;
      }
     
      addCart(this.productId).then((res)=>{
        if(res.code == 200){
          this.notifySucceed("添加成功");
          // 更新购物车信息
          res.data.check = false
          this.unshiftShoppingCart(res.data);
        }
      });
    },
    addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/collect/addCollect", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productId
        })
        .then(res => {
          if (res.data.code == "001") {
            // 添加收藏成功
            this.notifySucceed(res.data.msg);
          } else {
            // 添加收藏失败
            this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  }
};
</script>
<style>
/* 头部CSS */

#details .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .title p {
  display: flex;
  margin-top: 20px;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 10px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .customer-service {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 15px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button-list {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button-list .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button-list .shop-cart {
  width: 260px;
  background-color: #ff6700;
}
#details .main .content .button-list .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button-list .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button-list .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */
</style>