import Koa from 'koa'
import Router from 'koa-router'
import mount from 'koa-mount'
import jsonBody from 'koa-json-body'
import kcors from 'kcors'

import {routeAPI as routeAPIv1} from './api-routes/v1'

export function setupKoaServer (service) {
  
  const {rawHttp} = service
  const app = new Koa()
  const apiApp = generateAPIv1(service)
  
  app.use(mount('/api/v1', apiApp))
  
  rawHttp.on('request', app.callback())
  
  return app
  
}

function generateAPIv1 (service) {
  
  const {logger} = service
  const API = new Koa()
  const router = new Router()
  
  API.use(kcors())
  API.use(jsonBody({ limit: '1mb' }))
  
  API.use(async function (ctx, next) {
    const isProduction = ctx.app.env === 'production'
    const start = Date.now()
    let duration
    let apiError

    try {
      await next()
    } catch (err) {
      apiError = err
    }

    duration = Date.now() - start

    let newStatus = apiError ? 500 : ctx.status
    if (newStatus === 204) newStatus = 200

    if (apiError) {
      logger.error(`API call: ${ctx.method} ${ctx.path} @ ${duration}ms (500)\n${apiError.stack}`)
    } else {
      logger.info(`API call: ${ctx.method} ${ctx.path} @ ${duration}ms (${ctx.status} -> ${newStatus})`)
    }

    if (ctx.status === 404 && !apiError) {
      ctx.body = {
        meta: {
          time: duration
        },
        error: {
          name: 'Not Found',
          message: 'API route not found.'
        }
      }
      ctx.status = 404
      return
    }

    const apiResponse = ctx.body

    ctx.status = newStatus

    const ourResponse = {
      meta: {
        time: duration
      }
    }

    if (apiError) {
      ourResponse.error = {
        name: apiError.name,
        message: apiError.message,
        stack: (isProduction) ? undefined : apiError.stack
      }
    } else {
      ourResponse.payload = apiResponse
    }

    ctx.body = ourResponse
  })
  
  routeAPIv1(service, router)
  
  API.use(router.routes(), router.allowedMethods())
  
  return API
  
}