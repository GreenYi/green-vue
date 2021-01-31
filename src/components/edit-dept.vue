<template>
  <div class="hello">
    <el-dialog title="编辑部门信息" :visible.sync="dialogEdit.show">
      <el-form :model="form" ref="formEdit" label-width="100px" :rules="formrules">
        <el-form-item label="部门" prop="deptName">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="deptLoc">
          <el-input v-model="form.deptLoc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormEdit('formEdit')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'aditDept',
  props: {
    dialogEdit: Object,
    form: Object
  },
  data () {
    return {
      formrules: {
        deptName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    dialogFormEdit (formdong) {
      this.$refs[formdong].validate((valid) => {
        if (valid) {
          this.axios({
            // 使用封装好的 axios 进行网络请求
            url: '/dept/' + this.form.id,
            method: 'put',
            data: this.form
          }).then(res => {
            this.form.deptName = ''
            this.form.deptLoc = ''
            this.$message({
              type: 'success',
              message: '修改信息成功'
            })
            this.dialogEdit.show = false
            this.$emit('update')
          })
          // this.form = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
