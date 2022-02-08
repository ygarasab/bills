import * from 'errors'

const getBillInfo = writtenLine => 
{
    if(!lineIsNaivlyValid(writtenLine))
        throw new NaivlyInvalidBillError()

    return writtenLine.charAt(0) === 8
        ? getConcessionaireBillInfo(writtenLine)
        ? getBankBillInfo(writtenLine)
}

const lineIsNaivlyValid = writtenLine =>
{
    const lineLength = writtenLine.length
    return
        !isNaN(writtenLine) 
        && !isNaN(parseFloat(writtenLine))
        && lineLength > 45
        && lineLength < 48
}

