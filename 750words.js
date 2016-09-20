const entriesDir = '../750words'
const output = 'results/750words.csv'

const fs = require('fs')
const path = require('path')

const sentiment = require('sentiment')
const json2csv = require('json2csv')

let entries = fs.readdirSync(path.resolve(entriesDir))
    .filter(item => /.txt$/.test(item))
    .map((filePath) => {
        return fs.readFileSync(path.resolve(entriesDir, filePath)).toString()
    })
    .reduce((prev, curr) => {
        return prev + curr
    })
    .split('------ ENTRY ------')
    .map((entry) => {
        return entry
            .split('\n')
            .filter(line => line.length)
    })
    .filter(entry => entry.length === 4)
    .map((entry) => {
        return {
            date: entry[0].split(':')[1].trim(),
            words: parseInt(entry[1].split(':')[1].trim()),
            minutes: parseInt(entry[2].split(':')[1].trim()),
            text: entry[3],
            sentiment: sentiment(entry[3]).score
        }
    })

const fields = ['date', 'sentiment']
let csv = json2csv({ data: entries, fields: fields })
fs.writeFileSync(output, csv)
