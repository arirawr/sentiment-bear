const sentimentPath = 'input/sentiment.csv'
const valence = 'input/valence.csv'

const fs = require('fs')
const path = require('path')
const sentiment = require('sentiment')
const json2csv = require('json2csv')
const _ = require('lodash')

const sentimentPath = path.resolve(sentimentPath)
const rows = JSON.parse(fs.readFileSync(sentimentPath))
rows.split('\n')

let results = []

entries.forEach((entry) => {
    let result = {
        uuid: entry.uuid,
        date: entry.creationDate,
        sentiment: sentiment(entry.text).score,
        weather: entry.weather,
        location: entry.location
    }
    results.push(result)
})

let grouped = _.groupBy(results, 'date')

console.log(grouped)

const fields = ['date', 'sentiment', 'weather.temperatureCelsius', 'weather.weatherCode', 'location.localityName', 'location.longitude', 'location.latitude']

let csv = json2csv({ data: results, fields: fields })

fs.writeFileSync(output, csv)
