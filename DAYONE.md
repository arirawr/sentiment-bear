# Day One Sentiment

## Part 1: Export Day One Entries

1. Open Day One and go to File -> Export -> JSON. Export the file with File Format being "JSON in Zip (.zip)".

## Part 2: Analyze

1. Set up this repo

    `git clone git@github.com:cjroth/dayonesentiment.git`

    `cd dayonesentiment`

    `npm install`

2. Unzip the entries from Part 1 and put the JSON file from the Journal that you want to analyze in the `inputs` folder, then rename it to `dayone.json`.

2. Run the script to generate a sentiment analysis of your Day One entries:

    `node dayone.js`

3. Your results will be in `results/dayone.csv`
