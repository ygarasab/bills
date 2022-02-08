import {stringSum} from './utils'
import {
    InvalidFieldError,
    InvalidVerificationDigitError,
    InvalidValueIdentificationDigitError
} from "./errors"

const getBillInfo = writtenLine =>
{
    const fields = getFields(writtenLine)
   
    const mod = getModForDigit(writtenLine.charAt(2))

    for({value, vd} of fields){
        if(!verificationDigitIsValid(value, vd, mod)) 
            throw new InvalidFieldError()
    }
    
    const barCode = fields.map(field => field.value).join('')
    const vd = barCode.charAt(3)

    if(!verificationDigitIsValid(barCode, vd, mod))
        throw new InvalidValueIdentificationDigitError()

    const amount = getBillValue(barCode);
    const expirationDate = getExpirationDate(barCode)

    return {barCode, amount, expirationDate}

}


const getField = line =>
{
    let fields = []
    for (let i = 0; i < 4; i++)
        fields.push({value: line.substr(i*12,11), vd: line.charAt(12*(i+1) -1)})
    return fields
}

const getModForDigit = digit =>
{
    if('67'.includes(digit)) return 10
    else if('89'.includes(digit)) return 11
    else
        throw new InvalidValueIdentificationDigitError()
}

const verificationDigitIsValid = (string, vd, mod) =>
{
    const sum = stringSum(string)
    return sum % mod === vd

}

const getBillValue = barCode =>
{
    const valueString =  barCode.substr(4,11)
    return parseInt(valueString) / 100
}

const getExpirationDate = barCode =>
{
    const year = parseInt(barCode.substr(23,4))
    if(!year) return null

    const month = parseInt(barCode.substr(27,2))
    const day = parseInt(barCode.substr(29,2))
    return new Date(year, month, day).toDateString()

}

export {
    getModForDigit,
    getField
}
