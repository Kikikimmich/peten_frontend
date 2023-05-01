<template>
    <div style="width: 90%; margin: 0px auto;">

        <el-card>
            <div @click="searchGroup(group.id)"
                style="width: 100%; height: 80px; text-align: right; padding-right: 20px; cursor: pointer">
                <div style="display: inline-block; text-align: right; margin: 0px auto; height: 80px; padding-right: 10px;">
                    <span style="display: block; font-size: 25px;">{{ group.name }}</span>
                    <span>已有 {{ group.follow }} 人加入</span>
                </div>
                <img :src="group.cover" style="border-radius: 50%; width: 80px; height: 80px;">
                <div class="el-icon-arrow-right" style=" font-size: 25px; height: 80px; width: 40px;"></div>
            </div>
        </el-card>

        <el-card>
            <div class="top-post-list">
                <div class="top-post-item" style="display: flex; flex-direction: column;">
                    <!-- 用户信息 -->
                    <div style="display: flex; justify-content: space-between;">
                        <div class="user-info" style="display: flex; margin-left: 10px;">
                            <img :src="post.author.avatar" alt="user avatar" class="user-avatar"
                                style="border-radius: 50%; height: 50px; width: 50px;" />
                            <span class="user-name"
                                style="display: flex; margin-left: 10px; justify-content: center; align-items: center;">
                                {{ post.author.name }}</span>
                        </div>
                        <!-- <div class="follow-button" style="">
                            <el-button v-if="!post.author.follow" type="success" @click="handleFollow(post.author.id)"
                                round>+关注</el-button>
                            <el-button v-else round class="follow-button">已关注</el-button>
                        </div> -->
                    </div>
                    <!-- 内容 -->
                    <div style="margin-top: 10px;">
                        <div>
                            <span style="font-size: 20px; margin-left: 20px;">{{ post.title }}</span>
                        </div>
                       
                        <div
                            style="margin-top: 10px; display: flex; flex-direction: column; text-align: center;">
                            <div v-for="url, i in post.images">
                                <img :src="url" style="width: 864px; height: 486px;">
                            </div>
                        </div>

                        <div
                            style="font-size: 15px; margin-left: 20px; margin-right: 20px;">
                            <span>{{ post.content }}</span>
                        </div>

                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
  
<script>

export default {
    name: 'PostDetail',
    // props: ['post'],
    data() {
        return {

            group: {
                id: '1',
                cover: 'http://localhost:9111/image/565c8890-9b23-4c94-bb31-df4a59868c82犬.png',
                name: '柴犬',
                follow: '600',
            },

            post: {
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
            },
        }
    },
    created() {

    },
    methods: {

        // 进入圈子
        searchGroup(id) {
            alert("圈子")
        },

        // 关注
        handleFollow(id) { },
    }
}
</script>
  
<style scoped></style>
