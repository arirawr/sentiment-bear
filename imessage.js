const fs = require('fs')
const outputJSON = 'results/imessage.json'
const outputCSV = 'results/imessage.csv'
const iMessage = require('imessage')
const sentiment = require('sentiment')
const moment = require('moment')
const _ = require('lodash')
const json2csv = require('json2csv')
require('moment-range')

var im = new iMessage()
im.getMessages((err, messages) => {
    if (err) throw err
    messages = messages
        .filter(m => m.is_from_me)
        .map(m => {
            m.sentiment = sentiment(m.text || '').score
            return m
        })
        .map(m => {
            return {
                date: moment(m.date * 1000).add(31, 'years'),
                sentiment: m.sentiment
            }
        })

    let dates = messages.map(m => m.date)
    let start = moment.min(dates)
    let end = moment.max(dates)
    let range = moment.range(start, end)
    let days = []
    let grouped = _.groupBy(messages.map(m => {
        m.date = m.date.format('YYYY-MM-DD')
        return m
    }), 'date')
    range.by('days', function(moment) {
        let date = moment.format('YYYY-MM-DD')
        days.push({
            date: date,
            sentiment: grouped[date] ? _.meanBy(grouped[date], 'sentiment') : null,
            sentiment_filtered: grouped[date] ? _.meanBy(grouped[date].filter(m => m.sentiment > 0), 'sentiment') : null
        })
    })

    const fields = ['date', 'sentiment', 'sentiment_filtered']
    let csv = json2csv({ data: days, fields: fields })
    fs.writeFileSync(outputCSV, csv)

    fs.writeFileSync(outputJSON, JSON.stringify(days))

})
