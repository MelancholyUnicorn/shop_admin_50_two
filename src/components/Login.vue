<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <img src="../assets/01.jpg" alt />
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        passowrd: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          const { meta } = res.data
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          this.$router.push('/index')
        })
      })
    }
  }
}
</script>

<style lang="less">
.el-form {
  background: white;
  width: 400px;
  padding: 20px;
  padding-top: 70px;
  margin: 0 auto;
  margin-top: 200px;
  border-radius: 20px;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #ccc;
    position: absolute;
    left: 50%;
    top: -60px;
    transform: translateX(-50%);
  }
}
</style>
