<template>
    <div style="width: 840px; margin: 0px auto;">

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
                            <div
                                style="font-size: 25px; text-align: center; margin-left: 10px;">
                                {{group.name }}
                                
                            </div>
                            <div
                                style="font-size: 15px;  text-align: center;transform: translateX(20px);">
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
                content: '今天狗子拉丝了哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
            }],

            // top five
            group: {
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                background: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
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
        handleFollow(id) { },

        // 更多帖子
        showMore() {
            alert("更多")
        },

        // 根据圈子搜索帖子
        searchGroup(id) {
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
.group-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
}

.group-item {
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
    padding: 30%;
}</style>