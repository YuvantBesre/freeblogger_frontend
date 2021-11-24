<template>
    <div class="navigation-bar flex --align">
        <div class="logo-section">
            <router-link to="/">
                <img class="cursor" src="@/assets/Logo.png" alt="">
            </router-link>
        </div>

        
        <div class="for-mobile">
            <button class="--grey-theme" @click="checkAction(buttonString)" v-if="!showMenu"> {{ buttonString }} </button>
            <div class="text-right" v-if="showMenu">
                <v-icon color="white" size="40" class="cursor" @click.native="drawer = !drawer">mdi-menu</v-icon>
                <v-navigation-drawer
                    app
                    color="grey"
                    absolute
                    temporary
                    v-model="drawer">
                        <div class="avatar__email text-center pt-3">
                            <v-avatar color="black"> {{ initials }} </v-avatar>
                                <p class="my-1"> {{ user.email }} </p>
                                <hr class="white-text">
                        </div>

                        <v-list-item 
                            link 
                            class="white--text mt-3 mx-2" 
                            style="border-radius : 6px; justify-content : center; background : black;"
                            @click="checkAction('Create Post')"
                            >
                            + Create Post
                        </v-list-item>

                        <template v-slot:append>
                            <div class="pa-2">
                                <v-btn block color="black" class="white--text" @click="logoutUser">
                                    Logout
                                </v-btn>
                            </div>
                        </template>
                </v-navigation-drawer>
            </div>
        </div>

        <div class="login__signup flex">
            <button class="--grey-theme" @click="checkAction(buttonString)"> {{ buttonString }} </button>
            <div class="menu" v-if="showMenu">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <button
                            class="text-right"
                            v-bind="attrs"
                            v-on="on">
                        Hi {{ firstName }} 
                        <v-icon color="white">mdi-chevron-down</v-icon>
                        </button>
                    </template>
                    <div class="--grey-theme text-center menu-items">
                        <v-avatar color="black"> {{ initials }} </v-avatar>
                        <p class="my-1"> {{ user.email }} </p>
                        <hr class="white-text">
                        <v-list-item link class="white--text" style="justify-content : center;" @click="logoutUser">
                            Logout
                        </v-list-item>
                    </div>
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script>
import {eventBus} from '@/main';
import accessToken from '../../helpers/access-token';
export default {
    name : 'navigationBar',

    data() {
        return {
            buttonString : 'Login/Signup',
            showMenu : false,
            drawer : null
        }
    },

    computed : {
        user() {
            return this.$store.getters['mainStore/GET_USER_DETAILS'];
        },

        firstName() {
            return this.user.name.split(" ")[0];
        },

        initials() {
            var names = this.user.name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
            
            if (names.length > 1) {
                initials += names[names.length - 1].substring(0, 1).toUpperCase();
            }
            return initials;
        },
    },

    watch : {
        'user.isLoggedIn' : function(value) {
            if(value) {
                this.buttonString = '+ Create Post';
                this.showMenu = true;
            }
            else {
                this.buttonString = 'Login/Signup';
                this.showMenu = false;
            }
        }
    },

    created() {
        if(accessToken.getAccessToken()) {
            const userData = {
                name : localStorage.getItem('name'),
                email : localStorage.getItem('email')
            }
            this.$store.dispatch('mainStore/setUserState', userData);
        }
    },

    methods : {
        checkAction(string) {
            if(string === 'Login/Signup')
                eventBus.$emit('openLoginSignupForm');
            else
                eventBus.$emit('openCreatePostForm')
        },

        logoutUser() {
            this.$store.dispatch('mainStore/logoutUser');
        }
    }
}
</script>

<style lang="scss" scoped>

.navigation-bar {
    justify-content: space-between;
    align-items: flex-start;
    background: black;  
    padding-top: 15px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo-section img{
    width: 150px;
    height: 60px;
}

button {
    width: 120px;
    height: 40px;
    border-radius: 7px;
    padding: 0 5px;
}

.login__signup {
    display: none;
}

.menu {
    display: none;
}

.menu-items {
    padding: 10px;
}

@media all and (min-width : 768px) {
    .for-mobile {
        display: none;
    }

    .login__signup {
        display: flex;
        width: 50%;
        justify-content: flex-end;
    }

    .menu {
        display: flex;
    }
}

@media all and (min-width : 1000px) {
    button {
        width: 150px;
        height: 50px;
        font-size: 1.2rem;
    }
}

</style>