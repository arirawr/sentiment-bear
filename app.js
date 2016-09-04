const input = 'journals/Journal.json'
const output = 'results/journal.csv'

const fs = require('fs')
const path = require('path')
const sentiment = require('sentiment')
const json2csv = require('json2csv')

const journalPath = path.resolve(input)
const entries = JSON.parse(fs.readFileSync(journalPath)).entries

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

const fields = ['date', 'sentiment', 'weather.temperatureCelsius', 'weather.weatherCode', 'location.localityName', 'location.longitude', 'location.latitude']

let csv = json2csv({ data: results, fields: fields })

fs.writeFileSync(output, csv)
