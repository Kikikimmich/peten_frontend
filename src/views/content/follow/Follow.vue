<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" style="display: flex;">
            <span style="margin-left: 10px;">我的关注</span>
            <div class="follow-list">
                <div class="follow-item" v-for="item, index in follow" :key="item.id">
                    <div @click="searchUp(item.id)"
                        style="width: 80px; height: 100px; text-align: center;  margin-left: 20px; cursor: pointer">
                        <!-- <img :src="item.cover" style="border-radius: 50%; width: 80px; height: 80px;"> -->
                        <img v-if="item.cover != undefined && item.cover != null && item.cover !=''" :src="item.cover" alt="user avatar" class="user-avatar" />
                        <div v-else style="border-radius: 50%; display: inline-block;
                            width: 50px;
                            height: 50px;
                            background-color: #ccc;
                            color: #fff;
                            border-radius: 50%;
                            text-align: center;
                            line-height: 50px;
                            font-size: 24px;
                            margin-right: 0px;">
                            {{item.name.charAt(0)}}
                        </div>
                        <span style="display: block;">{{ item.name }}</span>
                    </div>
                </div>
                <div class="follow-item">
                    <div @click="showMore"
                        style="width: 80px; height: 100px; text-align: center; margin-left: 20px; cursor: pointer">
                        <div class="el-icon-more"
                            style="background-color: #f5f5f5; border-radius: 50%; width: 50px; height: 50px;"></div>
                        <span style="display: block;">更多</span>
                    </div>
                </div>
            </div>

        </el-card>


        <!-- 帖子 -->
        <el-card>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="图文" name="content">
                    <div class="infinite-list-wrapper" style="overflow:auto">
                        <div class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                            style="display: flex; flex-direction: column;">
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

                <el-tab-pane label="动态" name="post">
                    <div class="follow-post-list">
                        <div class="top-post-item" v-for="item, index in 10" :key="item.id"
                            style="display: flex; flex-direction: column;">

                            <PostCard :post="post" :hasFollow="true"></PostCard>

                        </div>
                    </div>
                </el-tab-pane>

            </el-tabs>
        </el-card>

    </div>
</template>


 
<script>

import PostCard from '@/views/content/group/PostCard.vue'
import ContentCard from '@/views/content/follow/Content.vue'

import { getList } from '@/api/content'

import { getMyFollow } from '@/api/follow'

import { getMyFollowPost } from '@/api/follow'


export default {
    name: 'Follow',

    components: { PostCard, ContentCard },

    data() {
        return {


            activeName: 'content',

            count: 10,
            loading: false,

            articleList: [],
            page: {
                page: 1,
                pageSize: 10,
                totalRow: 0,

            },

            currentDate: new Date(),

            // top five
            follow: [
            // {
            //     id: '1',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     name: '小柴犬',
            // },
           ],


            post: {
                id: '1',
                title: "哈哈哈笑死了",
                images: [
                    'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
                ],
                author: {
                    id: '11',
                    name: '小番茄',
                    avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                    follow: false
                },
                comments: '6',
                like: '2',
                group: {
                    id: '111',
                    name: '柴犬圈'
                },
                content: '今天狗子拉丝了哈哈哈哈'
            },

        };
    },
    created() {
        this.init()
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
    mounted() {
        let name = sessionStorage.getItem('follow-currentTab')
        // 判断是否存在currentTab，即tab页之前是否被点击切换到别的页面
        if (name) {
            this.activeName = name
        }
    },
    beforeRouteLeave(to, from, next) {
        // 在离开此路由之后清除保存的状态（我的需求是只需要在当前tab页操作刷新保存状态，路由切换之后不需要保存）
        // 根据个人需求决定清除的时间
        sessionStorage.removeItem('follow-currentTab')
        next()
    },
    methods: {

        handleClick(tab) {
            this.page.page = 1
            sessionStorage.setItem('follow-currentTab', tab.name)
        },

        init() {
            // getList(this.page.page, this.page.pageSize, "").then((res) => {
            //     let data = res.data;
            //     this.page.page = data.pageInfo.page
            //     this.page.totalRow = data.pageInfo.totalRow
            //     this.page.pageSize = data.pageInfo.pageSize
            //     this.articleList = data.list
            // })

            getMyFollow().then(res=>{
                if (res.data.length > 5) {
                    this.follow = res.data.slice(0, 5)
                }else{
                    this.follow = res.data
                }
            })

            getMyFollowPost().then(res=>{
                this.articleList = res.data
            })


        },


        load() {
            this.loading = true
            setTimeout(() => {
                this.count += 2
                this.loading = false
            }, 2000)
        },

        // 关注
        handleFollow(index) { },

        // 更多帖子
        showMore() {
            alert("更多")
        },

        // 根据up搜索
        searchUp(id) {
            alert(id)
        },


        viewContent(id) {
            // this.$router.push({
            //     path: '/article/' + id
            // })
        },

        searchAuthor(id) {
            alert("author")
        }
    }
}
</script>

<style>
.follow-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
}

.follow-item {
    /* background-color: #f2f2f2; */
    padding: 10px;
    /* font-size: 30px; */
    text-align: center;
}

.el-icon-more {
    font-size: 30px;
    /* text-align: center;
   justify-content: center;
   display: flex; */
    /* padding: 50%; */
    padding: 15%;
}
</style>