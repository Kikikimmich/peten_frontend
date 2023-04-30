<template>
  <div class="columns">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ article.title }}</p>
          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(article.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
            <el-divider direction="vertical" />
            <span>发布者：{{article.authorInfo.name }}</span>
            <el-divider direction="vertical" />
            <span>查看：{{ article.views }}</span>
          </div>
        </div>

        <!--Markdown-->
        <!-- <div id="preview" /> -->
        <MarkDown :value="article.content"></MarkDown>

        <!--标签-->
        <!-- <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                <router-link
                  v-for="(tag, index) in tags"
                  :key="index"
                  :to="{ name: 'tag', params: { name: tag.name } }"
                >
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + tag.name }}
                  </b-tag>
                </router-link>
              </b-taglist>
            </p>
          </div>
          <div
            v-if="token && user.id === article.aurhor"
            class="level-right"
          >
            <router-link
              class="level-item"
              :to="{name:'topic-edit',params: {id:article.id}}"
            >
              <span class="tag">编辑</span>
            </router-link>
            <a class="level-item">
              <span
                class="tag"
                @click="handleDelete(article.id)"
              >删除</span>
            </a>
          </div>
        </nav> -->
      </el-card>

      <!-- <lv-comments :slug="topic.id" />  -->
      <article-comment></article-comment>
    </div>

    <div class="column">
      <!--作者-->
      <Author
        v-if="flag"
        :user="topicUser"
      />
      <!--推荐-->
      <recommend
        v-if="flag"
        :topic-id="topic.id"
      />
    </div>


    <!-- 推荐 -->
    <div style="margin-top: 10px;">
        <ContentRecommendations></ContentRecommendations>
    </div>

  </div>
</template>

<script>

import { getDetail } from "@/api/article";
import { mapGetters } from 'vuex'
import ArticleComment from '@/components/Comment/CommentsV2'
import MarkDown from "@/components/MarkDown";

import ContentRecommendations from "@/views/content/recommend/RecommendCard.vue";

export default {
  name: 'TopicDetail',
  components: {ArticleComment, MarkDown, ContentRecommendations},
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      article: {
        id: '',
        content: '',
        cover:'',
        title:'',
        author:'',
        createTime:''
      },
      detail:{
        views: 0
      },
      userInfo:{
        id: ''
      },
      flag: false,
    }
  },
  mounted() {
    this.fetchArticle()
  },
  methods: {
     // 初始化
     async fetchArticle() {
      getDetail(this.$route.params.id).then(res => {
        this.article = res.data;
        console.log(this.article)
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
</style>
