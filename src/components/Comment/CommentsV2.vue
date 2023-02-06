<template>
    <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
            <div class="reply-info">
                <div

                        tabindex="0"
                        contenteditable="true"
                        id="replyInput"
                        spellcheck="false"
                        placeholder="输入评论..."
                        class="reply-input"
                        @focus="showReplyBtn"
                        @input="onDivInput($event)"
                >
                </div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
            </div>
        </div>
        <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{item.from.userName}}</span>
                <span class="author-time">{{item.createTime}}</span>
            </div>
            <div class="icon-btn">
                <span @click="showReplyInput(i,item.from.userName,item.id)">
                    <i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span>
                <i class="iconfont el-icon-caret-top" @click="operateLike(item.id)"></i>{{item.like}}
                <i class="iconfont el-icon-caret-bottom" @click="operateLike(item.id)"></i>{{item.like}}
                <el-dropdown style="float: right;">
                    <span class="el-dropdown-link">
                        <i class="iconfont el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item ><div @click="block(item.id)">拉黑</div></el-dropdown-item>
                        <el-dropdown-item ><div @click="report(item.id)">举报</div></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.content}}</span>
                </p>
            </div>
            <div class="reply-box">
                <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                    <el-avatar class="header-img" :size="40" :src="reply.from.avatar"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{reply.from.userName}}</span>
                        <span class="author-time">{{reply.createTime}}</span>
                    </div>
                    <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.from.userName,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span>
                        <i class="iconfont el-icon-caret-top" @click="operateLike(reply.from.id)" style="color: lightgreen;"></i>{{reply.like}}
                        <i class="iconfont el-icon-caret-bottom" @click="operateLike(reply.from.id)"></i>{{reply.like}}
                        <el-dropdown style="float: right;">
                            <span class="el-dropdown-link">
                                <i class="iconfont el-icon-more"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item ><div @click="block(reply.from.id)">拉黑</div></el-dropdown-item>
                                <el-dropdown-item ><div @click="report(reply.from.id)">举报</div></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="talk-box">
                        <p>
                            <!-- <span>{{reply.to.userName}}:</span> -->
                            <span class="reply">{{reply.content}}</span>
                        </p>
                    </div>
                    <div class="reply-box">

                    </div>
                </div>
            </div>
            <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info">
                    <div tabindex="0" contenteditable="true" spellcheck="false" :placeholder="replyTo.userName"
                         @input="onDivInput($event)" class="reply-input reply-comment-input"></div>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="medium" @click="sendCommentReply(i)" type="primary">回复
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<!--https://blog.csdn.net/zLanaDelRey/article/details/100997792-->
<script>

import { getCommentByArticleId, pushComment } from '@/api/comment'
import { mapGetters } from 'vuex'

    const clickoutside = {
        // 初始化指令
        bind(el, binding, vnode) {
            function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 只有不是本身 才会响应事件
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
            }

            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.vueClickOutside = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        // update() {
        // },
        // vue 弹出框 下面 响应
        unbind(el, binding) {
            // 解除事件监听
            document.removeEventListener('click', el.vueClickOutside);
            delete el.vueClickOutside;
        },
    };
    export default {
        name: 'ArticleComment',
        data() {
            return {
                comments :[],     
                articleId: '',

                replyTo : {
                    // 被回复评论的is
                    id: "",
                    // 被回复的id
                    userName: ""
                },

                // 展示回复输入框
                // _showReplyInput: false,

                btnShow: false,
                index: '0',
                replyComment: '',
                myName: 'Lana Del Rey',
                myHeader: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                myId: 19870621,
                to: '',
                toId: -1,
                // comments: [
                //     {
                //         name: 'Taylor Swift',
                //         id: 19891221,
                //         headImg: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
                //         comment: '我发行了我的新专辑Lover',
                //         time: '2019年9月16日 18:43',
                //         commentNum: 1,
                //         like: 5,
                //         inputShow: false,
                //         reply: [
                //             {
                //                 from: 'Lana Del Rey',
                //                 fromId: 19870621,
                //                 fromHeadImg: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
                //                 to: 'Taylor Swift',
                //                 toId: 19891221,
                //                 comment: '新专辑和speak now 一样棒！',
                //                 time: '2019年9月16日 18:43',
                //                 commentNum: 25,
                //                 like: 5,
                //                 inputShow: false

                //             }
                //         ]
                //     },
                //     {
                //         name: 'Norman Fucking Rockwell',
                //         id: 20190830,
                //         headImg: 'https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg',
                //         comment: 'Plz buy Norman Fucking Rockwell on everywhere',
                //         time: '2019年9月16日 18:43',
                //         commentNum: 0,
                //         like: 5,
                //         inputShow: false,
                //         reply: []
                //     },
                // ]
            }
        },
        computed: {
            ...mapGetters([
            'token','user'
            ])
        },
        directives: {clickoutside},
        mounted() {
            this.getArticleId()
            this.fetchComments()
        },
        methods: {
            async getArticleId(){
                this.articleId = this.$route.params.id;
            },
            async fetchComments(){
                getCommentByArticleId(this.articleId).then(res=>{
                    let list = res.data.list;
                    // 格式化时间
                    list.forEach((comment)=> {
                        comment.createTime = this.dateStr(new Date(comment.createTime));
                        comment.inputShow = false;
                        comment.reply.forEach((reply)=>{
                            reply.createTime = this.dateStr(new Date(reply.createTime));
                            reply.inputShow = false;
                            if(!(reply.rootCommentId === comment.id)){
                                reply.content = '回复@' + reply.to.userName + ':' + reply.content
                            }
                        })
                    });
                    // console.log(this.user)
                    this.comments = list;
                })
            },
            // 拉黑
            block(id) {
                // todo
                console.log(id)
            },
             // 举报
            report(id) {
                // todo
                console.log(id)
            },

            // 点赞
            operateLike(id) {
                // todo
                console.log("点赞" + id)
            },

            messageTitleClick(num) { // 点击了具体某条消息
                console.log("点击了消息", num);
            },
            inputFocus() {
                var replyInput = document.getElementById('replyInput');
                replyInput.style.padding = "8px 8px"
                replyInput.style.border = "2px solid blue"
                replyInput.focus()
            },
            showReplyBtn() {
                this.btnShow = true
            },
            hideReplyBtn() {
                 let replyInput = document.getElementById('replyInput')
                this.btnShow = false
                replyInput.style.padding = "10px"
                replyInput.style.border = "none"
            },
            showReplyInput(i, name, id) {
                this.comments[this.index].inputShow = false
                this.index = i
                this.comments[i].inputShow = true

                this.replyTo.userName = "回复@" + name
                this.replyTo.id = id
            },
            _inputShow(i) {
                return this.comments[i].inputShow
            },
            async sendComment() {
                if (!this.replyComment) {
                    this.$message({
                        showClose: true,
                        type: 'warning',
                        message: '评论不能为空'
                    })
                } else {
                    // let a = {}
                    let input = document.getElementById('replyInput')
                    // let timeNow = new Date().getTime();
                    // let time = this.dateStr(timeNow);
                    // a.name = this.myName
                    // a.comment = this.replyComment
                    // a.headImg = this.myHeader
                    // a.time = time
                    // a.commentNum = 0
                    // a.like = 0
                    // this.comments.push(a)
                
                    let comment = {};
                    comment.content =  this.replyComment;
                    comment.articleId = this.articleId;
                    comment.rootComment = null;
                    comment.type = 1;

                    // 发送请求
                    await pushComment(comment);

                    this.replyComment = ''
                    input.innerHTML = '';

                    this.fetchComments()
                }
            },
            async sendCommentReply(i) {
                if (!this.replyComment) {
                    this.$message({
                        showClose: true,
                        type: 'warning',
                        message: '评论不能为空'
                    })
                } else {
                    // let a = {}
                    // let timeNow = new Date().getTime();
                    // let time = this.dateStr(timeNow);
                    // a.from = this.myName
                    // a.to = this.to
                    // a.fromHeadImg = this.myHeader
                    // a.comment = this.replyComment
                    // a.time = time
                    // a.commentNum = 0
                    // a.like = 0
                    // this.comments[i].reply.push(a)


                    let comment = {};
                    comment.content =  this.replyComment;
                    comment.articleId = this.articleId;
                    comment.rootComment = this.replyTo.id;
                    comment.type = 1;
                    // 发送请求
                    await pushComment(comment);
                    this.fetchComments()

                    this.replyComment = ''
                    document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""

                     // 评论完后隐藏
                     this.comments[i].inputShow = false;
                }
            },
            onDivInput: function (e) {
                this.replyComment = e.target.innerHTML;
            },
            dateStr(date) {
                //获取js 时间戳
                var time = new Date().getTime();
                //去掉 js 时间戳后三位，与php 时间戳保持一致
                time = parseInt((time - date) / 1000);
                //存储转换值
                var s;
                if (time < 60 * 10) {//十分钟内
                    return '刚刚';
                } else if ((time < 60 * 60) && (time >= 60 * 10)) {
                    //超过十分钟少于1小时
                    s = Math.floor(time / 60);
                    return s + "分钟前";
                } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
                    //超过1小时少于24小时
                    s = Math.floor(time / 60 / 60);
                    return s + "小时前";
                } else if ((time < 60 * 60 * 24 * 30) && (time >= 60 * 60 * 24)) {
                    //超过1天少于30天内
                    s = Math.floor(time / 60 / 60 / 24);
                    return s + "天前";
                } else {
                    //超过30天ddd
                    // var date = new Date(parseInt(date));
                    date = new Date(parseInt(date));
                    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                }
            }
        },
    }
</script>


<style scoped lang="css">
    .my-reply {
        padding: 10px;
        background-color: #fafbfc;
    }

    .my-reply .header-img {
        display: inline-block;
        vertical-align: top;
    }

    .my-reply .reply-info {
        display: inline-block;
        margin-left: 5px;
        width: 90%;
    }

    @media screen and (max-width: 1200px) {
        .my-reply .reply-info {
            width: 80%;
        }
    }

    .my-reply .reply-info .reply-input {
        min-height: 20px;
        line-height: 22px;
        padding: 10px 10px;
        color: #ccc;
        background-color: #fff;
        border-radius: 5px;
    }

    .my-reply .reply-info .reply-input:empty:before {
        content: attr(placeholder);
    }

    .my-reply .reply-info .reply-input:focus:before {
        content: none;
    }

    .my-reply .reply-info .reply-input:focus {
        padding: 8px 8px;
        border: 2px solid #00f;
        box-shadow: none;
        outline: none;
    }

    .my-reply .reply-btn-box {
        height: 25px;
        margin: 10px 0;
    }

    .my-reply .reply-btn-box .reply-btn {
        position: relative;
        float: right;
        margin-right: 15px;
    }

    .my-comment-reply {
        margin-left: 50px;
    }

    .my-comment-reply .reply-input {
        width: flex;
    }

    .author-title:not(:last-child) {
        border-bottom: 1px solid rgba(178, 186, 194, 0.3);
    }

    .author-title {
        margin-top: 1rem;
        padding: 10px;
    }

    .author-title .header-img {
        display: inline-block;
        vertical-align: top;
    }

    .author-title .author-info {
        display: inline-block;
        margin-left: 5px;
        width: 60%;
        height: 40px;
        line-height: 20px;
    }

    .author-title .author-info > span {
        display: block;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .author-title .author-info .author-name {
        color: #000;
        font-size: 18px;
        font-weight: bold;
    }

    .author-title .author-info .author-time {
        font-size: 14px;
    }

    .author-title .icon-btn {
        width: 30%;
        padding: 0 !important;
        float: right;
    }

    @media screen and (max-width: 1200px) {
        .author-title .icon-btn {
            width: 20%;
            padding: 7px;
        }
    }

    .author-title .icon-btn > span {
        cursor: pointer;
    }

    .author-title .icon-btn .iconfont {
        margin: 0 5px;
    }

    .author-title .talk-box {
        margin: 0 50px;
    }

    .author-title .talk-box > p {
        margin: 0;
    }

    .author-title .talk-box .reply {
        font-size: 16px;
        color: #000;
    }

    .author-title .reply-box {
        margin: 10px 0 0 50px;
        background-color: #efefef;
    }

</style>
