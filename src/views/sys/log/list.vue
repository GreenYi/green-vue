<template>
  <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>
          <el-table-column prop="updateTime" label="修改时间" sortable width="180"></el-table-column>
          <el-table-column prop="companyId" label="公司ID" sortable width="180"></el-table-column>
          <el-table-column prop="isDeleted" label="是否删除" sortable width="180"></el-table-column>
          <el-table-column prop="operator" label="操作人" sortable width="180"></el-table-column>
          <el-table-column prop="operatorLogin" label="操作人登录名" sortable width="180"></el-table-column>
          <el-table-column prop="moduleName" label="模块名" sortable width="180"></el-table-column>
          <el-table-column prop="functionName" label="功能名称" sortable width="180"></el-table-column>
          <el-table-column prop="functionMethod" label="请求类型" sortable width="180"></el-table-column>
          <el-table-column prop="url" label="URL" sortable width="180"></el-table-column>
          <el-table-column prop="responseStatus" label="响应码" sortable width="180"></el-table-column>
          <el-table-column prop="responseMessage" label="响应信息" sortable width="180"></el-table-column>
          <el-table-column prop="responseData" label="响应数据" sortable width="180"></el-table-column>
          <el-table-column prop="useTime" label="耗时" sortable width="180"></el-table-column>
          <el-table-column prop="ipAddress" label="IP地址" sortable width="180"></el-table-column>
          <el-table-column prop="roleName" label="角色名" sortable width="180"></el-table-column>
          <el-table-column prop="remark" label="备注" sortable width="180"></el-table-column>
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

export default {
  data () {
    return {
      form: {
        createTime: '',
        updateTime: '',
        companyId: '',
        isDeleted: '',
        operator: '',
        operatorLogin: '',
        moduleName: '',
        functionName: '',
        functionMethod: '',
        url: '',
        responseStatus: '',
        responseMessage: '',
        responseData: '',
        useTime: '',
        ipAddress: '',
        roleName: '',
        remark: ''
      },
      // 用于存放数据
      tableData: [],
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
        url: '/sys-log/list-page',
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
