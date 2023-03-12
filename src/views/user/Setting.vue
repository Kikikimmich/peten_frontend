<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        个人设置
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-tabs v-model="activeName" @tab-click="handleClick">

            <!-- 个人信息 -->
            <el-tab-pane label="基础信息" name="first">
              <el-form :label-position="labelPosition" label-width="100px" :model="user">
                <el-form-item label="账号">
                  <el-input v-model="user.username" disabled />
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="user.alias" />
                </el-form-item>
                <el-form-item label="头像">
                  <el-upload
                    class="avatar-uploader"
                    action="uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="user.avatar" :src="user.avatar" class="avatar" style="height: 150px; width: 150px;">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-switch
                    v-model="user.sex"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="男"
                    inactive-text="女"
                    :active-value= "1"
                    :inactive-value= "0"
                  >
                  </el-switch>
                </el-form-item>

                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input v-model="user.email" />
                </el-form-item>

                <el-form-item
                  prop="mobile"
                  label="手机号"
                  :rules="[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
                    {
                      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                      message: '请输入正确的手机号码'
                    }
                  ]"
                >
                  <el-input v-model="user.mobile" />   
                </el-form-item>
                
                <el-form-item label="简介">
                  <el-input v-model="user.bio" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 宠物信息 -->
            <el-tab-pane label="我的宠物" name="second">
              <div class="my-pet">
                <p class="title">我的宠物</p>
                <div class="pet-info-select">
                  <div
                    :class="item.id == defaultSelect ? 'in-section' : ''"
                    v-for="item in pet"
                    :key="item.id"
                  >
                    <img :src="item.image" class="avatar" style="height: 150px; width: 150px;">
                  </div>
                  <div class="add-pet">
                    <i class="el-icon-circle-plus-outline"></i>
                    <p>添加新宠物</p>
                  </div>
                </div>
                <!-- 表单 -->
                <div class="pet-info-info" v-show="pet.length > 0">
                  <el-form :label-position="labelPosition" label-width="100px" :model="petInfo">
                    <el-form-item label="昵称">
                      <el-input v-model="petInfo.alias" />
                    </el-form-item>
                    <el-form-item label="品种">
                      <el-input v-model="petInfo.breed" />
                    </el-form-item>
                    <el-form-item label="年龄">
                      <el-input v-model="petInfo.age" />
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-input v-model="petInfo.sex" />
                    </el-form-item>
                    <el-form-item label="身高">
                      <el-input v-model="petInfo.height" />
                    </el-form-item>
                    <el-form-item label="体长">
                      <el-input v-model="petInfo.bodyLength" />
                    </el-form-item>
                    <el-form-item label="体重">
                      <el-input v-model="petInfo.weight" />
                    </el-form-item>
                    <el-form-item label="爱好">
                      <el-input v-model="petInfo.hobby" />
                    </el-form-item>
                    <el-form-item label="简介">
                      <el-input v-model="petInfo.introduction" />
                    </el-form-item>
                    <el-form-item label="生活照">
                      <el-upload
                        class="avatar-uploader"
                        action="uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="petInfo.avatar" :src="petInfo.avatar" class="avatar" style="height: 150px; width: 150px;">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="submitPetForm()">提交</el-button>
                      <el-button @click="resetPetForm()">重置</el-button>
                    </el-form-item>
                  
                  </el-form>
                </div>
              </div>
            </el-tab-pane>

            <!-- 地址信息 -->
            <el-tab-pane label="我的地址" name="third">
              <div class="section-address">
                <p class="title">收货地址</p>
                <div class="address-body">
                  <ul>
                    <li
                      :class="item.id == confirmAddress ? 'in-section' : ''"
                      v-for="item in address"
                      :key="item.id"
                    >
                      <h2>{{item.name}}</h2>
                      <p class="phone">{{item.phone}}</p>
                      <p class="address">{{item.address}}</p>
                    </li>
                    <li class="add-address">
                      <i class="el-icon-circle-plus-outline"></i>
                      <p>添加新地址</p>
                    </li>
                  </ul>
                </div>
                <div class="add-address-info">
                  <el-cascader
                    size="large"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleAddressChange">
                  </el-cascader>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import {getInfo, update} from '@/api/user'

import {regionData,CodeToText} from 'element-china-area-data'

export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'first',
      labelPosition: 'right',
      user: {
        id: '',
        username: '',
        alias: '',
        bio: '',
        email: '',
        mobile: '',
        avatar: '',
        sex:''
      },

      // 宠物相关
      pet: [
        {
          id: 1,
          image: "https://s3.ax1x.com/2020/12/01/DfHNo4.jpg"
        },
        {
          id: 2,
          image: "https://s3.ax1x.com/2020/12/01/DfHNo4.jpg"
        }
      ],
      defaultSelect: 1,
      petInfo: {
        alias: "旺财",
        breed: "狗",
        age: "18月",
        sex: "公",
        height: "50cm",
        bodyLength: "68",
        weight: "25kg",
        hobby: "吃喝拉撒",
        introduction: "旺财是一只狗",
        avatar: "https://s3.ax1x.com/2020/12/01/DfHNo4.jpg"
      },

      // 地址相关
      confirmAddress: 1,
      address: [
        {
          id: 1,
          name: "用户1",
          phone: "100861001010000",
          address: "广东 广州市 白云区 ***"
        },
        {
          id: 2,
          name: "用户1",
          phone: "100861001010000",
          address: "广东 广州市 白云区 ***"
        }
      ],
      options: regionData,
      selectedOptions: [],
      addtions: {},			//存储地址数据
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {

    handleAddressChange (value) {
      //我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      //我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
        this.addtions.selectedOptions = value
        var name = ''
        this.selectedOptions.map(item => name += CodeToText[item] + '/')
        this.addtions.names = name
        console.log(this.addtions.names)
        console.log(this.addtions)
    },

    submitPetForm(){},

    resetPetForm(){},

    uploadImage(){

    },
    handleAvatarSuccess(){

    },

    beforeAvatarUpload(){

    },

    fetchInfo() {
      getInfo(this.$route.params.username).then(res => {
        // console.log(res)
        const { data } = res
        this.user = data
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      console.log(this.user)
      update(this.user).then(res => {
        this.$message.success('信息修改成功')
        this.fetchInfo()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

/* 我的宠物CSS */
.my-pet .pet-info-select {
  margin: 0 48px;
  overflow: hidden;
}
.my-pet .pet-info-select .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.my-pet .pet-info-select div {
  display: flex;
  flex-direction: row;
  float: left;
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;

  list-style:none;
}
.my-pet .pet-info-select .in-section {
  border: 1px solid #ff6700;
}

.my-pet .pet-info-select .add-pet {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* line-height: 30px; */
}
.my-pet .pet-info-select .add-pet i {
  font-size: 25px;
  /* padding-top: 50px; */
  text-align: center;
}


/* 选择地址CSS */
.section-address {
  margin: 0 48px;
  overflow: hidden;
}
.section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.address-body ul {
  display: flex;
  flex-direction: row;
}
.address-body li {
  /* float: left; */
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;

  list-style:none;
}
.address-body .in-section {
  border: 1px solid #ff6700;
}
.address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.address-body li p {
  font-size: 14px;
  color: #757575;
}
.address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

</style>
