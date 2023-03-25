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
                            <img :src="avatar" alt="user avatar" class="user-avatar" />
                            <span class="user-name">{{ user.userName }}</span>
                        </div>
                        <div class="follow-button">
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

import { th } from 'date-fns/locale';

export default {
    name: 'UserRecommendations',
    data() {
        return {
            avatar: require('@/assets/logo.png'),
            users: [{
                id: '1',
                userName: 'user1',
                avatar: '',
                follow: false,
            }, {
                id: '2',
                userName: 'user2',
                avatar: '',
                follow: false,
            }, {
                id: '3',
                userName: 'user3',
                avatar: '',
                follow: false,
            }, {
                id: '4',
                userName: 'user4',
                avatar: '',
                follow: false,
            }, {
                id: '5',
                userName: 'user5',
                avatar: '',
                follow: false,
            }],

            hasFollow: false
        }
    },
    created() {
        
    },
    methods: {

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
