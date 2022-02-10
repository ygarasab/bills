import m from '../lib/bank-bill.js'
import {
    InvalidFieldError,
    InvalidVerificationDigitError,
    InvalidValueIdentificationDigitError
} from "../lib/errors"


describe('get field', () => {
    it('gets fields properly', () => {
        
        let line = '21290001192110001210904475617405975870000002000'
        expect(m.getFields(line))
            .toStrictEqual(
                [
                    {value: "212900011", lvd: "9"},
                    {value: "2110001210", lvd: "9"},
                    {value: "0447561740", lvd: "5"},
                ]
            )

    })
})

describe('verification digit check', () => {
    it('validates correct sets for mod 10', () => {

        expect(m.verificationDigitIsValid('212900011', "9", 10)).toBe(true)
        expect(m.verificationDigitIsValid('2110001210', "9", 10)).toBe(true)
        expect(m.verificationDigitIsValid('0447561740', "5", 10)).toBe(true)
        expect(m.verificationDigitIsValid('001905009', "5", 10)).toBe(true)
        expect(m.verificationDigitIsValid('4014481606', "9", 10)).toBe(true)
        expect(m.verificationDigitIsValid('0680935031', "4", 10)).toBe(true)
    })

    it('validates correct sets for mod 11', () => {

        expect(m.verificationDigitIsValid('2129758700000020000001121100012100447561740',"9",11)).toBe(true)

    })
})


describe('gets expiration date', () => {
    it('gets expiration correctly', () => {

        let line = '21290001192110001210904475617405975870000002000'
        expect(m.getExpirationDate(line)).toBe('2018-07-16')

    })
})

describe('gets bill value', () => {
    it('gets amount properly', () => {

        let line = '21290001192110001210904475617405975870000002000'
        expect(m.getBillValue(line)).toBe(20.00)

    })
})


describe('gets bar code', () => {
    it('gets bar code properly', () => {

        let line = '21290001192110001210904475617405975870000002000'
        let fields = m.getFields(line)
        expect(m.getBarCode(line, fields)).toBe('21299758700000020000001121100012100447561740')

    })
})


describe('gets bill info', () => {
    it('gets info properly', () => {

        let line = '21290001192110001210904475617405975870000002000'
        expect(m.getBillInfo(line)).toStrictEqual({
            barCode: '21299758700000020000001121100012100447561740',
            amount: 20,
            expirationDate: '2018-07-16'
          })


    })
})
