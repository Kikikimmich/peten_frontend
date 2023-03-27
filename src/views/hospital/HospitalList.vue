<template>
    <div>
        <!-- <el-card shadow="never">
           
        </el-card> -->

        <div id="root" v-for="(item, i) in 10">
            <ItemCard></ItemCard>

        </div>
    </div>
</template>

<script>

import AMapLoader from '@amap/amap-jsapi-loader';

import ItemCard from '@/views/hospital/ItemCard.vue'


window._AMapSecurityConfig = {
    securityJsCode: '1dbf90857c868c4b99c98165da706acb'
}

export default {
    name: 'HosptialList',
    components: { ItemCard },
    computed: {

    },
    data() {
        return {
            hosptialInfo: null,
            dataList: [],
            currentPage: 1,
            total: 0,
            pageSize: 10,

            map: null,
            cityInfo: null,
            myPosition: null,
        }
    },
    created() {
        // this.initMap()

        // this.getPetHosptial('', 1 )

    },
    methods: {
        searchDetail(item) {

        },

        showPetHospitalDetail(item) {

        },

        getPetHosptial(city, page) {
            var placeSearch = new AMap.PlaceSearch({
                // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
                city: '广州',
                pageSize: 10, // 单页显示结果条数
                pageIndex: page, // 页码
                citylimit: true,  //是否强制限制在设置的城市内搜索
                map: this.map, // 展现结果的地图实例
                // panel: "panel", // 结果列表将在此容器中进行展示。
                autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                extensions: 'all'
            })

            let pos = [this.myPosition.position.lng, this.myPosition.position.lat];
            placeSearch.searchNearBy('宠物医院', pos, 20000, (status, result) => {
                // 查询成功时，result即对应匹配的POI信息
                // bus.$emit('hosptialInfo', result)
                // console.log('page22', this.currrentPage)

                console.log('emit', result)
            })
        },


        initMap() {
            AMapLoader.load({
                key: '02c854342b6ea9c8f1e85cb0a6f2882f', // 申请好的Web端开发者Key，首次调用 load 时必填
                version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch'] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then(AMap => {
                    // this.map = new AMap.Map('container', {
                    //     //设置地图容器id
                    //     viewMode: '3D', //是否为3D地图模式
                    //     zoom: 12, //初始化地图级别
                    //     // center: [121.473667, 31.230525] //初始化地图中心点位置
                    // })
                    // this.map.addControl(new AMap.Scale())
                    // this.map.addControl(new AMap.ToolBar())
                    // this.map.addControl(new AMap.HawkEye())
                    // this.map.addControl(new AMap.MapType())
                    let geolocation = new AMap.Geolocation({ enableHighAccuracy: true })
                    geolocation.getCityInfo((status, result) => {
                        //只能获取当前用户所在城市和城市的经纬度
                        if (status == 'complete') {
                            this.cityInfo = result
                        }
                    });
                    geolocation.getCurrentPosition((status, result) => {
                        if (status == 'complete') {
                            // onComplete(result)
                            this.myPosition = result
                            console.log(result)

                            // this.setMyPosition(result)
                        }
                    });
                    // this.map.addControl(geolocation)
                    this.auto = new AMap.AutoComplete(this.autoOptions)
                    this.placeSearch = new AMap.PlaceSearch({
                        map: this.map
                    })
                    //构造地点查询类
                    // this.auto.on('select', this.select)



                    setTimeout(() => {
                        this.getPetHosptial('', 1)
                    }, 10000);


                })
                .catch(e => {
                    console.log(e)
                })
        },

    }
}


</script>

<style></style>