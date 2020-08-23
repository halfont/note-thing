<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <p v-if="!loggedIn">
          <router-link to="/register">Register</router-link> |
          <router-link v-if="!loggedIn" to="/login">Login</router-link>
        </p>
        <p v-if="loggedIn">
          <!-- <router-link to="/">Notes</router-link> | -->
          <v-btn class="logout" @click="logout">Logout</v-btn>
        </p>
      </div>
      <h1>Welcome to the post board</h1>
      <router-view />
    </div>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({ loggedIn: "auth/loggedIn" }),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logoutUser");     
      this.$route.name === "Login" || this.$router.push({name: "Login"})
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 5px 0 5px;
  margin: 50 auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.logout {
  float: left;
}
</style>
