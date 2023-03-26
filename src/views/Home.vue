<template>
  <div>
    <!-- <div class="box">🔔 {{ billboard.content }}</div> -->
    <div class="columns">
      <div class="content-list">
        <TopicList></TopicList>
        <ArticleList></ArticleList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import PostList from '@/views/post/Index'

import ArticleList from '@/views/article/ArticleList.vue'

import TopicList from '@/views/article/Index.vue'


export default {
  name: "Home",
  components: {CardBar, TopicList, ArticleList},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>

<style>
.content-list {
 width: 76%;
}
</style>