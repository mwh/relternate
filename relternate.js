async function f(tbl) {
    //let tab = await browser.tabs.getCurrent()
    let res = await browser.tabs.executeScript({
        code: `Array.prototype.map.call(document.getElementsByTagName('link'), l =>({href:l.href, type:l.type, media: l.media, rel: l.rel, hreflang: l.hreflang}))`
    })

    for (let t of res) {
        console.log(t)
        t = t.sort((x, y) => {
            if (x.rel < y.rel) return -1
            if (y.rel < x.rel) return 1
            return 0
        })
        console.log(t)
        for (let l of t) {
            if (!l.rel || l.rel.indexOf('stylesheet') != -1 || l.rel.indexOf('preload') != -1 || l.rel.indexOf('icon') != -1 || l.rel.indexOf('prefetch') != -1)
                continue
            let row = tr(td(l.rel), td(a(l.href)), td(l.type), td(l.media, ' ', l.hreflang))
            tbl.append(row)
            if (l.rel == 'alternate' && !l.hreflang) row.style.fontWeight = 'bold'
        }
    }
}

function a(href, text) {
    text = text ? text : href;
    let x = document.createElement('a')
    x.append(text)
    x.href = href;
    return x;
}

function td(...s) {
    let td = document.createElement('td')
    for (let d of s)
        td.append(d)
    return td;
}

function tr(...s) {
    let tr = document.createElement('tr')
    for (let d of s)
        tr.append(d)
    return tr;
}

f(document.getElementById('tbl'));