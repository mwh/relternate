browser.tabs.onActivated.addListener(async function(ai) {
    if (false) {
        let res = await browser.tabs.executeScript({
            code: `Array.prototype.map.call(document.getElementsByTagName('link'), l =>({href:l.href, type:l.type, media: l.media, rel: l.rel}))`
        })
        handle(ai.tabId)
    }
})
browser.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    if (changeInfo.status != "complete")
        return;
    handle(tabId)
}, { "properties": ['status'] })

async function handle(tabId) {
    let res = await browser.tabs.executeScript(tabId, {
        code: `Array.prototype.map.call(document.getElementsByTagName('link'), l =>({href:l.href, type:l.type, media: l.media, rel: l.rel, hreflang: l.hreflang}))`
    })
    let count = 0
    let alternate = 0
    for (let t of res) {
        for (let l of t) {
            if (!l.rel || l.rel.indexOf('stylesheet') != -1 || l.rel.indexOf('preload') != -1 || l.rel.indexOf('icon') != -1 || l.rel.indexOf('prefetch') != -1)
                continue
            count++;
            if (l.rel.indexOf('alternate') != -1 && !l.hreflang)
                alternate++;
        }
    }
    if (count) {
        browser.pageAction.show(tabId)
        browser.pageAction.setTitle({ tabId, title: 'alt: ' + alternate + (count != alternate ? ' (+' + (count - alternate) + ')' : '') })
    }
}