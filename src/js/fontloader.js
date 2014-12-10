(function(woffUrl, woff2Url, localStorageKey) {

    var loSto = {};

    try {
        // We set up a proxy object to help with localStorage, e.g. when cookies are disabled
        // and the browser prevents us accessing it.
        // Otherwise some Exception can be throws which completely prevent font loading.
        loSto = localStorage || {};
    } catch(ex) {}

    if (localStorageKey in loSto) {
        loadFontFromLocalStorage();
    } else {
        var url = supportsWoff2() ? woff2Url : woff2Url;
        var request = new XMLHttpRequest();

        request.open('GET', url);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                loSto[localStorageKey] = request.responseText;
                loadFontFromLocalStorage();
            }
        }
    }

    function loadFontFromLocalStorage() {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = loSto[localStorageKey];
    }

    function supportsWoff2() {
        if (!window.FontFace) {
            return false;
        }

        var f = new FontFace('t', 'url("data:application/font-woff2,") format("woff2")');
        f.load();

        return f.status === 'loading';
    }
}('fonts.woff.css', 'fonts.woff2.css', 'x-font-v0'));