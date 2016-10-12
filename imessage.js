const fs = require('fs')
const iMessage = require('imessage')
const moment = require('moment')
const json2csv = require('json2csv')
const getSentimentScores = require('./lib/get-sentiment-scores')

let im = new iMessage()
im.getMessages((err, messages) => {
    if (err) throw err
    messages = messages
        .filter(m => m.is_from_me)
        .map(m => {
            let scores = getSentimentScores(m.text)
            scores.date = moment(m.date * 1000).add(31, 'years').format('YYYY-MM-DD HH:mm:ss')
            return scores
        })
    let csv = json2csv({ data: messages, flatten: true })
    fs.writeFileSync('results/imessage.csv', csv)
})
