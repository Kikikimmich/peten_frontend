<template>
    <div>
        <div id="container"></div>
        <div id="panel"></div>
    </div>
</template>

<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=e72a9f0cac3b081df05259299454cf1a&plugin=AMap.Transfer"></script>
<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>

<script>
import { mapGetters } from "vuex";


// window._AMapSecurityConfig = {
//     securityJsCode: '1dbf90857c868c4b99c98165da706acb'
// }
export default {
    computed: {
        ...mapGetters([
            'getHospitalDetail',
            'myPosition'
        ])
    },
    data() {
        return {
            map: null,

            // 定位信息
            cityInfo: null,
            // 我的位置
            myPosition: null,
            // 目标地址

            city: '广州',

            // detail


        }
    },
    methods: {
        initMap() {
            AMap.plugin(['AMap.Geolocation', 'AMap.Transfer'], () => {

                var map = new AMap.Map("container", {
                resizeEnable: true,
                // center: [116.397428, 39.90923],
                zoom: 13 //地图显示的缩放级别
                });

                let geolocation = new AMap.Geolocation({ enableHighAccuracy: true })
                
                console.log("start")
                
                geolocation.getCurrentPosition((status, result) => {
                    console.log("status",status)
                    if (status == 'complete') {
                        // onComplete(result)
                        this.myPosition = result
                        console.log("my locatioon", result)


                        var transOptions = {
                            map: map,
                            city: this.city,
                            panel: 'panel',
                            policy: AMap.TransferPolicy.LEAST_TIME
                        };
                        //构造公交换乘类
                        var transfer = new AMap.Transfer(transOptions);
                        //根据起、终点坐标查询公交换乘路线
                        transfer.search(new AMap.LngLat(this.myPosition.position.lng, this.myPosition.position.lat), 
                                        new AMap.LngLat(this.getHospitalDetail.location.lng, this.getHospitalDetail.location.lat), 
                                        (status, result)=> {
                        // transfer.search(new AMap.LngLat(116.291035,39.907899), new AMap.LngLat(116.427281, 39.903719), (status, result)=> {
                            // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                            if (status === 'complete') {
                                console.log('绘制公交路线完成')
                            } else {
                                console.log('公交路线数据查询失败' + result)
                            }
                        })

                    }else{
                        console.log("fail to get my locatioon")
                    }
                });

                console.log("end")

            })
        },

    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap()
        console.log("dooooooooooo", this.getHospitalDetail)
    },
    created() {
    },
    watch: {
    }
}


</script>

<style  scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 700px;
}
</style>