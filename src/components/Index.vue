<template>
  <div class="index">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../assets/logo.png" alt />
        </div>
        <div class="title">电商后台管理系统</div>
        <div class="exit">
          欢迎光临~
          <a href="javascript:;" @click="exit">退出</a>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="roles">
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>
              </el-menu-item>
              <el-menu-item index="rights">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    exit () {
      this.$confirm('此操作将退出登录,是否继续', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="less">
.index {
  height: 1000px;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #d8d8d8;
  display: flex;
  .logo {
    width: 180px;
    img {
      width: 180px;
    }
  }
  .exit {
    width: 180px;
  }
  .title {
    flex: 1;
    text-align: center;
  }
}
.el-aside {
  background-color: #545c64;
  // height: 100%;
}
.el-main {
  background-color: #ecf0f1;
}
</style>
