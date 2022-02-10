import {arraySum} from './utils.js'
import {
    InvalidFieldError,
    InvalidVerificationDigitError,
} from "./errors.js"

const getBillInfo = writtenLine =>
{
    const fields = getFields(writtenLine)

    for(let {value, lvd} of fields){
        if(!verificationDigitIsValid(value, lvd, 10)) 
            throw new InvalidFieldError()
    }

    const barCode = getBarCode(writtenLine, fields) 
    const vd = barCode.charAt(4)

    const verifiable = barCode.substr(0,4) + barCode.slice(5)
    if(!verificationDigitIsValid(verifiable, vd, 11))
        throw new InvalidVerificationDigitError()

    const amount = getBillValue(writtenLine);
    const expirationDate = getExpirationDate(writtenLine)


    return {barCode, amount, expirationDate}
}

const getBarCode = (line, fields) => 
{
    return line.substr(0,4) + line.slice(32) +
        fields[0].value.slice(4) + fields[1].value + fields[2].value

}


const getFields = line =>
{
    let fields = []
    fields.push({value: line.substr(0,9), lvd: line.charAt(9)})
    fields.push({value: line.substr(10,10), lvd: line.charAt(20)})
    fields.push({value: line.substr(21,10), lvd: line.charAt(31)})
    return fields
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
    const res = 11 - remainder
    return '110'.includes(''+res) ? 1 : res
}

const verificationDigitIsValid = (string, vd, mod) =>
{
    const expected = mod === 10 ? verifyMod10(string) : verifyMod11(string)
    return ''+expected === vd
}

const getBillValue = line =>
{
    const valueString =  line.slice(37)
    return parseInt(valueString) / 100
}

const getExpirationDate = line =>
{
    const factor = parseInt(line.substr(33,4))
    const reference = new Date(1997,9,7)
    return new Date(reference.getTime() + factor * 24 * 3600000).toISOString().split('T')[0]
}

export default {
    getFields,
    verificationDigitIsValid,
    getExpirationDate,
    getBillValue,
    getBillInfo,
    getBarCode
}
