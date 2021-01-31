import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from '@/components/container'
import Index from '@/views/index'
import Dept from '@/views/dept/list'
import IdCard from '@/views/id-card/id-card'
import Swagger from '@/views/swagger/swagger'
import Druid from '@/views/druid/druid'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/index',
    name: 'Container',
    component: Container,
    children: [
      { path: 'index', name: '首页', component: Index, meta: { title: '首页' }, icon: 'el-icon-s-home' },
      { path: 'dept', name: '部门管理', component: Dept, meta: { title: '部门管理' }, icon: 'el-icon-office-building' },
      { path: 'id-card', name: '身份认证', component: IdCard, meta: { title: '身份认证' }, icon: 'el-icon-user-solid' },
      { path: 'swagger', name: '接口文档', component: Swagger, meta: { title: '接口文档' }, icon: 'el-icon-document' },
      { path: 'druid', name: 'Druid 监控', component: Druid, meta: { title: 'Druid 监控' }, icon: 'el-icon-monitor' }
    ]
  }
]

export default new VueRouter({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap // 指定路由列表
})
