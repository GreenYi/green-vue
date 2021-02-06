<template>
  <div class="hello">
    <el-dialog title="修改" :visible.sync="dialogEdit.show">
      <el-form :model="form" ref="formEdit" label-width="100px" :rules="formrules">
        <el-form-item label="部门" prop="deptName">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="deptLoc">
          <el-input v-model="form.deptLoc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit.show = false">取消</el-button>
        <el-button type="primary" @click="dialogFormEdit('formEdit')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'editDept',
  props: {
    dialogEdit: Object,
    form: Object
  },
  data () {
    return {
      formrules: {
        deptName: [{ required: true, message: '部门不能为空', trigger: 'blur' }]
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
            if (res.data.status === 200) {
              this.$message.success(res.data.message)
              this.dialogEdit.show = false
              this.$emit('update')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>
