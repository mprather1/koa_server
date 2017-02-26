'use strict'

import fastconf from 'fastconf'

export function getConfig (keys, data, namespaces) {
  const keysToUse = []
  .concat(getBaseKeys())
  .concat(keys || [])
  
  return getRawConfig({
    prefix: 'XBPF_',
    keys: keysToUse,
    useProxy: true
  }, (data || process.env), namespaces)
}

export function getBaseKeys () {
  return [
    ['SERVICE_PORT', {type: Number}]
  ]
}

export function getRawConfig (keys, data, namespaces) {
  return fastconf(keys, namespaces, data)
}