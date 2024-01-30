export default eventHandler(() => {
  return {
    code: 200,
    data: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          locale: 'menu.server.dashboard',
          title: '仪表盘-服务端',
          requiresAuth: true,
          icon: 'ant-design:dashboard-outlined',
          order: 1,
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            meta: {
              locale: 'menu.server.workplace',
              title: '工作台-服务端',
              requiresAuth: true,
            },
          },
          {
            path: 'https://arco.design',
            name: 'arcoWebsite',
            meta: {
              locale: 'menu.arcoWebsite',
              title: 'Arco Design',
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  }
})
