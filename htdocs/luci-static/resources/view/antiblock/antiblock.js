'use strict';
'require form';
'require rpc';
'require view';

var read_urls = rpc.declare({
    object: 'luci.antiblock',
    method: 'read_urls'
});

var restart = rpc.declare({
    object: 'luci.antiblock',
    method: 'restart'
});

var write_urls = rpc.declare({
    object: 'luci.antiblock',
    method: 'write_urls',
    params: ["urls"]
});

return view.extend({
    generic_failure: function (message) {
        return E('div', {
            'class': 'error'
        }, [_('RPC call failure: '), message])
    },
    load: function () {
        return Promise.all([
            read_urls()
        ]);
    },
    render: function (data) {
        let main_div = E(
            "div",
            {
                class: "cbi-section",
            }
        );

        let urls_textarea = E(
            "textarea",
            {
                class: "cbi-input-textarea",
            }
        );

        urls_textarea.value = data[0].urls;

        main_div.appendChild(urls_textarea);

        let btn_write_urls = E(
            "button",
            {
                class: "btn cbi-button cbi-button-apply",
                click: function (ev) {
                    write_urls(urls_textarea.value);
                },
            },
            _("Write URLs")
        );

        let btn_restart = E(
            "button",
            {
                class: "btn cbi-button cbi-button-apply",
                click: function (ev) {
                    restart();
                },
            },
            _("Restart")
        );

        main_div.appendChild(btn_write_urls);
        main_div.appendChild(btn_restart);

        return main_div;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
})
