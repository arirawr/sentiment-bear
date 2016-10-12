const output = 'results/moves'
const util = require('util')
const fs = require('fs')
const json2csv = require('json2csv')
const moment = require('moment')
require('moment-range')

let data = fs.readFileSync('../moves-export.json').toString()

;[11, 132845, 196929, 546337, 590794, 746650, 2372572, 3113900, 4353007, 6011461, 7401001, 9499828, 10867578, 12152803, 14422998, 13963495].forEach(position => {
    data = data.slice(0, position) + data.slice(position + 1, data.length)
})

data = JSON.parse(data)
data = data.export.filter(i => i.segments).map(m => {
    let segments = m.segments.filter(s => s.type === 'move')
    console.log(moment(m.endTime).diff(m.startTime), m.endTime, m.startTime, m)
    return {
        date: moment(m.date, 'YYYYMMDD').format('YYYY-MM-DD'),
        duration: segments.map(s => {
            return s.activities.filter(a => a.activity === 'wlk').reduce((prev, curr) => { return curr.duration + prev }, 0)
        }).reduce((prev, curr) => { return curr + prev }, 0)
    }
})

// console.log(data)

const fields = ['date', 'duration']
let csv = json2csv({ data, fields })
fs.writeFileSync(`${output}.csv`, csv)

fs.writeFileSync(`${output}.json`, JSON.stringify(data))
