<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" style="display: flex;">
            <span style="margin-left: 10px;">我的关注</span>
            <div class="follow-list">
                <div class="follow-item" v-for="item, index in follow" :key="item.id">
                    <div @click="searchUp(item.id)"
                        style="width: 80px; height: 100px; text-align: center;  margin-left: 20px; cursor: pointer">
                        <img :src="item.cover" style="border-radius: 50%; width: 80px; height: 80px;">
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <div class="follow-item">
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
        <el-card>
            <!-- <div class="top-post-list">
                <div class="top-post-item" v-for="item, index in 10" :key="item.id"
                    style="display: flex; flex-direction: column;">
                    
                    <PostCard :post="post[0]"></PostCard>
                   
                </div>
            </div> -->
        </el-card>

    </div>
</template>


 
<script>

import PostCard from '@/views/content/group/PostCard.vue'

export default {
    name: 'Follow',
    
    components: { PostCard },

    data() {
        return {
            currentDate: new Date(),

            // top five
            follow: [{
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '小柴犬',
            },
            {
                id: '2',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '小鸡毛',
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


        };
    },
    methods: {

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
    padding: 30%;
}</style>