<template>
    <div id="details">
        <!-- 主要内容 -->
        <div class="main">
            <!-- 左侧商品轮播图 -->
            <div class="block">
                <el-carousel height="560px" v-if="photos.length > 1">
                    <el-carousel-item v-for="item, i in photos" :key="i">
                        <img style="height:560px;" :src="item.url" :alt="i" />
                    </el-carousel-item>
                </el-carousel>
                <div v-if="photos.length == 1">
                    <img style="height:560px;" :src="photos[0].url" :alt="i" />
                </div>
            </div>
            <!-- 左侧商品轮播图END -->

            <!-- 右侧内容区 -->
            <div class="content">
                <h1 class="name">{{ getHospitalDetail.name }}</h1>
                <p class="address">地址:{{ getHospitalDetail.cityname }}/{{ getHospitalDetail.adname }}/{{
                    getHospitalDetail.address }}</p>
                <p class="distance">距离:{{ getHospitalDetail.distance }}米</p>
                <p class="service">服务:{{ getHospitalDetail.type }}</p>
                <p class="tel">电话:{{ getHospitalDetail.tel }}</p>
                <p class="rating">评分:{{ getHospitalDetail.rating }}</p>
                <a class="website" href="getHospitalDetail.website">官网:</a>



                <div class="traffic-type">
                    <el-radio v-model="type" label="1">步行导航</el-radio>
                    <el-radio v-model="type" label="2">公交导航</el-radio>
                    <el-radio v-model="type" label="3">自驾导航</el-radio>
                </div>

                <MapForNav></MapForNav>
            </div>
            <!-- 右侧内容区END -->
        </div>
        <!-- 主要内容END -->
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import bus from '@/bus/bus'

import MapForNav from '@/components/MyMap/MapForNav.vue'

export default {
    components: { MapForNav },
    computed: {
        ...mapGetters([
            'getHospitalDetail'
        ])
    },
    data() {
        return {

            hospitalDetail: null,
            photos: [],

            // 出行方式
            type: '1'

        };
    },

    activated() {

    },
    created() {
        this.init()
        bus.$on('petHospitalDetail', val => {
            // if (this.getHospitalDetail == null) {
            //     this.getHospitalDetail = val
            // }
        })
    },
    destroyed() {
        // this.deleteHospitalDetail()
    },
    watch: {
        type: ((val)=>{
            console.log("typechange", val)
            bus.$emit("traffic-type-change", val)
        })
    },
    methods: {
        ...mapActions(["deleteHospitalDetail"]),

        init() {
            if (this.getHospitalDetail != null) {
                this.hospitalDetail = this.getHospitalDetail;
                this.photos = this.getHospitalDetail.photos
            }
        }

    }
};
</script>
<style>
/* 主要内容CSS */
#details .main {
    width: 1225px;
    height: 560px;
    padding-top: 30px;
    margin: 0 auto;
}

#details .main .block {
    float: left;
    width: 560px;
    height: 560px;
}

#details .el-carousel .el-carousel__indicator .el-carousel__button {
    background-color: rgba(163, 163, 163, 0.8);
}

#details .main .content {
    float: left;
    margin-left: 25px;
    width: 640px;
}

#details .main .content .name {
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    font-weight: normal;
    color: #212121;
}

#details .main .content .address {
    color: #212121;
    padding-top: 10px;
}

#details .main .content .rating {
    color: #ff6700;
    padding-top: 10px;
}

/* 主要内容CSS END */
</style>