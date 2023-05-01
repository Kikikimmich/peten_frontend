<template>
    <div style="margin: 0% auto; width: 85%;">

        <el-card>

            <div style="display: flex; flex-direction: column; ">
                <GroupCard :group-list="myFollow" :type="'❤我的关注'"></GroupCard>


                <GroupCard :group-list="hot" :type="'🔥热门圈子'"></GroupCard>

                <GroupCard :group-list="dog" :type="'狗狗'"></GroupCard>

                <GroupCard :group-list="cat" :type="'猫猫'"></GroupCard>

                <GroupCard :group-list="others" :type="'其他'"></GroupCard>

            </div>

        </el-card>



    </div>
</template>


 
<script>

import GroupCard from '@/views/content/group/GroupCard.vue'

import { getAllGroup } from '@/api/group'

export default {
    name: 'Group',

    components: { GroupCard },

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

            allGroup: {},
            myFollow: [],
            hot: [],
            dog: [],
            cat: [],
            others: [],
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
            }, {
                id: '6',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '英短',
            }, {
                id: '7',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '英短',
            }, {
                id: '8',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                name: '英短',
            }, {
                id: '9',
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
    created() {
        this.init()
    },
    methods: {

        init() {
            getAllGroup().then(res => {
                let map = res.data.reduce((acc, obj) => {
                    acc.set(obj.name, obj.groups)
                    return acc;
                }, new Map());
                console.log(map)
                this.myFollow = map.get("关注")
                this.hot = map.get("热门")
                this.cat = map.get("猫猫")
                this.dog = map.get("狗狗")
                this.others = map.get("其他")
                console.log(this.others)
            })
        },

        // 关注
        handleFollow(index) { },

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

<style></style>