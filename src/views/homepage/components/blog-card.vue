<template>
    <div class="blog-card">
        <h1> {{ item.title }} </h1>
        <p v-html="item.body">
        </p>
        <button @click="$router.push({ name : 'postDetails', params : { id : item.id } })">
            See More 
        </button>

        <p class="my-2"> Posted by : {{ item.user.name }} </p>
    </div>
</template>

<script>
export default {
    name : 'blogCard',

    props : {
        item : {
            type : Object,
            required : false
        }
    }
}
</script>

<style lang="scss" scoped>

.blog-card {
    background: gray;    
    border-radius: 10px;
    padding: 15px;
    margin: 0 15px 20px 10px;
}

p {
    line-height: 25px;
}

button {
    background-color: black;
    height: 30px;
    width: 100px;
    border-radius: 6px;
}

.see-more {
    text-decoration: none;
}

@media all and (min-width : 768px) {
    .blog-card {
        margin: 0 15px 30px 10px;
    }
}

@media all and (min-width : 1000px) {
    .blog-card {
        margin: 0 70px 30px 70px;
    }
}

</style>