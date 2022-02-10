class NaivlyInvalidBillError extends Error
{
     constructor (message) {
        super(message || "Linha digitável possui estrutura inválida")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

class InvalidValueIdentificationDigitError extends Error
{
     constructor (message) {
        super(message || "Dígito de identificação do valor apresentado é inválido")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

class InvalidFieldError extends Error
{
     constructor (message) {
        super(message || "Linha apresenta um dígito de verificação de campo inválido")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

class InvalidVerificationDigitError extends Error
{
     constructor (message) {
        super(message || "Linha apresenta um código de verificação geral inválido")
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor);
      }
}

export
{
    NaivlyInvalidBillError, 
    InvalidValueIdentificationDigitError, 
    InvalidFieldError,
   InvalidVerificationDigitError
}
