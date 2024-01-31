class httpError{}
  class notFoundException extends httpError{
    constructor(message,stack=null){
      super()
      this.code = 404
      this.message = message
      this.stack = stack
    }
  } 
  class forbiddenException extends httpError{
    constructor(message,stack=null){
      super()
      this.code = 403
      this.message = message
      this.stack = stack
    }
  }

  class duplicateKeyException extends httpError{
    constructor(message,stack=null){
      super()
      this.code = 400
      this.message = message
      this.stack = stack
    }
  }

  class existsException extends httpError{
    constructor(message,stack=null){
      super()
      this.code = 409
      this.message = message
      this.stack = stack
    }
  }
module.exports = { httpError, existsException, forbiddenException, notFoundException, duplicateKeyException}