<template>
    <div class="login-signup">
        <v-dialog persistent v-model="dialog" content-class="login-signup-dialog">
            <div class="dialog --grey-theme" v-if="showLogin">
                <div class="heading flex">
                    <h2 class="white-text">Login</h2>
                    <v-icon color="white" class="cursor" @click="closeSignupLoginForm">mdi-close</v-icon>
                </div>

                <div class="form">
                    <v-form ref="loginFormRef" @submit.prevent>
                        <div class="form-body">

                            <label class="white-text"> Email </label>
                            <v-text-field 
                                :rules="[rules.required, rules.validEmail]"
                                placeholder="E.g. abc@xyz.co.in"
                                outlined 
                                class="mt-1"
                                v-model="userDetails.email"
                                dense
                                background-color="white"/>

                            <label class="white-text"> Password </label>
                            <v-text-field 
                                :rules="[rules.required]"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                outlined 
                                v-model="userDetails.password"
                                class="mt-1"
                                dense
                                :type="!showPassword ? 'password' : 'text' "
                                background-color="white"/>
                            
                            <small class="white-text cursor bold" @click="showLogin = false">
                                Not a member? Signup here 
                                <v-icon small color="white">mdi-arrow-right</v-icon>
                            </small>
                        </div>

                        <div class="footer flex">
                            <button class="white-text submit-button" @click="loginUser">Login</button>
                        </div>
                    </v-form>
                </div>
            </div>

            <div class="dialog --grey-theme" v-if="!showLogin">
                <div class="heading flex">
                    <h2 class="white-text">
                        <v-icon color="white" 
                                class="cursor" 
                                title="Go back to Login"
                                @click="showLogin = true">mdi-arrow-left</v-icon>
                        Signup
                    </h2>
                    <v-icon color="white" class="cursor" @click="closeSignupLoginForm">mdi-close</v-icon>
                </div>

                <div class="form">
                    <v-form ref="signupFormRef" @submit.prevent>
                        <div class="form-body">
                            <label class="white-text"> Name </label>
                            <v-text-field 
                                :rules="[rules.required]"
                                placeholder="E.g. Neha Kumari"
                                outlined 
                                class="mt-1 input"
                                dense
                                background-color="white"
                                v-model="userDetails.name"/>

                            <label class="white-text"> Email </label>
                            <v-text-field 
                                :rules="[rules.required, rules.validEmail]"
                                placeholder="E.g. abc@xyz.co.in"
                                outlined 
                                class="mt-1 input"
                                dense
                                background-color="white"
                                v-model="userDetails.email"/>

                            <label class="white-text"> Password </label>
                            <v-text-field 
                                :rules="[rules.required, rules.validPassword]"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                outlined 
                                class="mt-1 input"
                                dense
                                :type="!showPassword ? 'password' : 'text' "
                                background-color="white"
                                v-model="userDetails.password"/>

                            <label class="white-text"> Confirm Password </label>
                            <v-text-field 
                                :rules="[rules.required, rules.validPassword]"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                outlined 
                                class="mt-1 input"
                                dense
                                :type="!showPassword ? 'password' : 'text' "
                                background-color="white"
                                v-model="userDetails.confirmedPassword"/>
                        </div>

                        <div class="footer flex">
                            <button 
                                class="white--text bold submit-button"
                                type="submit"
                                @click.prevent="signupUser">Signup</button>
                        </div>
                    </v-form>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import {eventBus} from '../../main';
import API_URLS from '../../helpers/api-urls'
import accessToken from '../../helpers/access-token';
import rules from '../../helpers/rules'
export default {
    name : 'loginSignupForm',

    data() {
        return {
            dialog : false,
            showPassword : false,
            showLogin : true,
            userDetails : {
                name : null,
                email : null,
                password : null,
                confirmedPassword : null
            },
            rules : rules,
            appliedRules : [],
        }
    },

    mounted() {
        eventBus.$on('openLoginSignupForm', () => this.dialog = true)
    },

    methods : {
        // CLOSE THE FORM AND SET THE INITIAL STATE
        closeSignupLoginForm() {
            this.dialog = false;
            setTimeout(() => {
                this.showLogin = true;
                this.userDetails = {
                    name : null,
                    email : null,
                    password : null,
                    confirmedPassword : null
                }
            }, 500);
        },

        // SIGNUP A USER
        signupUser() {
            const successHandler = response => {
                if(response.status === 201) {
                    accessToken.setCredentials(response.data.token, response.data.user.name, response.data.user.email)
                    this.closeSignupLoginForm();
                    this.showSnackBar();
                    this.setUserState(response.data.user.name, response.data.user.email);
                }
            }

            const errorHandler = error => {
                console.log(error.data);
            }

            const data = {
                name : this.userDetails.name,
                email : this.userDetails.email,
                password : this.userDetails.password,
                confirm_password : this.userDetails.confirmedPassword
            }
            
            const headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            }

            this.requestPOST(
                API_URLS.signUp,
                data,
                headers,
                successHandler,
                errorHandler
            )
        },

        // LOGIN A USER
        loginUser() {
            if(this.$refs.loginFormRef.validate()) {
                const successHandler = response => {
                    if(response.status === 200) {
                        accessToken.setCredentials(response.data.token, response.data.user.name, response.data.user.email)
                        this.closeSignupLoginForm();
                        this.showSnackBar();
                        this.setUserState(response.data.user.name, response.data.user.email);
                    }
                }

                const errorHandler = error => {
                    const snackBarData = {
                        textMessage : '',
                        timeOut : 10000,
                        color : 'error'
                    }

                    if(error.status !== 500)
                        snackBarData.textMessage = 'Invalid Credentials'
                    else
                        snackBarData.textMessage = `Something went wrong internally. Error code ${error.status}`
                    this.$store.dispatch('snackBar/setSnackBar', snackBarData);
                }

                const data = {
                    email : this.userDetails.email,
                    password : this.userDetails.password,
                }
                
                const headers = {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }

                this.requestPOST(
                    API_URLS.login,
                    data,
                    headers,
                    successHandler,
                    errorHandler
                )
            }
        },

        // SET USER STATE IN STORE
        setUserState(name, email) {
            const userData = {
                name : name,
                email : email
            }
            this.$store.dispatch('mainStore/setUserState', userData);
        },

        // SHOW SNACKBAR IN CASE OF SUCCESS OR ERROR IN LOGIN/SIGNUP
        showSnackBar() {
            const snackBarData = {
                textMessage : 'You are successfully signed in!',
                color : 'success',
                timeOut : 5000
            }
            this.$store.dispatch('snackBar/setSnackBar', snackBarData);
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('./common/styles.css');

.dialog {
    width: 100%;
    font-family: 'Baloo Bhai 2', cursive;
}

</style>

<style lang="scss">

.login-signup-dialog.v-dialog {
    width: 100%;
}

@media all and (min-width : 768px) {
    .login-signup-dialog.v-dialog {
        width: 60%;
    }
}

@media all and (min-width : 1200px) {
    .login-signup-dialog.v-dialog {
        width: 40%;
    }
}

</style>