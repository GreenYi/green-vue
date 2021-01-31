<template>
  <div style="height:100%">
    <iframe ref="iframe"  :src="url" scrolling="auto" width="100%" height="100%" frameborder="0" ></iframe>
  </div>
</template>
<style>
</style>
<script>
export default {
  components: {},
  data () {
    return {
      // url: 'http://127.0.0.1:8080/api/druid/index.html'
      url: 'http://greenyi.top:8080/api/druid/index.html'
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
