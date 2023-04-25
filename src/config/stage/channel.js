const channelRouter = {
  route: null,
  name: null,
  title: '频道管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/channel/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加频道',
      type: 'view',
      name: 'ChannelCreate',
      route: '/channel/add',
      filePath: 'view/channel/channel-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '频道列表',
      type: 'view',
      name: 'ChannelList',
      route: '/channel/list',
      filePath: 'view/channel/channel-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default channelRouter
