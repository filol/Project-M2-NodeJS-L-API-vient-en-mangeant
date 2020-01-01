const config = module.exports

config.keys = {
  secretJWT: process.env.jwt_key || 'secret key'
}

config.questionsMaxCount = 10
