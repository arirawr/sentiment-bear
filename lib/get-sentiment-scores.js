const analyze = require('Sentimental').analyze
const sentiment = require('sentiment')

module.exports = (message) => {
    let sentiment1 = sentiment(message || '')
    let sentiment2 = analyze(message || '')
    return {
        'sentiment1': {
            'score': sentiment1.score,
            'comparative': sentiment1.comparative,
            'positive_count': sentiment1.positive.length,
            'negative_count': sentiment1.negative.length
        },
        'sentiment2': {
            'positive.score': sentiment2.positive.score,
            'positive.comparative': sentiment2.positive.comparative,
            'negative.score': sentiment2.negative.score,
            'negative.comparative': sentiment2.negative.comparative
        }
    }
}
