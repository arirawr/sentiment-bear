# Get Facebook Results

1. Go to https://www.facebook.com/settings and click "Download a copy of your Facebook data."
2. Unzip it and open `html/messages.htm` in Chrome (try dragging the file into Chrome if it doesn't open when you double-click on it.)
3. Open the Chrome developer tools (View -> Developer -> Developer Tools)
4. Copy and paste this code into the Developer Tools console, then press `enter`:

```
let messages = Array(...document.querySelectorAll('.message')).map(m => {
    return {
        user: m.querySelector('.user').textContent,
        date: m.querySelector('.meta').textContent,
        text: m.nextSibling.textContent
    }
})

(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

console.save(messages, 'facebook.json')

```

5. This will download a file called `facebook.json`.