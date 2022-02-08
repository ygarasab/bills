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
        expect(m.getField(line))
            .toStrictEqual(
                [
                    {value: "12345678901", vd: "2"},
                    {value: "12345678901", vd: "2"},
                    {value: "12345678901", vd: "2"},
                    {value: "12345678901", vd: "2"}
                ]
            )

    })
})
