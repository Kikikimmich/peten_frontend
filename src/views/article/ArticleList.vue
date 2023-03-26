<template>
    <div>
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

                <el-tab-pane label="关注" name="subscribe">
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

                <el-tab-pane label="圈子" name="group">
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

            </el-tabs>
        </el-card>
    </div>
</template>
  
<script>

import { getList } from '@/api/article'

import ContentCard from '@/components/ContentCard/index.vue'

export default {
    name: 'ArticleList',
    components: { ContentCard },
    data() {
        return {

            activeName: 'recommend',

            count: 10,
            loading: false,

            articleList: [],
            page: {
                page: 1,
                pageSize: 10,
                totalRow: 0,

            },
            tab: 'latest'
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
        this.init(this.tab)
    },
    methods: {

        handleClick(tab) {
            this.page.page = 1
            this.init(tab.name)
        },

        load() {
            this.loading = true
            setTimeout(() => {
                this.count += 2
                this.loading = false
            }, 2000)
        },

        init(tab) {
            getList(this.page.page, this.page.pageSize, tab).then((res) => {
                let data = res.data;
                this.page.page = data.pageInfo.page
                this.page.totalRow = data.pageInfo.totalRow
                this.page.pageSize = data.pageInfo.pageSize
                this.articleList = data.list
            })
        },
    }
}
</script>

<style></style>