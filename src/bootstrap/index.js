import {getHTTPServer} from '../lib/getHTTPServer'
import {getLogger} from '../lib/getLogger'
import {getConfig} from '../lib/getConfig'

import {getAPI} from '../api'
import {setupKoaServer} from './koa-server'

export async function bootstrap() {
  
  const logger = getLogger('/log')
  
  const rawHttp = await getHTTPServer(8000)
  
  const service = {
    logger,
    rawHttp
  }
  
  service.api = getAPI(service)
  service.http = setupKoaServer(service)
  
  return service
  
}