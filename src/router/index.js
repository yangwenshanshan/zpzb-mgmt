import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/lunbo/index'),
      meta: { title: '轮播图', icon: 'dashboard' }
    }, {
      path: '/dashboard/add',
      name: 'DashboardAdd',
      component: () => import('@/views/lunbo/detail'),
      hidden: true,
      meta: { title: '轮播图-编辑', icon: 'dashboard' }
    }]
  },

  {
    path: '/corporateReview',
    component: Layout,
    children: [
      {
        path: '/corporateReview',
        name: 'CorporateReview',
        component: () => import('@/views/corporateReview/index'),
        meta: { title: '企业综述', icon: 'nested'}
      }
    ]
  },

  {
    path: '/businessField',
    component: Layout,
    children: [
      {
        path: '/businessField',
        name: 'BusinessField',
        component: () => import('@/views/businessField/index'),
        meta: { title: '业务领域', icon: 'form' }
      },
      {
        path: '/businessField/add',
        name: 'BusinessFieldAdd',
        component: () => import('@/views/businessField/detail'),
        meta: { title: '业务领域-编辑', icon: 'form' },
        hidden: true,
      }
    ]
  },

  {
    path: '/consultationExpress',
    component: Layout,
    redirect: '/consultationExpress/corporateExpress',
    name: 'ConsultationExpress',
    meta: { title: '咨询速递', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'corporateExpress',
        name: 'CorporateExpress',
        component: () => import('@/views/corporateExpress/index'),
        meta: { title: '企业快报', icon: 'table' }
      },
      {
        path: 'corporateExpress/add',
        name: 'CorporateExpressAdd',
        component: () => import('@/views/corporateExpress/detail'),
        meta: { title: '企业快报-编辑', icon: 'table' },
        hidden: true,
      },
      {
        path: 'ruleInterpretation',
        name: 'RuleInterpretation',
        component: () => import('@/views/ruleInterpretation/index'),
        meta: { title: '规则解读', icon: 'tree' }
      },
      {
        path: 'ruleInterpretation/add',
        name: 'RuleInterpretationAdd',
        component: () => import('@/views/ruleInterpretation/detail'),
        meta: { title: '规则解读-编辑', icon: 'tree' },
        hidden: true,
      },
      {
        path: 'industryStudyResearch',
        name: 'IndustryStudyResearch',
        component: () => import('@/views/industryStudyResearch/index'),
        meta: { title: '行业观研',icon: 'nested' },
      },
      {
        path: 'industryStudyResearch/add',
        name: 'IndustryStudyResearchAdd',
        component: () => import('@/views/industryStudyResearch/detail'),
        meta: { title: '行业观研-编辑', icon: 'nested' },
        hidden: true,
      },
    ]
  },

  {
    path: '/jsonUs',
    component: Layout,
    children: [
      {
        path: '/jsonUs',
        name: 'JsonUs',
        component: () => import('@/views/jsonUs/index'),
        meta: { title: '加入我们图片', icon: 'tree' }
      },
      {
        path: '/jsonUs/add',
        name: 'JsonUsAdd',
        component: () => import('@/views/jsonUs/detail'),
        meta: { title: '加入我们图片-编辑', icon: 'tree' },
        hidden: true,
      }
    ]
  },

  {
    path: '/logo',
    component: Layout,
    children: [
      {
        path: '/logo',
        name: 'Logo',
        component: () => import('@/views/logo/index'),
        meta: { title: 'logo', icon: 'el-icon-s-ticket' }
      },
      {
        path: '/logo/add',
        name: 'LogoAdd',
        component: () => import('@/views/logo/detail'),
        meta: { title: 'logo-编辑', icon: 'el-icon-s-ticket' },
        hidden: true,
      }
    ]
  },

  {
    path: '/partnerlink',
    component: Layout,
    children: [
      {
        path: '/partnerlink',
        name: 'PartnerLink',
        component: () => import('@/views/partnerlink/index'),
        meta: { title: '伙伴登录', icon: 'table' }
      },
      {
        path: '/partnerlink/add',
        name: 'PartnerlinkAdd',
        component: () => import('@/views/partnerlink/detail'),
        meta: { title: '伙伴登录-编辑', icon: 'table' },
        hidden: true,
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
