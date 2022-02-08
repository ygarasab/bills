const m = require('../lib/concessionaire-bill')
import {
    InvalidFieldError,
    InvalidVerificationDigitError,
    InvalidValueIdentificationDigitError
} from "../lib/errors"

describe('get mod for digit', () => {
    
    it('returns 10 for the proper digits', () => {

        expect(m.getModForDigit('6')).toBe(10)
        expect(m.getModForDigit('7')).toBe(10)
    })
    

    it('returns 11 for the proper digits', () => {

        expect(m.getModForDigit('8')).toBe(11)
        expect(m.getModForDigit('9')).toBe(11)
    })

    it('throws error for invalid digits', () => {

        expect(() => m.getModForDigit('0'))
                .toThrowError(InvalidValueIdentificationDigitError)
        expect(() => m.getModForDigit('1'))
                .toThrowError(InvalidValueIdentificationDigitError)
        expect(() => m.getModForDigit('2'))
                .toThrowError(InvalidValueIdentificationDigitError)
        expect(() => m.getModForDigit('3'))
                .toThrowError(InvalidValueIdentificationDigitError)
        expect(() => m.getModForDigit('4'))
                .toThrowError(InvalidValueIdentificationDigitError)
        expect(() => m.getModForDigit('5'))
                .toThrowError(InvalidValueIdentificationDigitError)
    })

})

describe('get field', () => {
    it('gets fields properly', () => {
        
        let line = '123456789012123456789012123456789012123456789012'
        expect(m.getFields(line))
            .toStrictEqual(
                [
                    {value: "12345678901", lvd: "2"},
                    {value: "12345678901", lvd: "2"},
                    {value: "12345678901", lvd: "2"},
                    {value: "12345678901", lvd: "2"}
                ]
            )

    })
})

describe('verification digit check', () => {
    it('validates correct sets for mod 10', () => {

        expect(m.verificationDigitIsValid('01230067896', "3", 10)).toBe(true)
        expect(m.verificationDigitIsValid('8220000215048200974123220154098290108605940',"1",10)).toBe(true)
        expect(m.verificationDigitIsValid('8960000000599800010110533320100626000015744',"1",10)).toBe(true)
    })

    it('validates correct sets for mod 11', () => {

        expect(m.verificationDigitIsValid('01230067896', "0", 11)).toBe(true)
        expect(m.verificationDigitIsValid('8220000215048200974123220154098290108605940',"0",11)).toBe(true)

    })
})


describe('gets expiration date', () => {
    it('gets expiration correctly', () => {

        let barCode = '89610000000599800010110533320100626000015744'
        expect(m.getExpirationDate(barCode)).toBe('2010-06-26')

        barCode = '82200000215048200974123220154098290108605940'
        expect(m.getExpirationDate(barCode)).toBe(null)
    })
})

describe('gets bill value', () => {
    it('gets amount properly', () => {

        let barCode = '89610000000599800010110533320100626000015744'
        expect(m.getBillValue(barCode)).toBe(59.98)

        barCode = '82200000215048200974123220154098290108605940'
        expect(m.getBillValue(barCode)).toBe(21504.82)
    })
})



