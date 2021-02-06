<template>
  <div class="hello">
    <el-dialog title="添加" :visible.sync="dialogAdd.show">
      <el-form :model="formAdd" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="部门" prop="deptName">
          <el-input v-model="formAdd.deptName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="deptLoc">
          <el-input v-model="formAdd.deptLoc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formdong')">确定</el-button>
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
        deptName: [{ required: true, message: '部门不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    dialogFormAdd (formdong) {
      this.$refs[formdong].validate(valid => {
        if (valid) {
          this.axios({
            // 使用封装好的 axios 进行网络请求
            url: '/dept/depts',
            method: 'post',
            data: this.formAdd
          }).then(res => {
            this.formAdd.deptName = ''
            this.formAdd.deptLoc = ''
            if (res.data.status === 200) {
              this.$message.success(res.data.message)
              this.dialogAdd.show = false
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
