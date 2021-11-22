<template>
    <div class="create-blog">
        <v-dialog v-model="dialog" persistent>
            <div class="dialog --grey-theme">
                <div class="heading flex">
                    <h2 class="white-text">Create Blog Post</h2>
                    <v-icon color="white" class="cursor" @click="closeModal">mdi-close</v-icon>
                </div>

                <v-form>
                    <div class="form-body" @submit.prevent>
                        <label> Title </label>
                        <v-text-field 
                            outlined 
                            v-model="title"
                            background-color="white"
                            placeholder="Your title here" />

                        <label> Body </label>
                        <vue-editor style="background-color : white; color : black;" v-model="body"></vue-editor>
                    </div>

                    <div class="footer flex">
                        <button 
                            class="white--text bold submit-button"
                            type="submit"
                            @click.prevent="createPost">Submit</button>
                    </div>
                </v-form>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import API_URLS from '../../helpers/api-urls';
import { eventBus } from '../../main';
export default {
    name : 'createBlog',

    data() {
        return {
            dialog : false,
            title : '',
            body : ''
        }
    },

    mounted() {
        eventBus.$on('openCreatePostForm', () => this.dialog = true)
    },

    methods : {
        closeModal() {
            this.dialog = false;
            setTimeout(() => {
                this.title = '';
                this.body = '';
            }, 500);
        },

        createPost() {
            const successHandler = response => {
                if(response.status === 200) {
                    eventBus.$emit('refreshPostList');
                    this.closeModal();
                }
            }

            const errorHandler = error => {
                console.log(error);
            }

            const data = {
                title : this.title,
                body : this.body
            }

            this.requestPOST(
                API_URLS.posts,
                data,
                {},
                successHandler,
                errorHandler
            )
        },
    },

    components : {
        VueEditor
    }
}
</script>

<style lang="scss" scoped>
@import url('./common/styles.css');

</style>