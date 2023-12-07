import fs from 'node:fs'

const fileString: string = await fs.promises.readFile('input.txt', 'utf-8')

const contentLines: string[] = fileString.trim().split('\n')

function replaceMultipleSpacesToSingleSpace(str: string): string {
    return str.replace(/\s+/g, ' ')
}

function removeCarriageReturn(str: string): string {
    return str.replace(/\r/g, '')
}

let finalValue = 0
const temp: string[] = new Array<string>()

contentLines.forEach((line: string) => {
    const formattedLine: string = replaceMultipleSpacesToSingleSpace(removeCarriageReturn(line))
    temp.push(formattedLine)
})

temp.forEach((line: string) => {
    const extractedNumbers: string = line.substring(line.indexOf(':') + 1).trim()
    const splitNumbers: string[] = extractedNumbers.split(' | ')
    const winningNumbers: string[] = splitNumbers[0].split(' ')
    const extraNumbers: string[] = splitNumbers[1].split(' ')
    let winningTimes: number = 0
    extraNumbers.forEach((extraNumber: string) => {
        if (winningNumbers.includes(extraNumber)) {
            winningTimes++
        }
    })
    if (winningTimes > 0) {
        finalValue += Math.pow(2, winningTimes - 1)
    }
})

console.log(finalValue)
