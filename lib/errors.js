class NaivlyInvalidBillError extends Error
{
     constructor (message) {
        super(message || "Written line has an invalid structure")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

class InvalidValueIdentificationDigitError extends Error
{
     constructor (message) {
        super(message || "Value identification digit is invalid")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

class InvalidFieldError extends Error
{
     constructor (message) {
        super(message || "Line presents an invalid verification digit")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

class InvalidVerificationDigitError extends Error
{
     constructor (message) {
        super(message || "Bill presents invalid verification digit")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

export
{
    NaivlyInvalidBillError, 
    InvalidValueIdentificationDigitError, 
    InvalidFieldError,
}
