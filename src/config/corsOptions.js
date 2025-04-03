const { WHITELIST_DOMAINS } = require('../utils/constants')
const { env } = require('./environment')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('../utils/ApiError')

// Configure CORS options in a real-world project
const corsOptions = {
  origin: function (origin, callback) {
    // Allow API calls using POSTMAN in the development environment
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Check if the request origin is an allowed domain
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Finally, return an error if the domain is not allowed
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  //  CORS will allow receiving cookies from requests, attaching JWT access token and refresh token in httpOnly cookies
  credentials: true
}

module.exports = { corsOptions }
