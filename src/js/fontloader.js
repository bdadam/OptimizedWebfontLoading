function loadFont(fontFamily, variants, className) {
    var raf = window.requestAnimationFrame || function(fn) { setTimeout(fn, 16); };
    var numberOfVariantsToLoad = 0;
    var localStorageKey = '-font-' + fontFamily;
    var doc = document;
    var html = doc.documentElement;

    if (localStorage[localStorageKey] === '' + variants) {
        return html.className += ' ' + className;
    }

    for (var i = 0, l = variants.length; i < l; i++) {
        var parts = ('' + variants[i]).split('-');
        var fontWeight = parts[0] || 400;
        var fontStyle = parts[1] || 'normal';

        numberOfVariantsToLoad++;
        checkForFontVariantLoaded(fontWeight, fontStyle);
    }

    function checkForFontVariantLoaded(fontWeight, fontStyle) {
        // We create a hidden DIV,
        // set the font to a default font (sans-serif)
        // and wait for a size change to happen.
        // 
        // The size change means the font has been loaded

        var defaultFont = 'sans-serif'
        var div = doc.createElement('div');
        var style = div.style;

        div.innerHTML = 'AsdfQwerMXox159';
        style.fontFamily = defaultFont;
        style.fontWeight = fontWeight;
        style.fontSize = '14px';
        style.fontStyle = fontStyle;
        style.position = 'absolute';
        style.left = '-9999px';

        raf(function() {
            // We have to use requestAnimationFrame, because the code can be located in the HEAD.
            // Therefore we have to wait until document.body is ready.

            doc.body.appendChild(div);
            var initialWidthWithDefaultFont = div.clientWidth;
            style.fontFamily = fontFamily + ',' + defaultFont;

            raf(function check() {
                // We iteratively check for change in the div's width.

                if (div.clientWidth === initialWidthWithDefaultFont) {
                    raf(check);
                } else if (!--numberOfVariantsToLoad) {
                    // The width has changed AND there are no more variants to load.

                    doc.body.removeChild(div);
                    localStorage[localStorageKey] = variants;
                    html.className += ' ' + className;
                }
            });
        });
    }
}
