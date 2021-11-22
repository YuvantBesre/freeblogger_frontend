import accessToken from "../../helpers/access-token"

const state = {
    user : {
        isLoggedIn : false,
        name : null,
        email : null
    }
}

const mutations = {
    SET_USER_STATE(state, value) {
        state.user.isLoggedIn = true;
        state.user.name = value.name;
        state.user.email = value.email;
    },

    REMOVE_USER_STATE(state) {
        state.user.isLoggedIn = false;
        state.user.name = null;
        state.user.email = null;
    }
}

const actions = {
    setUserState({commit}, data) {
        commit('SET_USER_STATE', data);
    },

    logoutUser({commit, dispatch}) {
        accessToken.removeCredentials();
        commit('REMOVE_USER_STATE');

        const snackBarData = {
            textMessage : 'You have successfully logged out!',
            color : 'success',
            timeOut : 5000
        }
        dispatch('snackBar/setSnackBar', snackBarData, {root : true});
    }
}

const getters = {
    GET_USER_DETAILS : state => state.user
}

export default { 
    namespaced : true,
    state,
    mutations,
    actions,
    getters
}