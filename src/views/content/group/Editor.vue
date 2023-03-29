<template>
    <div>
        <div>
            <el-input type="textarea" autosize placeholder="标题（最多36个字符）" v-model="textarea2">
            </el-input>
        </div>

        <div style="margin-top: 20px;">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" limit="6"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <!-- 
                  <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :http-request="myUploadFile"
            :on-remove="handleRemove"
            :on-change="handlChange"
            :on-exceed="handlExceed"
            :file-list="fileList"
            :limit="1"
            accept=".xlsx,.xls"
            :auto-upload="false">
         <el-button slot="trigger" size="small" type="success">选取文件</el-button>
         <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
      </el-upload>

作者：不问心
链接：https://juejin.cn/post/7028085690688602120
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
             -->
        </div>

        <div style="margin-top: 20px;">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 25 }" placeholder="请输入帖子内容" v-model="textarea3">
            </el-input>
        </div>
        
        <div style="margin-top: 20px;">
            <el-button type="primary" round @click="submit">发布</el-button>
        </div>

    </div>
</template>

<script>
import { submit } from '@/api/order';



export default {
    name: 'Editor',

    components: {},

    data() {
        return {
            currentDate: new Date(),

            textarea2: '',
            textarea3: '',

            // 上传图片
            dialogImageUrl: '',
            dialogVisible: false,

            // 注释的示例
            // fileList: [],

        };
    },
    methods: {

        // 上传图片
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        // 发布
        submit(){
            // todo
            alert("发布")
        }
    }
}
</script>

<style></style>