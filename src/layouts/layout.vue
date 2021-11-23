<template>
    <div class="layout">
        <navigation-bar />
        <router-view :key="$route.fullPath"/>
        <login-signup-form />
        <create-blog /> 
        <foot v-if="$route.name !== 'home'" />
    </div>
</template>

<script>
import navigationBar from "./components/navigation-bar.vue";
import loginSignupForm from "../views/Master/login-signup-form.vue";
import createBlog from "../views/Master/create-blog.vue";
import foot from './components/foot.vue';
export default {
    name : 'layout',

    components : {
        'navigation-bar' : navigationBar,
        'login-signup-form' : loginSignupForm,
        'create-blog' : createBlog,
        'foot' : foot
    }
}
</script>

<style lang="scss">
.v-messages__message {
    color: red !important;
}

.layout {
    height: 100%;
}
</style>