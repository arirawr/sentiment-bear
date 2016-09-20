const input = 'journals/Journal.json'
const output = 'results/journal.csv'
const outputJson = 'results/journal.json'

const fs = require('fs')
const path = require('path')
const sentiment = require('sentiment')
const json2csv = require('json2csv')
const _ = require('lodash')
const moment = require('moment')
require('moment-range')

const journalPath = path.resolve(input)
const entries = JSON.parse(fs.readFileSync(journalPath)).entries

let results = []

const start = '2016-04-01'
const end = '2016-09-19'
const range = moment.range(start, end)

entries.forEach((entry) => {
    let result = {
        uuid: entry.uuid,
        date: moment(entry.creationDate).format('YYYY-MM-DD'),
        sentiment: sentiment(entry.text).score,
        weather: entry.weather,
        location: entry.location
    }
    results.push(result)
})

let grouped = _.groupBy(results, 'date')

let days = []

range.by('days', function(moment) {
    let date = moment.format('YYYY-MM-DD')
    days.push({
        date: date,
        sentiment: grouped[date] ? _.meanBy(grouped[date], 'sentiment') : null
    })
})

fs.writeFileSync(output)

// const fields = ['date', 'sentiment', 'weather.temperatureCelsius', 'weather.weatherCode', 'location.localityName', 'location.longitude', 'location.latitude']
const fields = ['date', 'sentiment']

let csv = json2csv({ data: days, fields: fields })

fs.writeFileSync(outputJson, JSON.stringify(days))
