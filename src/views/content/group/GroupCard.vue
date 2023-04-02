<template>
    <div>

        <el-card :body-style="{ padding: '0px' }" style="display: flex;">
           
           <div style="height: 20px; ">
               <span style="margin-left: 10px; padding-top: 10px; display: block; font-size: large; font-weight: 600;">{{ type }}</span>         
           </div>
           <el-divider></el-divider>
           <div class="group-list">
               <div class="group-item" v-for="item, index in groupList" :key="item.id">
                   <div @click="searchGroup(item.id)"
                       style="width: 80px; height: 100px; text-align: center;  muargin-left: 20px; cursor: pointer">
                       <img :src="item.cover" style="border-radius: 50%; width: 80px; height: 80px;">
                       <span>{{ item.name }}</span>
                   </div>
               </div>
               <!-- <div class="group-item">
                   <div @click="showMore"
                       style="width: 80px; height: 100px; text-align: center; margin-left: 20px; cursor: pointer">
                       <div class="el-icon-arrow-down"
                           style="background-color: #f5f5f5; border-radius: 50%; width: 80px; height: 80px;"></div>
                       <span>展开</span>
                   </div>
               </div> -->
           </div>

       </el-card>


    </div>
</template>


 
<script>

import PostCard from '@/views/content/group/PostCard.vue'

export default {
    name: 'Group',

    components: { PostCard },
    props: ['groupList', 'type'],

    data() {
        return {
            currentDate: new Date(),

            // top five
            // group: [{
            //     id: '1',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     name: '柴犬',
            // },
            // {
            //     id: '2',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     name: '金毛',
            // }, {
            //     id: '3',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     name: '阿拉斯加',
            // }, {
            //     id: '4',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     name: '拉布拉多',
            // }, {
            //     id: '5',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     name: '英短',
            // }],

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
.group-list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
}

.group-item {
    /* background-color: #f2f2f2; */
    padding: 29px;
    /* font-size: 30px; */
    text-align: center;
}

.el-icon-arrow-down {
    font-size: 30px;
    /* text-align: center;
   justify-content: center;
   display: flex; */
    /* padding: 50%; */
    padding: 30%;
}
</style>