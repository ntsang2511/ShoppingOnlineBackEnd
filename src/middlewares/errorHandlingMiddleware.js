/* eslint-disable no-unused-vars */
const { env } = require('./environment')
const { StatusCodes } = require('http-status-codes')

// Centralized error handling middleware in a Node.js (Express.js) backend application
const errorHandlingMiddleware = (err, req, res, next) => {
  // If the developer forgets to set statusCode, default to 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Create a responseError variable to control what should be returned
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // If the error has no message, use the standard ReasonPhrases based on the status code
    stack: err.stack
  }
  // console.error(responseError)

  //Only return the stack trace in the DEV environment for easier debugging; otherwise, remove it
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // This section can be expanded later, such as logging errors to a file, sending error notifications to Slack, Telegram, Email, etc.
  // Alternatively, the error handling logic can be moved to a separate middleware file depending on the project.
  // ...
  // console.error(responseError)

  // Return responseError to Front-end
  res.status(responseError.statusCode).json(responseError)
}

module.exports = { errorHandlingMiddleware }
