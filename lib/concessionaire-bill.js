import {arraySum} from './utils.js'
import {
    InvalidFieldError,
    InvalidVerificationDigitError,
    InvalidValueIdentificationDigitError
} from "./errors.js"

const getBillInfo = writtenLine =>
{
    const fields = getFields(writtenLine)
   
    const mod = getModForDigit(writtenLine.charAt(2))

    for(let {value, lvd} of fields){
        if(!verificationDigitIsValid(value, lvd, mod)) 
            throw new InvalidFieldError()
    }
    
    const barCode = fields.map(field => field.value).join('')
    const vd = barCode.charAt(3)

    const verifiable = barCode.substr(0,3) + barCode.slice(4)
    if(!verificationDigitIsValid(verifiable, vd, mod))
        throw new InvalidVerificationDigitError()

    const amount = getBillValue(barCode);
    const expirationDate = getExpirationDate(barCode)

    return {barCode, amount, expirationDate}

}


const getFields = line =>
{
    let fields = []
    for (let i = 0; i < 4; i++)
        fields.push({value: line.substr(i*12,11), lvd: line.charAt(12*(i+1) -1)})
    return fields
}

const getModForDigit = digit =>
{
    if('67'.includes(digit)) return 10
    else if('89'.includes(digit)) return 11
    else
        throw new InvalidValueIdentificationDigitError()
}

const multiplyStrings = (s1, s2) =>
{
    let res = []
    for(let i = 1; i <= s1.length; i++)
        res.push(s1[s1.length-i] * s2[s2.length-i] )
    return res
}

const verifyMod10 = string =>
{
    const match = '12'.repeat((string.length + 1)/2)
    const multiplied = multiplyStrings(string, match)
    const sum = arraySum(multiplied.join('').split(''))
    const remainder = sum % 10
    return remainder ? 10 - remainder : 0
}

const verifyMod11 = string =>
{
    const match = '98765432'.repeat((string.length +7)/8)
    const multiplied = multiplyStrings(string, match)
    const sum = arraySum(multiplied)
    const remainder = sum % 11
    return remainder === 10 ? 1
        : [0,1].includes(remainder) ? 0
        : 11 - remainder
}

const verificationDigitIsValid = (string, vd, mod) =>
{
    const expected = mod === 10 ? verifyMod10(string) : verifyMod11(string)
    return ''+expected === vd

}

const getBillValue = barCode =>
{
    const valueString =  barCode.substr(4,11)
    return parseInt(valueString) / 100
}

const getExpirationDate = barCode =>
{
    const year = parseInt(barCode.substr(27,4))
    if(!year) return null

    const month = parseInt(barCode.substr(31,2)) -1
    const day = parseInt(barCode.substr(33,2))
    if(month > 12 || day > 31) return null

    return new Date(year, month, day).toISOString().split('T')[0]

}

export default  {
    getModForDigit,
    getFields,
    verificationDigitIsValid,
    getExpirationDate,
    getBillValue,
    getBillInfo
}
