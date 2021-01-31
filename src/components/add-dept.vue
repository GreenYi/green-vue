<template>
  <div class="hello">
    <el-dialog title="添加部门信息" :visible.sync="dialogAdd.show">
      <el-form :model="formAdd" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="部门" prop="deptName">
          <el-input v-model="formAdd.deptName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="deptLoc">
          <el-input v-model="formAdd.deptLoc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formdong')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addDept',
  props: {
    dialogAdd: Object
  },
  data () {
    return {
      formAdd: {
        deptName: '',
        deptLoc: ''
      },
      formrules: {
        deptName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    dialogFormAdd (formdong) {
      this.$refs[formdong].validate((valid) => {
        if (valid) {
          this.axios({
            // 使用封装好的 axios 进行网络请求
            url: '/dept/depts',
            method: 'post',
            data: this.formAdd
          }).then(res => {
            this.formAdd.deptName = ''
            this.formAdd.deptLoc = ''
            this.$message({
              type: 'success',
              message: '添加信息成功'
            })
            this.dialogAdd.show = false
            this.$emit('update')
          }).catch(error => {
            this.$message({
              type: 'error',
              message: '添加信息失败, ' + error.response.data.message + ': ' + error.message
            })
            console.log('error')
            // alert(error.data.message) // 请求失败返回的数据
          })
        //   this.formAdd = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
