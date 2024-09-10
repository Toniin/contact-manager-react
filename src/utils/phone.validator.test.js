import {phoneValidator_FR_fr, phoneFormatLocal_FR_fr, phoneFormatInternational_FR_fr} from './phone.validator.ts';

describe("phoneValidator_FR", () => {
    it("should return true", () => {
        const result = phoneValidator_FR_fr("(+33)2 14 56 78 90")

        expect(result).toBe(true)
    })

    it("should return false", () => {
        const result = phoneValidator_FR_fr("(+33)2 14 56 78 9")

        expect(result).toBe(false)
    })
})

// test("phoneValidator_FR_fr() should return true", () => {
//     const result = phoneValidator_FR_fr("(+33)2 14 56 78 90")
//
//     expect(result).toBe(true)
// })

// test("phoneValidator_FR_fr() should return false", () => {
//     const result = phoneValidator_FR_fr("(+33)2 14 56 78 9")
//
//     expect(result).toBe(false)
// })

describe("phoneFormatLocal_FR", () => {
    it("should replace '(+33)' by '0'", () => {
        const result = phoneFormatLocal_FR_fr("(+33)2 14 56 78 9")

        expect(result).toBe("02 14 56 78 9")
    })
})

// test("phoneFormatLocal_FR_fr() should replace '(+33)' by '0'", () => {
//     const result = phoneFormatLocal_FR_fr("(+33)2 14 56 78 9")
//
//     expect(result).toBe("02 14 56 78 9")
// })

describe("phoneFormatInternational_FR_fr", () => {
    it("should replace '0' by '(+33)'", () => {
        const result = phoneFormatInternational_FR_fr("02 14 56 78 9")

        expect(result).toBe("(+33)2 14 56 78 9")
    })
})

// test("phoneFormatInternational_FR_fr() should replace '0' by '(+33)'", () => {
//     const result = phoneFormatInternational_FR_fr("02 14 56 78 9")
//
//     expect(result).toBe("(+33)2 14 56 78 9")
// })