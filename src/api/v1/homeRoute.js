import {readdir as _readdir} from 'fs'
import pify from 'pify'

const readdir = pify(_readdir)

export default async function homeRoute (service) {
  return 'hello'
}