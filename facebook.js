"use strict";

if (!process.env.NAME) {
    console.error('Please specify your name as it appears on Facebook in the environment:\n')
    console.error('NAME="Your Name" node facebook.js')
    return
}

const fs = require('fs')
const sentiment = require('sentiment')
const moment = require('moment')
const json2csv = require('json2csv')
const getSentimentScores = require('./lib/get-sentiment-scores')

let messages = JSON.parse(fs.readFileSync('inputs/facebook.json'))
    .filter(m => m.user === process.env.NAME)
    .map(m => {
        let scores = getSentimentScores(m.text)
        let date = m.date.match(/([a-zA-Z]+ \d+, \d{4}) at (\d+:\d+(am|pm))/)
        scores.date = moment(`${date[1]} ${date[2]}`, 'MMMM D, YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')
        return scores
    })

let csv = json2csv({ data: messages, flatten: true })
fs.writeFileSync('results/facebook.csv', csv)
