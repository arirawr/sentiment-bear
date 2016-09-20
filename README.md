# 750 Words

1. Make sure you have Python and Node installed.

2. Use the 750 Words Analysis tool by kinverarity1: https://github.com/kinverarity1/750words-analysis

`git clone git@github.com:kinverarity1/750words-analysis.git`

`cd 750words-analysis`

`pip install pip install pyquery requests lxml matplotlib`

3. Download your 750 Words entries.

`python download_750words.py -u "YOUR EMAIL" -p "YOUR PASSWORD" -a -P ~/750words`

4. Update the `entriesDir` constant in `750words.js` to point to the directory you saved your entires to in step 3.

5. Run the sentiment analysis.

`node 750words.js`

6. Your output will be in `results/750words.csv`.
