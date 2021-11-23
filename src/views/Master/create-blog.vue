<template>
    <div class="create-blog">
        <v-dialog v-model="dialog" persistent>
            <div class="dialog --grey-theme">
                <div class="heading flex">
                    <h2 class="white-text">Create Blog Post</h2>
                    <v-icon color="white" class="cursor" @click="closeModal">mdi-close</v-icon>
                </div>

                <v-form ref="createBlogRef">
                    <div class="form-body" @submit.prevent>
                        <label> Title </label>
                        <v-text-field 
                            :rules="[rules.required, rules.validContent(title, 10)]"
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
import accessToken from '../../helpers/access-token';
import API_URLS from '../../helpers/api-urls';
import rules from '../../helpers/rules';
import { eventBus } from '../../main';
export default {
    name : 'createBlog',

    data() {
        return {
            dialog : false,
            title : '',
            body : '',
            rules : rules
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
            if(this.$refs.createBlogRef.validate()) {
                const successHandler = response => {
                    if(response.status === 201) {
                        eventBus.$emit('refreshPostList');
                        this.closeModal();
                        const snackbarData = {
                            textMessage : 'Blog created successfully!',
                            color : 'success',
                            timeOut : 5000
                        }
                        this.$store.dispatch('snackBar/setSnackBar', snackbarData);
                    }
                }

                const errorHandler = error => {
                    const snackbarData = {
                        textMessage : `Something went wrong! Error Code ${error.status}`,
                        color : 'error',
                        timeOut : 10000
                    }
                    this.$store.dispatch('snackBar/setSnackBar', snackbarData);
                }

                const data = {
                    title : this.title,
                    body : this.body
                }

                const headers = {
                    'Authorization' : `Bearer ${accessToken.getAccessToken()}`
                }

                this.requestPOST(
                    API_URLS.posts,
                    data,
                    headers,
                    successHandler,
                    errorHandler
                )
            }
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