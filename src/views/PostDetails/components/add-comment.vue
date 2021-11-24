<template>
    <div class="add-comment">
        <v-dialog v-model="dialog" persistent content-class="content-dialog">
            <div class="dialog --grey-theme">
                <div class="heading flex">
                    <h2 class="white-text">Add comment</h2>
                    <v-icon color="white" class="cursor" @click="$emit('close')">mdi-close</v-icon>
                </div>

                <v-form>
                    <div class="form-body" @submit.prevent>
                        <label> Comment </label>
                        <vue-editor style="background-color : white; color : black;" v-model="comment" :disabled="loader"></vue-editor>
                    </div>

                    <div class="footer flex">
                        <button 
                            :disabled="comment.length === 0"
                            class="white--text bold submit-button"
                            type="submit"
                            @click.prevent="addComment"> 
                            + Add
                            <v-progress-circular v-if="loader" indeterminate color="white" size="10" width="2"/>
                        </button>
                    </div>
                </v-form>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import accessToken from '../../../helpers/access-token';
import API_URLS from '../../../helpers/api-urls';
export default {
    name : 'addComment',

    data() {
        return {
            comment : '',
            loader : false
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
            this.loader = true;
            const successHandler = response => {
                if(response.status === 201) {
                    this.$emit('refreshCommentList');
                    this.loader = false;
                }
            }

            const errorHandler = error => {
                console.log(error);
                this.loader = true;
            }

            const data = {
                post_id : this.$route.params.id,
                body : this.comment
            }

            const headers = {
                'Authorization' : `Bearer ${accessToken.getAccessToken()}`
            }

            this.requestPOST(
                API_URLS.comments,
                data,
                headers,
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

<style lang="scss">

button:disabled {
    opacity: 0.5;
}
</style>