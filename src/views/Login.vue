<template>
  <v-app>
    <v-main>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Email"
                      :rules="emailRules"
                      v-model="email"
                      prepend-icon="mdi-account"
                      type="email"
                    ></v-text-field>

                    <v-text-field v-model="pw" label="pw" prepend-icon="mdi-lock" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" :disabled="!valid" depressed @click="login">LOGIN</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    pw: "",
    pwRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
  }),
  methods: {
    login() {
      this.$store.dispatch("auth/loginUser", {
        email: this.email,
        password: this.pw,
      }).then(
          this.$router.push({name: "Notes"})
      ).catch((e) => alert(e));
    },
  },
};
</script>