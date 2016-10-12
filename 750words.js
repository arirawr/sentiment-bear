const fs = require('fs')
const path = require('path')
const sentiment = require('sentiment')
const json2csv = require('json2csv')
const getSentimentScores = require('./lib/get-sentiment-scores')

let entries = fs.readdirSync('inputs/750words')
    .filter(item => /.txt$/.test(item))
    .map((filePath) => {
        return fs.readFileSync(path.resolve('inputs/750words', filePath)).toString()
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
        let scores = getSentimentScores(entry[3])
        scores.words = parseInt(entry[1].split(':')[1].trim())
        scores.minutes = parseInt(entry[2].split(':')[1].trim())
        scores.date = date: entry[0].split(':')[1].trim()
        return scores
    })

let csv = json2csv({ data: entries, flatten: true })
fs.writeFileSync('results/750words.csv', csv)
