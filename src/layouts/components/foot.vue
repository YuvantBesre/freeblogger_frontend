<template>
    <div class="foot flex">
        <div class="flex links">
            <v-icon v-for="link in links" :key="link.icon" color="white" class="cursor mx-2 my-1" size="35" @click="goTo(link.url)">
                {{ link.icon }}
            </v-icon>
        </div>
        <div>
            {{ new Date().getFullYear() }} Free Blogger. All Rights Reserved.
        </div>
    </div>
</template>

<script>
export default {
    name : 'foot',

    data() {
        return {
            links : [
                {
                    icon : 'mdi-linkedin',
                    url : 'https://www.linkedin.com/in/yuvantbesre/'
                },
                {
                    icon : 'mdi-github',
                    url : 'https://github.com/YuvantBesre/freeblogger_frontend'
                }
            ]
        }
    },

    methods : {
        goTo(URL) {
            window.open(URL);
        }
    }
}
</script>

<style scoped lang="scss">

.foot {
    background-color: black;
    padding: 20px 0;
    flex-direction: column;
    justify-content: center;
}

</style>