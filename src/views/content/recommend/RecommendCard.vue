<template>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="head">
            <span>相关推荐</span>
            <!-- <i class="el-icon-refresh pointer" @click="refresh">换一批</i> -->
        </div>
        <div>
            <div v-for="content, index in contentList" :key="content.id" style="display: flex; margin-bottom: 10px;">
                <img :src="content.cover" style="width: 108px; height: 72px; border-radius: 5%;">
                <div style="display: flex; flex-direction: column; justify-content: space-between; margin-left: 5px;">
                    <div>
                        <span
                            style="color: #000000; white-space: normal; max-width: 95%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{
                                content.title }}</span>
                    </div>
                    <div style="">
                        <span style="color: #0f0f0f;">{{ content.auther }}</span>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>
  
<script>
//   import { getList } from '@/api/promote'

import { th } from 'date-fns/locale';

export default {
    name: 'UserRecommendations',
    data() {
        return {

            contentList: [{
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
                auther: 'kimmich',
                type: '1', // 1：文章， 2：商品
                introduction: '',
                hits: '63',
                comments: '80',
                postTime: '2023-02-29',
                vedioLength: '',
            }, {
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
                auther: 'kimmich',
                type: '1', // 1：文章， 2：商品
                introduction: '',
                hits: '63',
                comments: '80',
                postTime: '2023-02-29',
                vedioLength: '',
            }, {
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
                auther: 'kimmich',
                type: '1', // 1：文章， 2：商品
                introduction: '',
                hits: '63',
                comments: '80',
                postTime: '2023-02-29',
                vedioLength: '',
            }, {
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
                auther: 'kimmich',
                type: '1', // 1：文章， 2：商品
                introduction: '',
                hits: '63',
                comments: '80',
                postTime: '2023-02-29',
                vedioLength: '',
            }
            ]

        }
    },
    created() {

    },
    methods: {

        // 换一批
        refresh() {
            alert("换一批")
        },

        showuserInfo(index) {
            alert("index")
        },

        handleFollow(index) {
            let user = this.users[index]
            user.follow = true
        },

        followUser(id) {

        }
    }
}
</script>
  
<style scoped>
.head {
    display: flex;
    justify-content: space-between;
}

.head .el-icon-refresh {
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.user-info {
    display: flex;
}

.user-info .user-avatar {
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

.user-info .user-name {
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    /* text-align:center; */
}

.pointer {
    cursor: pointer;
}
</style>
