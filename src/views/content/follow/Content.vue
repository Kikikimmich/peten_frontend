<template>
    <div>

        <el-card :body-style="{ padding: '0px' }">

            <!-- 用户信息 -->
            <div @click="searchAuthor(content.id)"
                style="display: flex; justify-content: space-between; margin-top: 20px; cursor: pointer">
                <div class="user-info" style="display: flex; margin-left: 10px;">
                    <img :src="content.author.avatar" alt="user avatar" class="user-avatar"
                        style="border-radius: 50%; height: 50px; width: 50px;" />
                    <div
                        style="display: flex; flex-direction: column; margin-left: 10px; justify-content: center; align-items: left;">
                        <span class="user-name" style="display: block;">{{ content.author.name }}</span>
                        <span style="display: block;">{{ content.postTime }}</span>
                    </div>

                </div>
            </div>

            <div @click="viewContent(content.id)"
                style="cursor: pointer; margin-left: 50px; margin-top: 10px; display: flex;">
                <div style="">
                    <img :src="content.cover" style="width: 192px; height: 108px;">

                </div>
                <div style="margin-left: 10px; height: 108px;position: relative;">
                    <div
                        style="margin-top: 5px; font-size: large; font-weight: 600; white-space: normal; max-width: 480px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">
                        <span v-html="content.title"></span>
                    </div>
                    <div
                        style="margin-top: 5px; white-space: normal; max-width: 480px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                        <span v-html="content.introduction"></span>
                    </div>
                    <div
                        style="position: absolute; bottom: 0; color: black;">
                        <i :class="content.type == 1 ? 'el-icon-document' : 'el-icon-video-play'" style=""> {{
                            content.hits }}</i>
                        <i class="el-icon-chat-line-square" style="margin-left: 12px;"> {{ content.comments }}</i>
                    </div>
                </div>

            </div>
        </el-card>

    </div>
</template>
  
  
<script>

export default {
    name: 'ContentCard',
    props: ['content'],
    data() {
        return {
            currentDate: new Date(),

            title: '<span style="color: red">666</span>'

            // 内容管理器
            // example
            // content: {
            //     id: '1',
            //     cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            //     title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
            //     auther: 'kimmich',
            //     type: '1', // 1：文章， 2：商品
            //     introduction: '',
            //     hits: '63',
            //     comments: '80',
            //     postTime: '2023-02-29',
            //     vedioLength: '',
            // }

        };
    },
    methods: {
        viewContent(id) {

            let { href } = this.$router.resolve({
                path: '/article/' + id
            })
            window.open(href, '_blank');
        },

        searchAuthor(id) {
            alert("author")
        }
    }
}
</script>

<style></style>