<template>
  <v-app>
    <div id="app">
      <router-view />

      <!-- SNACKBAR TOAST -->
        <v-snackbar
          app
          v-model="snackBar.show" 
          :color="snackBar.color" 
          top
          :timeout="snackBar.timeOut"
          >
          {{ snackBar.textMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="closeSnackBar"> Close </v-btn>
          </template>
        </v-snackbar>
        </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  computed : {
    snackBar() {
      return this.$store.getters['snackBar/GET_SNACKBAR'];
    }
  },

  methods : {
    closeSnackBar() {
      this.$store.commit('snackBar/CLOSE_SNACK_BAR');
    },
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2&display=swap');
@import url('helpers/CSS/styles.css');

#app {
  background: #333;
  width: 100%;
  height: 100%;
  font-family: 'Baloo Bhai 2', cursive;
  color: white;
}

</style>
