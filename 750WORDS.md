# 750 Words

1. Make sure you have Python and Node installed.

2. Use the 750 Words Analysis tool by kinverarity1: https://github.com/kinverarity1/750words-analysis

    `git clone git@github.com:kinverarity1/750words-analysis.git`

    `cd 750words-analysis`

    `pip install pyquery requests lxml matplotlib`

3. Download your 750 Words entries.

    `mkdir 750words`

    `python download_750words.py -u "YOUR EMAIL" -p "YOUR PASSWORD" -a -P ./750words`

4. Set up this repo

    `git clone git@github.com:cjroth/sentiment-bear.git && cd sentiment-bear && npm install`

5. Copy your 750 Words entries into `inputs/750words`.

6. Run the sentiment analysis

    `node 750words.js`

7. Your output will be in `results/750words.csv`.
