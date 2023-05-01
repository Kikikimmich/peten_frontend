<template>
    <div class="app-group-detail" style="width: 840px; margin: 0px auto;">

        <el-card :body-style="{ padding: '0px' }" style="display: flex;position: relative;">

            <div>
                <img :src="group.background" style="width: 840px; height: 360px;">
            </div>

            <div class="group-detail"
                style="position: absolute;top:250px; width: 100%; padding: 0 30px; color: aliceblue; text-align: center;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="display: flex;">
                        <img :src="group.cover" style="border-radius: 50%; width: 80px; height: 80px;">
                        <div style="margin: auto 0px; transform: translateY(12px);">
                            <div style="font-size: 25px; text-align: center; margin-left: 10px;">
                                {{ group.name }}

                            </div>
                            <div style="font-size: 15px;  text-align: center;transform: translateX(20px);">
                                {{ group.slogan }}</div>
                        </div>

                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center;">
                        <el-button v-if="!post.follow" type="success" @click="handleFollow(post.id)" round>+关注</el-button>
                        <el-button v-else round class="follow-button">已关注</el-button>
                    </div>
                </div>
            </div>

        </el-card>


        <!-- 帖子 -->
        <el-card>
            <div class="top-post-list">
                <div class="top-post-item" v-for="item, index in 10" :key="item.id"
                    style="display: flex; flex-direction: column;">

                    <PostCard :post="post[0]"></PostCard>

                </div>
            </div>
        </el-card>


        <div>
            <!-- 发帖 -->
            <div @click="doPost"
                style="position: fixed; bottom: 120px; right: 300px; width: 50px; height: 50px; border-radius: 50%; text-align: center; line-height: 50px; background-color: rgb(103, 194, 58); color: #f2f2f2; cursor: pointer">
                发帖</div>
            <!-- 刷新 -->
            <div @click="doFlush" class="el-icon-refresh"
                style="position: fixed; bottom: 60px; right: 300px; width: 50px; height: 50px; border-radius: 50%; text-align: center; line-height: 50px; background-color: rgb(103, 194, 58); color: #f2f2f2; font-size: 25px; cursor: pointer">
            </div>
        </div>

        <el-backtop target=".app-group-detail">
            <i class="el-icon-caret-top"></i>
        </el-backtop>



    </div>
</template>


 
<script>

import PostCard from '@/views/content/group/PostCard.vue'

export default {
    name: 'Group',

    components: { PostCard },

    data() {
        return {
            currentDate: new Date(),

            // 热门帖子
            post: [{
                id: '1',
                title: "我真的太喜欢狗子了",
                images: [
                    'http://localhost:9111/image/498b2448-692e-485a-9aff-2ef18684ab42觉.png',
                    'http://localhost:9111/image/b7a67056-8f8b-465a-b9a8-5ad7dfc3a032狗.png',
                    'http://localhost:9111/image/656eda10-3202-47ca-88a7-3122fd1eeaf0基.png'
                ],
                author: {
                    id: '11',
                    name: '小番茄',
                    avatar: 'http://localhost:9111/image/2a210256-1860-4cbc-b02b-c49055a8b871头.png',
                    follow: false
                },
                comments: '6',
                like: '2',
                group: {
                    id: '111',
                    name: '柴犬圈'
                },
                content: '狗子是很可爱的动物，它们是人类的忠实伙伴和好朋友。它们不仅可以带给我们快乐和安慰，还可以帮助我们保护家园和生命财产。因此，我们应该尽可能地保护它们，确保它们能够健康、快乐地生活在这个世界上。'
            }],

            // top five
            group: {
                id: '1',
                cover: 'http://localhost:9111/image/2a210256-1860-4cbc-b02b-c49055a8b871头.png',
                background: 'http://localhost:9111/image/565c8890-9b23-4c94-bb31-df4a59868c82犬.png',
                name: '柴犬',
                slogan: '柴犬有脾气',
            },


            // 内容管理器
            // example
            // content: {
            // id: '1',
            // cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            // title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
            // auther: 'kimmich',
            // type: '1', // 1：文章， 2：商品
            // introduction: '',
            // hits: '63',
            // comments: '80',
            // postTime: '2023-02-29',
            // vedioLength: '',
            // }

        };
    },
    methods: {

        // 关注
        handleFollow(id) {
            alert("关注")
        },

        // 发帖
        doPost() {
            this.$router.push({
                path: '/group/post'
            })
        },

        // 刷新
        doFlush() {
            alert("刷新")
        }

    }
}
</script>

<style>
.app-group-detail {
    height: 100vh;
    overflow-x: hidden;
}
</style>