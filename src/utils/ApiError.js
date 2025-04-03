class ApiError extends Error {
  constructor(statusCode, message) {
    // Call the constructor of the Error class (parent class) to use this (basic OOP knowledge).
    // The parent class (Error) already has a message property, so pass it directly in super for brevity.
    super(message)

    //  The name of this custom error; if not set, it will default to "Error"
    this.name = 'ApiError'

    // Assign our custom HTTP status code here
    this.statusCode = statusCode

    // Capture the stack trace for easier debugging
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError
