<template>
    <div class="post-details --align">
        <div class="--align" v-if="Object.keys(blogDetails).length === 0">
            <v-skeleton-loader
                v-for="(i, index) in 3"
                :key="index % 3"
                class="skeletons my-6 px-3 py-3"
                type="heading, paragraph"
                dark
                elevation="5"
            ></v-skeleton-loader>
        </div>
        <div v-else>
            <div class="user-details-container flex">
                <p class="user-details" v-if="blogDetails.user"> Posted By : {{ blogDetails.user.name }} on {{ convertedTime }} </p>
                <button v-if="user.isLoggedIn && user.email === blogDetails.user.email" @click="deleteBlogPost">Delete this blog</button>
            </div>
            <div class="body --grey-theme">
                <h1> {{ blogDetails.title }} </h1>
                <p v-html="blogDetails.body"></p>
            </div>
        </div>

        <div class="--align" v-if="loadingComments">
            <v-skeleton-loader
                v-for="(i, index) in 3"
                :key="index % 3"
                class="skeletons my-6 px-3 py-3"
                type="paragraph"
                dark
                elevation="5"
            ></v-skeleton-loader>
        </div>
        <div v-else class="comments-section">
            <div class="flex">
                <h3 v-if="comments.length">Comments : </h3>
                <button @click="commentDialog = true"
                        v-if="user.isLoggedIn">+ Add comments</button>
            </div>

            <div class="comment flex --grey-theme" v-for="comment in comments" :key="comment.id">
                <div class="user__content">
                    <small class="bold"> {{ comment.user.name }} <i>says</i> </small>
                    <p v-html="comment.body"></p>
                    <small> <i> on </i> {{ new Date(comment.created_at).toLocaleString() }} </small>
                </div>
                <div class="delete-comment-section">
                    <v-icon color="white" 
                            class="cursor" 
                            v-if="user.isLoggedIn && user.email === comment.user.email" 
                            @click.native="deleteComment(comment.id)">
                        mdi-close
                    </v-icon>
                </div>
            </div>
        </div>
        <add-comment :dialog="commentDialog" @refreshCommentList="getCommentList" @close="commentDialog = false"/>
    </div>
</template>

<script>
import API_URLS from '../../helpers/api-urls';
import addComment from './components/add-comment.vue';
import _ from 'lodash';
export default {
    name : 'postDetails',

    data() {
        return {
            blogDetails : {},
            comments : [],
            commentDialog : false,
            loadingComments : true
        }
    },

    computed : {
        convertedTime() {
            const time = this.blogDetails.created_at;
            const convertedDate = new Date(time);

            if(convertedDate)
                return convertedDate.toLocaleString()
            return 'N/A';
        },

        user() {
            return this.$store.getters['mainStore/GET_USER_DETAILS'];
        }
    },

    created() {
        this.getPostDetails();
        this.getCommentList();
    },

    methods : {
        getPostDetails() {
            const successHandler = response => {
                if(response.status === 200) {
                    console.log(response.data);
                    this.blogDetails = response.data;
                }
            }

            const errorHandler = error => {
                console.log(error);
            }

            this.requestGET(
                `${API_URLS.posts}/${this.$route.params.id}`,
                {},
                {},
                successHandler,
                errorHandler
            )
        },

        getCommentList() {
            this.commentDialog = false;
            const successHandler = response => {
                if(response.status === 200) {
                    this.loadingComments = false;
                    this.comments = response.data;
                }
            }

            const errorHandler = error => {
                console.log(error);
            }

            this.requestGET(
                `${API_URLS.posts}/${this.$route.params.id}/comments`,
                {},
                {},
                successHandler,
                errorHandler
            )
        },

        deleteBlogPost() {
            const successHandler = response => {
                if(response.status === 200) {
                    this.$router.replace({ name : 'home' })
                }
            }

            const errorHandler = error => {
                console.log(error);
            }

            this.requestDELETE(
                `${API_URLS.posts}/${this.$route.params.id}`,
                {},
                {},
                successHandler,
                errorHandler
            )
        },

        deleteComment(ID) {
            const successHandler = response => {
                if(response.status === 200) {
                    console.log(response.data);
                }
            }

            const errorHandler = error => {
                console.log(error);
            }

            this.requestDELETE(
                `${API_URLS.comments}/${ID}`,
                {},
                {},
                successHandler,
                errorHandler
            )
        }
    },

    components : {
        'add-comment' : addComment
    }
}
</script>

<style lang="scss" scoped>

.user-details-container {
    flex-direction: column;
    align-items: flex-start;
}

.user-details {
    font-size: 0.7rem;
    padding: 0 10px;
}

button {
    background-color: black;
    padding: 10px;
    border-radius: 6px;
    margin: 10px;
}

.post-details {
    padding: 10px 0;
}

.body {
    padding: 10px 15px 10px 10px;
}

.body h1 {
    font-size: 1.7rem;
    margin-bottom: 15px;
}

.comments-section h3 {
    margin: 10px;
}

.comments-section > div:nth-child(1) {
    justify-content: space-between;

}

.comment {
    justify-content: space-between;
    align-items: flex-start;
    margin: 10px;
    padding: 10px;
    border-radius: 6px;
}

.user__content p {
    margin: 0;
}

@media all and (min-width : 1000px) {
    .post-details {
        padding: 0 70px 0 70px;
    }

    .user-details-container {
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 0;
    }

    .user-details {
        padding: 10px 0 0;
    }

    button {
        margin: 0;
    }

    .body {
        border-radius: 6px; 
        padding: 10px 20px 10px 20px;
    }

    .comments-section > div:nth-child(1) {
        margin: 10px;
    }
}

@media all and (min-width : 1200px) {

    .user-details {
        font-size: 1rem;
    }

    .body h1 {
        font-size: 2rem;
    }

    .comment p {
        font-size: 1.1rem;
    }
} 

@media all and (min-width : 1500px) {
    .body h1 {
        font-size: 2.2rem;
    }
}

</style>