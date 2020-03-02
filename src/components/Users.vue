<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select" @change="search">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="address" label="用户状态">
        <template v-slot:default="obj">
          <el-switch
            v-model="obj.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changestatus(obj.row.id,obj.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot:default="obj">
          <el-button plain type="primary" icon="el-icon-edit"></el-button>
          <el-button plain type="danger" icon="el-icon-delete" @click="del(obj.row.id)"></el-button>
          <el-button plain type="success" icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0
    }
  },
  methods: {
    getlist () {
      this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        // console.log(res)
        const { data } = res
        this.list = data.users
        this.total = data.total
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getlist()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getlist()
    },
    // 删除功能
    del (id) {
      console.log(id)
      this.$confirm('您确认要删除吗', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`users/${id}`).then(res => {
          console.log(res)
          const { meta } = res
          if (meta.status === 200) {
            this.$message(meta.msg)
            if (this.list.length === 1 && this.pagenum > 1) {
              this.pagenum--
            }
            this.getlist()
          } else {
            this.$message.error(meta.msg)
          }
        })
      }).catch(e => {
        console.log(e)
      })
    },
    // 搜索功能
    search () {
      this.pagenum = 1
      this.getlist()
    },
    // 修改状态
    changestatus (id, flag) {
      this.$axios.put(`users/${id}/state/${flag}`).then(res => {
        console.log(res)
        const { meta } = res
        if (meta.status === 200) {
          this.$message.success(meta.msg)
        }
      })
    }
  },
  created () {
    this.getlist()
  }
}

</script>

<style lang="less">
.input-with-select {
  width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
