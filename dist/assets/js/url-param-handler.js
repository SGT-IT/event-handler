$(function() {
    if($('body').hasClass('anti-cache')) {
        antiCache();
    }
})

function antiCache() {
    const fullUrl = new URL(window.location.href);
    
    
    if (!getURLParam('key')) {
        fullUrl.searchParams.set('key', generateUniqueKey(10));
        location.href = fullUrl.href;
    }
}

function generateUniqueKey(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getURLParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}