'use strict'

import {join} from 'path'

import {Logger, transports} from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const {Console} = transports

export function getLogger (logDir) {
  
  const consoleTransport = getConsoleTransport()
  const rotatingFileTransport = getConsoleTransport(logDir)
  const transports = [consoleTransport]
  const logger = getRawLogger(transports)
  
  return logger
  
}

export function getRotatingFileTransport (logDir) {
  if (!logDir) {
    throw new Error('No log directory provided!')
  }
  
  return new DailyRotateFile({
    handleExceptions: true,
    level: 'debug',
    colorize: false,
    timestamp: true,
    filename: join(logDir, 'service.log'),
    prettyPrint: true,
    maxRetries: 10,
    prepend: true
  })
}

export function getConsoleTransport () {
  return new Console({
    colorize: true,
    timestamp: true,
    prettyPrint: true,
    humanReadableUnhandledException: true,
    handleExceptions: true
  })
}

export function getRawLogger (transports) {
  const logger = new Logger({
    transports
  })
  
  return logger
  
}