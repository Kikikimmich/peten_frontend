<template>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="head">
            <span>🥂 为您推荐</span>
            <i class="el-icon-refresh pointer" @click="refresh">换一批</i>
        </div>
        <div>
            <ul>
                <li v-for="user, index in users" :key="user.id">
                    <div class="user-item">
                        <div class="user-info pointer" @click="showuserInfo(index)">
                            <img v-if="user.avatar !=''" :src="avatar" alt="user avatar" class="user-avatar" />
                            <div v-else style="border-radius: 50%; display: inline-block;
                                width: 50px;
                                height: 50px;
                                background-color: #ccc;
                                color: #fff;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 50px;
                                font-size: 24px;
                                margin-right: 0px;">
                                {{user.name.charAt(0)}}
                            </div>
                            <span class="user-name">{{ user.name }}</span>
                        </div>
                        <div class="follow-button" style="margin-right: 0px;">
                            <el-button v-if="!user.follow" type="success" @click="handleFollow(index)" round >+关注</el-button>
                            <el-button v-else round class="follow-button">已关注</el-button>
                        </div>
                    </div>
                   
                </li>
            </ul>
        </div>
    </el-card>
</template>
  
<script>
//   import { getList } from '@/api/promote'
import { recommend } from '@/api/user'

import { th } from 'date-fns/locale';

import { mapGetters } from "vuex";

export default {
    name: 'UserRecommendations',
    data() {
        return {
            avatar: require('@/assets/logo.png'),
            users: [{
                id: '1',
                name: 'user1',
                avatar: '',
                follow: false,
            }, {
                id: '2',
                name: 'user2',
                avatar: '',
                follow: false,
            }, {
                id: '3',
                name: 'user3',
                avatar: '',
                follow: false,
            }, {
                id: '4',
                name: 'user4',
                avatar: '',
                follow: false,
            }, {
                id: '5',
                name: 'user5',
                avatar: '',
                follow: false,
            }],

            hasFollow: false
        }
    },
    created() {
        this.fetchRecommendUser()
    },
    computed: {
            ...mapGetters(["userInfo"]),
    },
    methods: {
        
        fetchRecommendUser(){
            recommend().then((res) => {
                this.users = res.data
            })
        },

        // 换一批
        refresh(){
            alert("换一批")
        },

        showuserInfo(index){
            alert("index")
        },

        handleFollow(index){
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

.head .el-icon-refresh{
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

.follow-button {
}

.pointer {
 cursor: pointer;   
}
</style>
