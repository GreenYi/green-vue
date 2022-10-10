<template>
  <div>

  </div>
</template>
<style>
.el-header {
  background-color: #fafbfc00;
  color: rgb(255, 255, 255);
  line-height: 60px;
}

.el-aside {
  color: #333;
}

#指示器 .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script>
export default {
  methods: {
    linkTo (path) {
      this.$router.push({ path: path })
    }
  }
}
</script>
