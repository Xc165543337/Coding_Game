import fs from 'node:fs'

const fileString: string = await fs.promises.readFile('input.txt', 'utf-8')

const contentLines: string[] = fileString.split('\n')
const digitWordMap: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

let finalValue = 0

/**
 * Converts a string with words of digits to a string with numbers
 * @param str string with words to convert
 * @returns string with all words of digits converted to numbers
 * @example
 * convertDigitStringToNumber('twoeighthree') // 't2oe8t3e'
 */
function convertDigitStringToNumber(str: string): string {
    let sortedString: string = str
    Object.keys(digitWordMap).forEach((key: string) => {
        sortedString = sortedString.replace(
            new RegExp(key, 'g'),
            key.charAt(0) + digitWordMap[key] + key.charAt(key.length - 1)
        )
    })
    return sortedString
}

/**
 * Obtains the calibration value from a string (first and last number)
 * @param numbers string with numbers to get the calibration value from
 * @returns calibration value obtained from the string
 * @example
 * getCalibrationValueFromString('t2oe8t3e') // 23
 */
function getCalibrationValueFromString(numbers: string): number {
    // get the first and last number
    const calibrationValueString: string = numbers.charAt(0).concat(numbers.charAt(numbers.length - 1))
    // convert to number
    const calibrationValue: number = Number.parseInt(calibrationValueString, 10)
    return calibrationValue
}

contentLines.forEach((line: string) => {
    // replace all words with numbers
    // special case: twoeighthree -> 283
    let sortedLine: string = line
    sortedLine = convertDigitStringToNumber(sortedLine)
    // remove all non-numbers
    const numbers: string = sortedLine.replace(/[^0-9]/g, '')
    if (numbers.length > 0) {
        // get the calibration value
        const calibrationValue: number = getCalibrationValueFromString(numbers)
        // add to final value
        finalValue += calibrationValue
    }
})

console.log(`The Calibration Value of the given file is: ${finalValue}`)
