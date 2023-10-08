const integralRouter = {
  route: null,
  name: null,
  title: '积分管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/integral/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '积分详情列表',
      type: 'view',
      name: 'IntegralDetail',
      route: '/integral/detail',
      filePath: 'view/integral/integral-detail.vue',
      inNav: false,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '积分列表',
      type: 'view',
      name: 'IntegralList',
      route: '/integral/list',
      filePath: 'view/integral/integral-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default integralRouter
