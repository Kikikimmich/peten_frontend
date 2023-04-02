<template>
    <div>

        <div>
            <el-input placeholder="请输入内容" v-model="keyword"  @keyup.enter.native="doSearch" clearable>
            </el-input>
        </div>

        <el-tabs type="border-card" style="">
            <!-- 内容搜索 -->
            <el-tab-pane label="综合">
                <div v-if="hasResult" style="height: 1300px; margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px;">
                    <div v-for="item ,index in contentList" style="">
                        <ContentCard :content="item"></ContentCard>
                    </div>
                
                </div>
                <div v-else style="height: 500px;"><el-empty description="暂无数据"></el-empty></div>
            </el-tab-pane>
            
            <el-tab-pane label="用户">
                <div v-if="hasResult" style="height: 500px;"></div>
                <div v-else style="height: 500px;"><el-empty description="暂无数据"></el-empty></div>
            </el-tab-pane>
        </el-tabs>

        <div style="height: 100px;"></div>
    </div>
</template>


<script>

import ContentCard from '@/components/ContentCard/index.vue'


import { search } from '@/api/search'

export default {
    name: 'SearchResult',


    components: { ContentCard },

    data() {
        return {
            keyword: '',

            hasResult: true,

            result:{
                type: 1,
                data: []
            },


            contentList :[],

            content: {
                id: '1',
                cover: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                title: '真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊真的好狗啊',
                author: 'kimmich',
                type: '1', // 1：文章， 2：商品
                introduction: '',
                hits: '63',
                comments: '80',
                postTime: '2023-02-29',
                videoLength: '',
            }
        }
    },
    created() {

    },
    methods: {
        doSearch(){
            search(this.keyword, 1, 20).then((res)=> {
                console.log(res);
                this.contentList = res.data.list;
            })
        }
    }
}
</script>
  
<style scoped></style>
