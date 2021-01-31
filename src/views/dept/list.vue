<template>
  <div>
      <el-form :inline="true">
        <el-form-item style="float: left">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="hanldeAdd()">添加</el-button>
          <addDept :dialogAdd="dialogAdd" @update="getDeptInfo"></addDept>
          <editDept :dialogEdit="dialogEdit" :form="form" @update="getDeptInfo"></editDept>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="deptName" label="名字" width="180"></el-table-column>
          <el-table-column prop="deptLoc" label="地址" width="180"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
  </div>
</template>

<style>

.el-aside {
  color: rgb(51, 51, 51);
}
</style>

<script>
import addDept from '../../components/add-dept'
import editDept from '../../components/edit-dept'

export default {
  components: {
    // 注册
    addDept,
    editDept
  },
  data () {
    return {
      form: {
        deptName: '',
        deptLoc: ''
      },
      tableData: [], // 用于存放数据
      dialogAdd: {
        show: false
      },
      dialogEdit: {
        show: false
      }
      // formEdit: {
      //   deptName: '',
      //   deptLoc: ''
      // }
    }
  },
  created: function () {
    this.getDeptInfo()
  },
  // dialogAdd: {
  //   show: false
  // },
  // dialogEdit: {
  //   show: false
  // },
  methods: {
    goIdCard () {
      this.$router.push({ path: '/id-card/id-card' })
    },
    goDept () {
      this.$router.push({ path: '/dept/list' })
    },
    onSubmit () {
      this.axios({
        // 使用封装好的 axios 进行网络请求
        url: '/id-card/id-card',
        method: 'post',
        data: this.form
      })
        .then(res => {
          // 这里使用了ES6的语法
          console.log(res.data)
          if (res.data.status === 200) {
            alert(res.data.message)
            this.$emit('userSignIn', '') // 记录登录状态
            this.$router.replace({ path: '/login' }) // 成功后跳转
          }
        })
        .catch(error => {
          console.log('error')
          alert(error.data.message) // 请求失败返回的数据
        })
    },
    getDeptInfo () {
      this.axios({
        // 使用封装好的 axios 进行网络请求
        url: '/dept/list',
        method: 'get',
        data: {}
      }).then(res => {
        this.tableData = res.data
      })
    },
    hanldeAdd () {
      // 添加
      this.dialogAdd.show = true // 弹出对话框
    },
    handleDelete (index, row) {
      // 删除用户信息
      this.axios({
        // 使用封装好的 axios 进行网络请求
        url: '/dept/' + row.id,
        method: 'delete'
      }).then(res => {
        this.$message({
          type: 'success',
          message: '删除信息成功'
        })
        this.getDeptInfo() // 删除数据，更新视图
      })
    },
    handleEdit (index, row) {
      // 编辑
      this.dialogEdit.show = true // 显示弹
      this.form = {
        deptName: row.deptName,
        deptLoc: row.deptLoc,
        id: row.id
      }
    }
  }
}
</script>
