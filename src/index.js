require('babel-polyfill')
const chalk = require('chalk')

console.time('bootstrap-load')
console.log('Loading boostrapper')
const bootstrap = require('./bootstrap').bootstrap
console.timeEnd('bootstrap-load')

console.log('Starting service')
console.time('bootstrap')
bootstrap().then((service) => {
  console.timeEnd('bootstrap')
  service.logger.info('Service started')
})
.catch((err) => {
  console.log(chalk.bgRed.white('service failure'))
  console.log(chalk.bgRed.white(err.stack))  
})