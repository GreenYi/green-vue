<template>
  <div class="app">
    <el-container>
      <el-menu
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        :collapse="isCollapse"
      >
        <template v-for="route in $router.options.routes">
          <template v-for="item in route.children">
            <el-menu-item :key="route.path + '/' + item.path" :index="item.path">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;" @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
          <div class="app-header-userinfo">
            <div id="he-plugin-simple"></div>
          </div>
        </el-header>
        <el-main class="app-body">
          <template>
            <router-view />
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Container',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created () {
    // 和风天气插件
    window.WIDGET = {
      CONFIG: {
        modules: '102',
        background: 1,
        tmpColor: 'FFFFFF',
        tmpSize: 16,
        cityColor: 'FFFFFF',
        citySize: 16,
        aqiSize: 16,
        weatherIconSize: 40,
        alertIconSize: 18,
        padding: '10px 10px 10px 10px',
        shadow: '1',
        language: 'auto',
        borderRadius: 5,
        fixed: 'false',
        vertical: 'middle',
        horizontal: 'center',
        key: 'dd18e6da3e0f49299ce5fb6c4ae31b1b'
      }
    };
    (function (d) {
      var c = d.createElement('link')
      c.rel = 'stylesheet'
      c.href =
        'https://widget.heweather.net/simple/static/css/he-simple.css?v=1.3'
      var s = d.createElement('script')
      s.src =
        'https://widget.heweather.net/simple/static/js/he-simple.js?v=1.3'
      var sn = d.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(c, sn)
      sn.parentNode.insertBefore(s, sn)
    })(document)
  }
}
</script>

<style>
#app {
  height: 100%;
}
.app-body {
  height: 100%;
}
</style>
