<template>
  <div>
    <div class="mb-5" v-show="$route.meta.headerShow">
      <Header></Header>
    </div>
    <div v-show="$route.meta.shopHeaderShow">
      <ShopHeader></ShopHeader>
    </div>

    <div class="container context">
        <router-view :key="this.$route.fullPath"></router-view>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import ShopHeader from "@/components/Layout/ShopHeader";
import Footer from "@/components/Layout/Footer";

export default {
  name: "App",
  components: { Header, Footer, ShopHeader },
};
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>
