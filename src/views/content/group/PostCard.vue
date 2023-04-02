<template>
    <el-card>

        <div class="top-post-list">
            <div class="top-post-item" style="display: flex; flex-direction: column;">
                <!-- 用户信息 -->
                <div style="display: flex; justify-content: space-between;">
                    <div class="user-info" style="display: flex; margin-left: 10px;">
                        <img :src="post.author.avatar" alt="user avatar" class="user-avatar"
                            style="border-radius: 50%; height: 50px; width: 50px;" />
                        <span class="user-name"
                            style="display: flex; margin-left: 10px; justify-content: center; align-items: center;">{{
                                post.author.name }}</span>
                    </div>
                    <div class="follow-button" style="">
                        <el-button v-if="!post.author.follow" type="success" @click="handleFollow(post.author.id)"
                            round>+关注</el-button>
                        <el-button v-else round class="follow-button">已关注</el-button>
                    </div>
                </div>
                <!-- 内容 -->
                <div style="margin-top: 10px; cursor: pointer" @click="viewDetail(post.id)" >
                    <div>
                        <span style="font-size: 18px;">{{ post.title }}</span>
                    </div>
                    <div style="white-space: normal; max-width: 95%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        <span>{{ post.content }}</span>
                    </div>
                    <div style="margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px;">
                        <div v-for="url, i in post.images">
                            <img :src="url" style="width: 192px; height: 108px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </el-card>
</template>
  
<script>

export default {
    name: 'PostCard',
    props: ['post'],
    data() {
        return {
            // post: {
            //     id: '1',
            //     title: "哈哈哈笑死了",
            //     images: [
            //         'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //         'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //         'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
            //     ],
            //     author: {
            //         id: '11',
            //         name: '小番茄',
            //         avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //         follow: false
            //     },
            //     comments: '6',
            //     like: '2',
            //     group: {
            //         id: '111',
            //         name: '柴犬圈'
            //     },
            //     content: '今天狗子拉丝了哈哈哈哈'
            // },
        }
    },
    created() {

    },
    methods: {
        // 关注
        handleFollow(id) { },

        viewDetail(id){
            // alert()
            this.$router.push({
                path:'/post/detail/' + id
            })            
        }
    }
}
</script>
  
<style scoped></style>
