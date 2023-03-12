<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        个人设置
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-tabs v-model="activeName" @tab-click="handleClick">
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

            <el-tab-pane label="我的宠物" name="second">
            </el-tab-pane>

            <el-tab-pane label="我的地址" name="third">
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import {getInfo, update} from '@/api/user'

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
      }
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {

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

</style>
