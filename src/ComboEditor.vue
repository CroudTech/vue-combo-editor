<style>

.expand-editor,
.event-row-selected .textbox,
.textbox_container .textbox.blank .event-row-selected .selection.dropdown {
    border: 1px solid rgb(200, 200, 200);
    border-radius: 0.28571429rem;
}

.textbox.blank.separated {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px dashed #ddd;
}

</style>

<template>

<div class="textbox_container">
    <input type="text" v-el:titlefield v-bind:class="textbox_styling" placeholder="Event summary" v-model="summary" @keydown.enter.prevent="showDetails" @keydown.tab="previousRow">
    <div v-show="!description" class="expand-option-expand"><a class="actionLink small icon alt" @click.prevent="showDetails"><i class="fa fa-pencil"></i></a></div>
    <div class="expand-container">
        <div v-show="event.show_description" class="expand-details" transition="quill">
            <div class="expand-editor">
                <quill :id="editor_id" :content.sync="description" output="html"></quill>
                <div class="expand-option-collapse"><a class="actionLink small icon alt" @click.prevent="hideDetails"><i class="fa fa-angle-up"></i></a></div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

const Quill = require('quill')

export default {

    props: {

        summary_placeholder : 'Enter a summary..',
        editor_id : 'editor',
        show_description : false,
        summary: '',
        description_id,
        description: '',
        output : 'html',
        event_enter : {
            type : function,
            default : () => {}
        }

    },

    data () {
        return {
            textbox_styling
        }
    },

    events : {

        'show-details' : function()
        {
            this.showDetails();
        },

        'hide-details' : function()
        {
            this.showDetails();
        }

    },

    watch : {
        'show_description': function(oldval, newval) {
            this.textbox_styling = this.show_description ? 'textbox block blank separated' : 'textbox block blank';
        }
    },

    methods: {

        showDetails() {

            this.show_description = true;
            this.$nextTick(() => {
                this.$broadcast('focus-editor')
            });
        },

        hideDetails() {
            this.show_description = false;
            this.$els.titlefield.focus()
        },

    }

}

</script>
