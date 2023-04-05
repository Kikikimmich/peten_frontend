<template>
    <div>

        <el-card :body-style="{ padding: '0px' }" style="display: flex;">
            <span style="margin-left: 10px;">热门圈子</span>
            <div class="hot-group-list">
                <div class="hot-group-item" v-for="item, index in group" :key="item.id">
                    <div @click="searchGroup(item.id)"
                        style="width: 80px; height: 100px; text-align: center;  margin-left: 20px; cursor: pointer">
                        <img :src="item.cover" style="border-radius: 50%; width: 80px; height: 80px;">
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <div class="hot-group-item">
                    <div @click="showMore"
                        style="width: 80px; height: 100px; text-align: center; margin-left: 20px; cursor: pointer">
                        <div class="el-icon-more"
                            style="background-color: #f5f5f5; border-radius: 50%; width: 80px; height: 80px;"></div>
                        <span>更多</span>
                    </div>
                </div>
            </div>

        </el-card>


        <!-- 帖子 -->

        <div class="top-post-list">
            <div class="top-post-item" v-for="item, index in 10" :key="item.id"
                style="display: flex; flex-direction: column;">

                <PostCard :post="post[0]"></PostCard>

            </div>
        </div>

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
            group: [{
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '柴犬',
            },
            {
                id: '2',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '金毛',
            }, {
                id: '3',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '阿拉斯加',
            }, {
                id: '4',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '拉布拉多',
            }, {
                id: '5',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '英短',
            }],

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
        handleFollow(index) { },

        // 更多帖子
        showMore() {
            // alert("更多")
            //跳转页面
            this.$router.push({
                path: '/group/all'
            })
        },

        // 根据圈子搜索帖子
        searchGroup(id) {
            // alert(id)
            this.$router.push({
                path: '/group/detail/' + id
            })
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
.hot-group-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
}

.hot-group-item {
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
}
</style>