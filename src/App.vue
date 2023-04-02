<template>
  <div>
    <div class="mb-8" v-show="$route.meta.headerShow">
      <Header></Header>
    </div>
    <div v-show="$route.meta.shopHeaderShow">
      <ShopHeader></ShopHeader>
    </div>

    <div class="container context">
        <router-view :key="this.$route.fullPath"></router-view>
    </div>

    <!-- <div>
      <Footer></Footer>
    </div> -->
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import ShopHeader from "@/components/Layout/ShopHeader";
import Footer from "@/components/Layout/Footer";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: { Header, Footer, ShopHeader, RouterView },
};
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>
