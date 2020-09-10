
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // {    
  //   path: '/results/:destination',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { name: 'results', path: '/results/:destination', component: () => import('pages/Results.vue') }
  //   ]
  // },
  {    
    path: '/results',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'results', path: '/results', component: () => import('pages/Results.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
