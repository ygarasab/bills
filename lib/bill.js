import {NaivlyInvalidBillError} from './errors.js'
import bankBill from './bank-bill.js'
import concessionaireBill from './concessionaire-bill.js'


const getBillInfo = writtenLine => 
{
    if(!lineIsNaivlyValid(writtenLine))
    {
        throw new NaivlyInvalidBillError()
    }

    return writtenLine.charAt(0) === '8'
        ? concessionaireBill.getBillInfo(writtenLine)
        : bankBill.getBillInfo(writtenLine)
}

const lineIsNaivlyValid = writtenLine =>
{
    const lineLength = writtenLine.length
    return !isNaN(writtenLine) 
        && !isNaN(parseFloat(writtenLine))
        && lineLength > 46
        && lineLength < 49
}

export { getBillInfo }
