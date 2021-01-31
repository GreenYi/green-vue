<template>
  <div>
    <!-- <el-main router class="el-menu-vertical-demo">
      <el-carousel :interval="4000" type="card" height="300PX">
        <template v-for="route in $router.options.routes">
          <el-carousel-item
            v-for="item in route.children"
            :key="route.path + '/' + item.path"
            :index="item.path"
            @click.native="linkTo(item.path)"
          >
            <i :class="item.icon"></i>
            <h3 class="medium">{{ item.name }}</h3>
          </el-carousel-item>
        </template>
      </el-carousel>
    </el-main> -->
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
