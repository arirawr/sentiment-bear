const YOUR_NAME = 'Chris Roth'

const fs = require('fs')
const sentiment = require('sentiment')
const moment = require('moment')
const json2csv = require('json2csv')
const getSentimentScores = require('./lib/get-sentiment-scores')

let messages = JSON.parse(fs.readFileSync('inputs/facebook.json'))
    .filter(m => m.user === YOUR_NAME)
    .map(m => {
        let scores = getSentimentScores(m.text)
        let date = m.date.match(/([a-zA-Z]+ \d+, \d{4}) at (\d+:\d+(am|pm))/)
        scores.date = moment(`${date[1]} ${date[2]}`, 'MMMM D, YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')
        return scores
    })

let csv = json2csv({ data: messages, flatten: true })
fs.writeFileSync('results/facebook.csv', csv)
