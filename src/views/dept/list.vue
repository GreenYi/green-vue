<template>
  <div>
      <el-form :inline="true">
        <el-form-item style="float: left">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="insertDept()">添加</el-button>
          <addDept :dialogAdd="dialogAdd" @update="getAllDeptPage(false,page)"></addDept>
          <editDept :dialogEdit="dialogEdit" :form="form" @update="getAllDeptPage(false,page)"></editDept>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" sortable width="180"></el-table-column>
          <el-table-column prop="deptName" label="名字" sortable  width="180"></el-table-column>
          <el-table-column prop="deptLoc" label="地址" sortable width="180"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-edit-outline"
                @click="updateDept(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                @click="deleteDept(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page.size"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
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
        createTime: '',
        updateTime: '',
        deptName: '',
        deptLoc: ''
      },
      // 用于存放数据
      tableData: [],
      dialogAdd: {
        show: false
      },
      dialogEdit: {
        show: false
      },
      // 分页
      page: {
        total: 0,
        size: 10,
        current: 1
      }
    }
  },
  created: function () {
    this.getAllDeptPage(true, this.page)
  },
  methods: {
    // 分页获取所有部门，isShowMessage是否显示成功信息
    getAllDeptPage (isShowMessage, page) {
      this.axios({
        // 使用封装好的 axios 进行网络请求
        url: '/dept/list-page',
        method: 'post',
        data: page
      }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data.records
          this.page = res.data.data
          if (isShowMessage) {
            this.$message.success(res.data.message)
          }
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(() => {
        this.$message.error('服务器异常')
      })
    },
    insertDept () {
      // 添加
      this.dialogAdd.show = true // 弹出对话框
    },
    deleteDept (index, row) {
      this.$confirm('确定删除？', '提示').then(() => {
        // 删除用户信息
        this.axios({
        // 使用封装好的 axios 进行网络请求
          url: '/dept/' + row.id,
          method: 'delete'
        }).then(res => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          // 删除数据，更新视图
          this.getAllDeptPage(false, this.page)
        }).catch(() => {
          this.$message.error('服务器异常')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    updateDept (index, row) {
      // 编辑，显示弹
      this.dialogEdit.show = true
      this.form = {
        deptName: row.deptName,
        deptLoc: row.deptLoc,
        id: row.id
      }
    },
    handleSizeChange (val) {
      const page = { size: val }
      this.getAllDeptPage(false, page)
    },
    handleCurrentChange (val) {
      const page = { current: val }
      this.getAllDeptPage(false, page)
    }
  }
}
</script>
