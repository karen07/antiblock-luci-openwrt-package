'use strict';
'require form';
'require rpc';
'require view';

var read_urls = rpc.declare({
    object: 'luci.antiblock',
    method: 'read_urls'
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
        let newDiv = document.createElement("div");

        let newTextarea = document.createElement("textarea");
        newTextarea.value = data[0].urls;

        newDiv.appendChild(newTextarea);

        let btn_action = E(
            "button",
            {
                class: "btn cbi-button cbi-button-apply",
                click: function (ev) {
                    console.log(newTextarea.value);
                    write_urls(newTextarea.value);
                },
            },
            _("Write URLs")
        );

        newDiv.appendChild(btn_action);

        return newDiv;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
})
