<template>
    <div class="app-content">
        <el-card shadow="never">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="推荐" name="recommend">
                    <div class="infinite-list-wrapper" style="overflow:auto">
                        <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                            style="display: flex; justify-content: space-between; flex-direction:row ;flex-wrap: wrap;">
                            <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
                            <div v-for="(item, index) in articleList" :key="index" class="list-item" style=";">
                                <ContentCard :content=item></ContentCard>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-evenly;">
                            <p v-if="loading">加载中...</p>
                            <p v-if="noMore">没有更多了</p>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="热门" name="hot">
                    <div class="infinite-list-wrapper" style="overflow:auto">
                        <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                            style="display: flex; justify-content: space-between; flex-direction:row ;flex-wrap: wrap;">
                            <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
                            <div v-for="(item, index) in topArticleList" :key="index" class="list-item" style=";">
                                <ContentCard :content=item></ContentCard>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-evenly;">
                            <p v-if="loading">加载中...</p>
                            <p v-if="noMore">没有更多了</p>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="关注" name="subscribe">
                    <div class="infinite-list-wrapper" style="overflow:auto">
                        <Follow></Follow>
                        <!-- <div style="display: flex; justify-content: space-evenly;">
                            <p v-if="loading">加载中...</p>
                            <p v-if="noMore">没有更多了</p>
                        </div> -->
                    </div>
                </el-tab-pane>

                <el-tab-pane label="圈子" name="group">
                    <div class="infinite-list-wrapper" style="overflow:auto">
                        <Group></Group>
                    </div>
                </el-tab-pane>

            </el-tabs>
        </el-card>

        <el-backtop target=".app-content">
            <i class="el-icon-caret-top"></i>
        </el-backtop>


    </div>
</template>
  
<script>

import { getList, getTopHot } from '@/api/article'

import ContentCard from '@/components/ContentCard/index.vue'

import Group from '@/views/content/group/Group.vue'

import Follow from '@/views/content/follow/Follow.vue'

export default {
    name: 'ArticleList',
    components: { ContentCard, Group, Follow },
    data() {
        return {

            activeName: 'recommend',

            count: 10,
            loading: false,

            articleList: [],

            // 热门
            topArticleList:[],

            page: {
                page: 1,
                pageSize: 10,
                totalRow: 0,

            },
        }
    },
    computed: {
        noMore() {
            return this.count >= 20
        },
        disabled() {
            return this.loading || this.noMore
            // return true
        }
    },
    created() {
        this.init()
    },

    mounted(){
     let name = sessionStorage.getItem('currentTab') 
     // 判断是否存在currentTab，即tab页之前是否被点击切换到别的页面
     if(name){
       this.activeName = name
      }
    },
    beforeRouteLeave(to, from, next){
      // 在离开此路由之后清除保存的状态（我的需求是只需要在当前tab页操作刷新保存状态，路由切换之后不需要保存）
      // 根据个人需求决定清除的时间
       sessionStorage.removeItem('currentTab')
       next()
    },

    methods: {

        handleClick(tab) {
            this.page.page = 1
            this.init()
            sessionStorage.setItem('currentTab', tab.name)
        },

        load() {
            this.loading = true
            setTimeout(() => {
                this.count += 2
                this.loading = false
            }, 2000)
        },

        init() {
            getList(this.page.page, this.page.pageSize, "").then((res) => {
                let data = res.data;
                this.page.page = data.pageInfo.page
                this.page.totalRow = data.pageInfo.totalRow
                this.page.pageSize = data.pageInfo.pageSize
                this.articleList = data.list
            })

            getTopHot().then(res =>{
                this.topArticleList = res.data
            })
        },
    }
}
</script>

<style>

.app-content {
    height: 100vh;
    overflow-x: hidden;
}

</style>