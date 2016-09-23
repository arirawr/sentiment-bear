const input = 'journals/Journal.json'
const output = 'results/dayone.csv'
const outputJson = 'results/dayone.json'

const fs = require('fs')
const path = require('path')
const sentiment = require('sentiment')
const json2csv = require('json2csv')
const _ = require('lodash')
const moment = require('moment')
require('moment-range')

const journalPath = path.resolve(input)
const entries = JSON.parse(fs.readFileSync(journalPath)).entries.map((entry) => {
    return {
        uuid: entry.uuid,
        date: moment(entry.creationDate),
        sentiment: sentiment(entry.text).score,
        weather: entry.weather,
        location: entry.location
    }
})

let grouped = _.groupBy(entries.map(m => Object.assign({}, m, {
    date: m.date.format('YYYY-MM-DD')
})), 'date')

let dates = entries.map(m => m.date)
let start = moment.min(dates)
let end = moment.max(dates)
let range = moment.range(start, end)

let days = []

range.by('days', function(moment) {
    let date = moment.format('YYYY-MM-DD')
    days.push({
        date: date,
        sentiment: grouped[date] ? _.meanBy(grouped[date], 'sentiment') : undefined,
        sentiment_filtered: grouped[date] ? _.meanBy(grouped[date].filter(m => m.sentiment > 0), 'sentiment') : undefined

    })
})

fs.writeFileSync(output)

// const fields = ['date', 'sentiment', 'weather.temperatureCelsius', 'weather.weatherCode', 'location.localityName', 'location.longitude', 'location.latitude']
const fields = ['date', 'sentiment', 'sentiment_filtered']

let csv = json2csv({ data: days, fields: fields })

fs.writeFileSync(outputJson, JSON.stringify(days))
