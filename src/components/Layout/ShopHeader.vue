<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
      class="container is-white"
      :fixed-top="true"
    >
      <!-- <template slot="brand">
        <b-navbar-item tag="div">
          <img :src="doubaoImg" alt="logo">
        </b-navbar-item>

        <b-navbar-item
          class="is-hidden-desktop"
          tag="router-link"
          :to="{ path: '/' }"
        >
          主页
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item
          tag="router-link"
          :to="{ path: '/' }"
        >
          主页
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item
         
          @click="navToShop"
        >
          商城
        </b-navbar-item>
      </template> -->

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
              v-model="searchKey"
              class="s_input"
              width="80%"
              placeholder="搜索商品"
              rounded
              clearable
              @keyup.enter.native="search()"
            />

            <p class="control">
              <b-button
                class="is-info"
                @click="search()"
              >检索
              </b-button>
            </p>
          </b-field>
        </b-navbar-item>

        <!-- <b-navbar-item tag="div">
          <b-switch
            v-model="darkMode"
            passive-type="is-warning"
            type="is-dark"
          >
            {{ darkMode ? "夜" : "日" }}
          </b-switch>
        </b-navbar-item> -->

        <b-navbar-item
          v-if="token == null || token === ''"
          tag="div"
        >
          <div class="buttons">
            <b-button
              class="is-light"
              tag="router-link"
              :to="{ path: '/register' }"
            >
              注册
            </b-button>
            <b-button
              class="is-light"
              tag="router-link"
              :to="{ path: '/login' }"
            >
              登录
            </b-button>
          </div>
        </b-navbar-item>

        <b-navbar-dropdown
          v-else
          :label="user.alias"
        >
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.username}/home` }"
          >
            🧘 个人中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="router-link"
            :to="{ path: `/member/${user.username}/setting` }"
          >
            ⚙ 设置中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
            tag="a"
            @click="logout"
          > 👋 退出登录
          </b-navbar-item>
        </b-navbar-dropdown>
        
        <div class="nav">
          <ul>
            <li>
              <router-link to="/shop/order">我的订单</router-link>
            </li>
            <li>
              <router-link to="/shop/collect">我的收藏</router-link>
            </li>
            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/shop/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{getNum}})</span>
              </router-link>
            </li>
        </ul>

        </div>
       
      </template>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters,  mapActions } from 'vuex'

import { getCart } from '@/api/shoppingCart'


export default {
  name: 'ShopHeader',
  data() {
    return {
      searchKey: ''
    }
  },
  created(){
    this.setCart()
  },
  computed: {
    ...mapGetters(['token', 'user', 'getNum'])
  },
  watch: {
    token: function(){
      // this.setCart()
    }
  },
  methods: {
   ...mapActions(["setShoppingCart"]),


   setCart(){
       // 有 token 被视为登录成功，获取登录成功的信息
       if(this.token == undefined || this.token == ''){
        this.setShoppingCart([])
      }else{
        getCart().then((res)=>{
          let list = res.data;
          list.forEach(element => {
            // 购物车选择时用到
            element.check = false;
          });
          this.setShoppingCart(list)
        })
      }
   },

    navToShop() {
      let { href } = this.$router.resolve({
        path: "/shop/goods"
      })
      window.open(href, '_blank');
    },
    async logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$message.info('退出登录成功')
        // setTimeout(() => {
        //   this.$router.push({ path: this.redirect || '/' })
        // }, 500)
        this.$router.go(-1)
      })
    },
    search() {
      console.log(this.token)
      if (this.searchKey.trim() === null || this.searchKey.trim() === '') {
        this.$message.info({
          showClose: true,
          message: '请输入关键字搜索！',
          type: 'warning'
        })
        return false
      }
      this.$router.push({ path: '/search?key=' + this.searchKey })
    }
  }
}
</script>

<style scoped>
input {
  width: 80%;
  height: 86%;
}


.nav {
  width: 1225px;
  margin: 0 auto;
}
.nav ul {
  float: right;
  margin-right: 500px;
}
.nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.nav li .el-button {
  color: #b0b0b0;
}
.nav .el-button:hover {
  color: #ff6700;
}
.nav li a {
  color: #b0b0b0;
}
.nav a:hover {
  color: #ff6700;
}
.nav .shopCart {
  width: 120px;
  background: #424242;
}
.nav .shopCart:hover {
  background: #fff;
}
.nav .shopCart:hover a {
  color: #ff6700;
}
.nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.nav .shopCart-full a {
  color: white;
}
</style>
