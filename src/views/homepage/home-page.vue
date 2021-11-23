<template>
    <div class="home-page">
        <div class="--align" v-if="!postList.length">
            <v-skeleton-loader
                v-for="(i, index) in 3"
                :key="index % 3"
                class="skeletons my-6 px-3 py-3"
                type="paragraph,button,text"
                dark
                elevation="5"
            ></v-skeleton-loader>
        </div>
        <div v-else>
            <blog-card v-for="(post, index) in truncatedPostList" :key="index" :item="post" />
            <div class="text-center" v-if="postList.length && nextPageValue">
                <small class="white-text" v-intersect="onIntersect">
                    Loading more blogs
                    <v-progress-circular class="ml-2" indeterminate size="13" width="2"></v-progress-circular>
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import API_URL from "../../helpers/api-urls";
import blogCard from "./components/blog-card.vue";
import { eventBus } from '../../main';
import accessToken from '../../helpers/access-token';
export default {
    name : 'homepage',

    data() {
        return {
            postList : [],
            page : 1,
            nextPageValue : null
        }
    },

    computed : {
        truncatedPostList() {
            const truncatedPostList = this.postList.map(post => {
                if(post.body && post.body.length > 500)
                    post.body = post.body.substring(0, 500) + '...'
                return post;
            })
            return truncatedPostList
        }
    },

    created() {
        this.getPostList();
    },

    mounted() {
        eventBus.$on('refreshPostList', () => this.getPostList());
    },

    methods : {
        getPostList(type = 'new') {
            const successHandler = response => {
                if(response.status === 200) {
                    if(type === 'append')
                        this.postList.push(...response.data.data);
                    else
                        this.postList = response.data.data;
                    
                    this.nextPageValue = response.data.next_page_url;
                }
            }

            const errorHandler = error => {
                console.log(error.data);
            }

            const data = {
                page : this.page
            }

            this.requestGET(
                API_URL.posts,
                data,
                {},
                successHandler,
                errorHandler
            )
        },

        onIntersect(entries, observer) {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    this.page += 1;
                    if(this.nextPageValue)
                        this.getPostList('append');
                }
            })
        }
    },

    components : {
        'blog-card' : blogCard
    }
}
</script>

<style lang="scss" scoped>

.home-page {
    padding: 30px 0;
}
</style>