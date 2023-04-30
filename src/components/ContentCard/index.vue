<template>
    <div>

        <el-card :body-style="{ padding: '0px' }" style="display: flex; flex-direction: column;">

            <div @click="viewContent(content.id)" style="cursor: pointer">
                <div class="cover" style="position: relative;">
                    <img :src="content.cover" class="image">
                    <div class="content-info"
                        style="position: absolute; left: 0; bottom: 0; margin-left: 10px; color: aliceblue;">
                        <i :class="content.type == 1 ? 'el-icon-video-play' : 'el-icon-document'" style=""> {{ content.views
                        }}</i>
                        <i class="el-icon-chat-line-square" style="margin-left: 12px;"> {{ content.comments }}</i>
                    </div>
                </div>

                <div
                    style="margin-top: 5px; font-size: large; font-weight: 600; white-space: normal; max-width: 280px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                    <span v-html="content.title"></span>
                </div>
            </div>

            <div @click="searchAuthor(content.id)" style="cursor: pointer">
                <i class="el-icon-user"> {{ content.authorInfo.name }} · {{ content.createTime }}</i>
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

<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 384px;
    height: 216px;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>