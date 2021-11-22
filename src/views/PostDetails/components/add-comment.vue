<template>
    <div class="add-comment">
        <v-dialog v-model="dialog" persistent>
            <div class="dialog --grey-theme">
                <div class="heading flex">
                    <h2 class="white-text">Add comment</h2>
                    <v-icon color="white" class="cursor" @click="$emit('close')">mdi-close</v-icon>
                </div>

                <v-form>
                    <div class="form-body" @submit.prevent>
                        <label> Comment </label>
                        <vue-editor style="background-color : white; color : black;" v-model="comment"></vue-editor>
                    </div>

                    <div class="footer flex">
                        <button 
                            class="white--text bold submit-button"
                            type="submit"
                            @click.prevent="addComment"> + Add </button>
                    </div>
                </v-form>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import API_URLS from '../../../helpers/api-urls';
export default {
    name : 'addComment',

    data() {
        return {
            comment : ''
        }
    },

    props : {
        dialog : {
            type : Boolean,
            default : false
        }
    },

    watch : {
        dialog : function(value) {
            if(!value)
                this.comment = '';
        }
    },

    methods : {
        addComment() {
            const successHandler = response => {
                if(response.status === 201) {
                    this.$emit('refreshCommentList');
                }
            }

            const errorHandler = error => {
                console.log(error);
            }

            const data = {
                post_id : this.$route.params.id,
                body : this.comment
            }

            this.requestPOST(
                API_URLS.comments,
                data,
                {},
                successHandler,
                errorHandler
            )
        }
    },

    components : {
        VueEditor
    }
}
</script>