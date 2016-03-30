<style>

.textbox-combo-container {
    position: relative;;
}

.expand-editor,
.event-row-selected .textbox,
.textbox-combo-container .textbox.blank .event-row-selected .selection.dropdown {
    border: 1px solid rgb(200, 200, 200);
    border-radius: 0.28571429rem;
}

.textbox-combo-container .textbox.blank.separated {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px dashed #ddd;
}

.textbox-combo-container .textbox.block {
    width: 100%;
    box-sizing: border-box;
}


.expand-option {
    position: absolute;
    margin-bottom: 5px;
    margin-right: 5px;
}

.expand-container {
    position: relative;
}

.expand-option-expand,
.expand-option-collapse {
    padding-right: 5px;
    line-height: 1.2em;
    text-align: right;
    margin-top: -31px;
    right: 0px;
    position: absolute;
    opacity: 0.5;
}

.expand-option-expand {
    padding-right: 6px;
}

.expand-details {
    position: absolute;
    z-index: 1;
    width: 100%;
}

.expand-editor {
    border-radius: 0.28571429rem;
    border-top: 1px solid #fff;
    border-top-left-radius: 0;
    border-top:none;
    border-top-right-radius: 0;
    /* margin: 0 1px; */
    padding: 0 1px 1px 1px;
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.15);
}

.expand-details .ui.attached.segment,
.expand-details .ui.attached.menu:not(.tabular) {
    border: none;
}

.expand-details .ui.attached.menu:not(.tabular)  {
    border-bottom: 1px solid rgb(220, 220, 220);
}

.expand-editor .expand-details .ui[class*="top attached"].menu {
    border-radius: 0;
}

.combo-transition {
    transition: all .1s ease;
    opacity: 1;
}

.combo-enter,
.combo-leave {
    opacity: 0;
}


</style>

<template>

<div class="textbox-combo-container">
    <input type="text" v-el:titlefield v-bind:class="textbox_styling" placeholder="Event summary" v-model="summary" @keydown.enter.prevent="showDetails" @keydown.tab="event_tab">
    <div v-show="!show_description" class="expand-option-expand"><a class="actionLink small icon alt" @click.prevent="showDetails"><i class="fa fa-pencil"></i></a></div>
    <div class="expand-container">
        <div v-show="show_description" class="expand-details" transition="combo" >
            <div class="expand-editor">
                <quill :id="editor_id" :content.sync="description" :output="output"></quill>
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

        summary_placeholder: {
            default: 'Enter a summary..'
        },
        editor_id: {
            default: null
        },
        summary: {
            default: ''
        },
        description_id: {
            default: ''
        },
        description: {
            default: ''
        },
        output: {
            default: 'html'
        },
        event_enter: {
            type: Function,
            default () {
                return function() {
                    return true
                }
            }
        },
        event_tab: {
            type: Function,
            default () {
                return function() {
                    return true
                }
            }
        }
    },

    data() {
        return {
            textbox_styling: 'textbox block blank',
            show_description : false
        }
    },

    events: {

        'text-change' : function()
        {

        },

        'show-details': function() {
            this.showDetails();
        },

        'hide-details': function() {
            this.hideDetails();
        },

        'close-description': function() {
            this.editing = false;
            this.show_description = false;
        },

        'update-description' : function()
        {
            this.$broadcast('set-html', this.description)
        },

        'focus-combo-summary' : function()
        {
            this.$els.titlefield.focus()
        }

    },

    watch: {

        'show_description': function(oldval, newval) {

            if (this.show_description) {
                this.textbox_styling = 'textbox block blank separated'
            } else {
                this.textbox_styling = 'textbox block blank blank'
                this.$nextTick(() => {
                    this.$els.titlefield.focus()
                })
            }
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
