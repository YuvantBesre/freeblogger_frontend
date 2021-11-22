const state = {
    snackBar : {
        show : false,
        color : 'success',
        textMessage : '',
        timeOut : 5000,
    }
}

const mutations = {
    SHOW_MESSAGE(state, value) {
        state.snackBar.show = true;
        state.snackBar.color = value.color;
        state.snackBar.textMessage = value.textMessage;
        state.snackBar.timeOut = value.timeOut;
    },

    CLOSE_SNACK_BAR(state) {
      state.snackBar.show = false;
      state.snackBar.color = 'success';
      state.snackBar.textMessage = '';  
      state.snackBar.timeOut = 5000;
    }
}

const actions = {
    setSnackBar({commit}, data) {
        console.log('I am here', data);
        commit('SHOW_MESSAGE', data);
    }
}

const getters = {
    GET_SNACKBAR : state => state.snackBar
}

export default { 
    namespaced : true,
    state,
    mutations,
    actions,
    getters
}