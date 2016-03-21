var Quill = require('./src/ComboEditor.vue'),
    quill = require('quill'),
    render = require('quill-render');

module.exports = {
    install: function (Vue, options) {
        Vue.component('combo-editor', Quill);
    },
}
