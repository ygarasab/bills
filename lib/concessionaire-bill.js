import {stringSum} from './utils'
import * from "./errors"

const getBillInfo = writtenLine =>
{
    const fields = getFields(writtenLine)
   
    const mod = getModForDigit(writtenLine.charAt(2))

    for({value, vd} of fields)
        verificationDigitIsValid(value, vd, mod) 
        || throw new InvalidFieldError()
    
    const barCode = fields.map(field => field.value).join('')
    const vd = barCode.charAt(3)

    verificationDigitIsValid(barCode, vd, mod)
    || throw new
}


const getField = line =>
{
    let fields = []
    for (let i = 0; i < 4; i++)
        fields.psuh({value: line.substr(i*12,11), vd: line.charAt(12*i -1)})
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
