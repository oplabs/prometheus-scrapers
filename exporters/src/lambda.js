const { register } = require('./utils/prometheus')

exports.handler = async function(event, ctx, cb) {
  return register.metrics()
}
