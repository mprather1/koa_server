export function routeAPI (service, router) {
  const api = service.api.v1
  
  router.get('/home', async ctx => {
    ctx.body = await api.homeRoute(service)
    return
  })
}