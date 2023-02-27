<template>
    <div>
        <div id="container"></div>
        <div id="panel1" v-show="type == '1'"></div>
        <div id="panel2" v-show="type == '2'"></div>
        <div id="panel3" v-show="type == '3'"></div>
    </div>
</template>

<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=e72a9f0cac3b081df05259299454cf1a&plugin=AMap.Walking,AMap.Transfer,AMap.Driving"></script>
<script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>

<script>
import { mapGetters } from "vuex";
import bus from '@/bus/bus'


// window._AMapSecurityConfig = {
//     securityJsCode: '1dbf90857c868c4b99c98165da706acb'
// }
export default {
    computed: {
        ...mapGetters([
            'getHospitalDetail',
        ])
    },
    data() {
        return {
            map: null,

            // 定位信息
            cityInfo: null,
            // 我的位置
            // myPosition: null,
            // 目标地址

            city: '广州',

            // detail

            // 导航方式
            type: "1"

        }
    },
    methods: {
        initMap() {
            AMap.plugin(['AMap.Geolocation', 'AMap.Walking','AMap.Transfer', 'AMap.Driving'], () => {

                var map = new AMap.Map("container", {
                resizeEnable: true,
                // center: [116.397428, 39.90923],
                zoom: 13 //地图显示的缩放级别
                });

                let geolocation = new AMap.Geolocation({ enableHighAccuracy: true })
                                
                geolocation.getCurrentPosition((status, result) => {
                    console.log("status",status)
                    if (status == 'complete') {
                        // onComplete(result)
                        this.myPosition = result
                        console.log("my locatioon", result)

                        switch (this.type) {
                            case "1":
                                this.typeWalk(map, this.myPosition, this.getHospitalDetail)
                                break;
                            case "2":
                               this.typeTransfer(map, this.city, this.myPosition, this.getHospitalDetail)
                                break;
                            case "3":
                                this.typeDrive(map, this.myPosition, this.getHospitalDetail)
                                break;
                            default:
                                // this.typeWalk(map, this.myPosition, this.getHospitalDetail)
                                console.log('type: error with uncheck value');
                                break;
                        }

                    }else{
                        console.log("fail to get my locatioon")
                    }
                });
            })
        },

        deleteOthersElement(save, del1, del2){
            const elements_save = document.getElementsByClassName("amap-lib-" + save);
            // 仅保留一个
            for (let i = 0; i < elements_save.length-1; i++) {
                const element = elements_save[i];
                element.remove();
            }

           
            const elements_del1 = document.getElementsByClassName("amap-lib-" + del1);
            const del1Array = Array.from(elements_del1);
            del1Array.forEach((element) => {
                element.remove();
            });

            const elements_del2 = document.getElementsByClassName("amap-lib-" + del2);
            const del2Array = Array.from(elements_del2);
            del2Array.forEach((element) => {
                element.remove();
            });
        
        

            const elements_del = document.getElementsByClassName("amap-call");
            const delArray = Array.from(elements_del);
            delArray.forEach((element) => {
                element.remove();
            });
            
        },

        typeDrive(map, myPosition, hospitalDetail){
             //构造路线导航类
            var driving = new AMap.Driving({
                map: map,
                panel: "panel3"
            }); 
            // 根据起终点经纬度规划驾车导航路线
            driving.search(new AMap.LngLat(myPosition.position.lng, myPosition.position.lat), 
                            new AMap.LngLat(hospitalDetail.location.lng, hospitalDetail.location.lat), 
                            (status, result)=> {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    console.log('绘制驾车路线完成')

                    // 删除多余元素
                    this.deleteOthersElement("driving", "transfer", "walking")

                } else {
                    console.log('获取驾车数据失败：' + result)
                }
            });
        },

        typeWalk(map, myPosition, hospitalDetail){
            //步行导航
            var walking = new AMap.Walking({
                map: map,
                panel: "panel1"
            }); 
            //根据起终点坐标规划步行路线
            walking.search(new AMap.LngLat(myPosition.position.lng, myPosition.position.lat), 
                            new AMap.LngLat(hospitalDetail.location.lng, hospitalDetail.location.lat), 
                            (status, result)=> {
                // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
                if (status === 'complete') {
                    console.log('绘制步行路线完成')

                    // 删除多余元素
                    this.deleteOthersElement("walking", "driving", "transfer")

                } else {
                    console.log('步行路线数据查询失败' + result)
                } 
            });
        },

        typeTransfer(map, city, myPosition, hospitalDetail){
            var transOptions = {
                map: map,
                city: city,
                panel: 'panel2',
                policy: AMap.TransferPolicy.LEAST_TIME
            };
            //构造公交换乘类
            var transfer = new AMap.Transfer(transOptions);
            //根据起、终点坐标查询公交换乘路线
            transfer.search(new AMap.LngLat(myPosition.position.lng, myPosition.position.lat), 
                            new AMap.LngLat(hospitalDetail.location.lng, hospitalDetail.location.lat), 
                            (status, result)=> {
            // transfer.search(new AMap.LngLat(116.291035,39.907899), new AMap.LngLat(116.427281, 39.903719), (status, result)=> {
                // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                if (status === 'complete') {
                    console.log('绘制公交路线完成')

                    // 删除多余元素
                    this.deleteOthersElement("transfer", "driving", "walking")

                } else {
                    console.log('公交路线数据查询失败' + result)
                }
            })
        }

    },
    mounted() {
        //DOM初始化完成进行地图初始化
        this.initMap()
    },
    created() {
        bus.$on('petHospitalDetail', val => {
            // if (this.getHospitalDetail == null) {
            //     this.getHospitalDetail = val
            // }
        })
        bus.$on('traffic-type-change', val =>{
            this.type = val
            this.initMap()
        })
        
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
    height: 300px;
}
</style>