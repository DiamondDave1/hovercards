'use strict';

define('sidebar', ['jquery'], function($) {
    return function sidebar() {
        var obj = $('<div class="hovertoast-sidebar"></div>');
        var iframe = $('<iframe></iframe>')
            .prop('src', chrome.extension.getURL('sidebar.html'))
            .prop('frameborder', '0');
        obj.append(iframe);

        var on = false;
        var onTimeout;

        chrome.runtime.onMessage.addListener(function(request) {
            if (request.msg !== 'sidebar') {
                return;
            }
            switch (request.show) {
                case 'maybe':
                    obj.show();
                    clearTimeout(onTimeout);
                    onTimeout = setTimeout(function() {
                        on = true;
                    }, 2000);
                    break;
                case 'maybenot':
                    if (on) {
                        return;
                    }
                    obj.hide();
                    clearTimeout(onTimeout);
                    break;
                case 'on':
                    obj.show();
                    clearTimeout(onTimeout);
                    on = true;
                    break;
            }
        });

        return obj;
    };
});
