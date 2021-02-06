<template>
  <div>
      <el-form
        ref="formData"
        :model="form"
        label-width="80px"
        :rules="formrules"
        :visible.sync="formVisible"
        class="submit"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardNo">
          <el-input v-model="form.cardNo"></el-input>
        </el-form-item>
        <el-form-item style="float: left">
          <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit('formData')">查询</el-button>
        </el-form-item>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="desc" label="描述" width="180"></el-table-column>
          <el-table-column prop="code" label="代码" width="180"></el-table-column>
          <el-table-column prop="birthday" label="生日" width="180"></el-table-column>
          <el-table-column prop="sex" label="性别" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </el-form>
  </div>
</template>
<style>

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  props: {
    formVisible: null
  },
  data () {
    return {
      form: {
        name: '',
        cardNo: ''
      },
      tableData: null,
      formrules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        cardNo: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formData) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          const loadingObj = this.$loading({
            text: '查询中...'
          })
          this.axios({
            // 使用封装好的 axios 进行网络请求
            url: '/id-card/id-card',
            method: 'post',
            data: this.form
          }).then(res => {
            if (res.data.status === 200) {
              // 这里使用了ES6的语法
              this.tableData = [res.data.data]
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
            // 后端返回结果后，结束loadingObj，即loadingObj.close();
            loadingObj.close()
          })
        }
      })
    }
  }
}
</script>
