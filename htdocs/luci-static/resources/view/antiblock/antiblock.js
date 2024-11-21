'use strict';
'require form';
'require rpc';
'require view';

var load_sample1 = rpc.declare({
    object: 'luci.antiblock',
    method: 'start'
});

return view.extend({
    generic_failure: function (message) {
        return E('div', {
            'class': 'error'
        }, [_('RPC call failure: '), message])
    },
    load: function () {
        return Promise.all([
            load_sample1()
        ]);
    },
    render: function (data) {
        console.log(data[0].data);

        let newDiv = document.createElement("div");

        let newTextarea = document.createElement("textarea");
        newTextarea.value = data[0].data;

        newDiv.appendChild(newTextarea);

        return newDiv;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
})
