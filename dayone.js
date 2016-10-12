const fs = require('fs')
const json2csv = require('json2csv')
const moment = require('moment')
const getSentimentScores = require('./lib/get-sentiment-scores')

const entries = JSON.parse(fs.readFileSync('inputs/dayone.json')).entries.map((entry) => {
    let scores = getSentimentScores(entry.text)
    scores.date = moment(entry.creationDate).format('YYYY-MM-DD HH:mm:ss')
    scores.weather = entry.weather
    scores.location = entry.location
    return scores
})

let csv = json2csv({ data: entries, flatten: true })

fs.writeFileSync('results/dayone.csv', csv)
