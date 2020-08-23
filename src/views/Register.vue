<template>
  <v-card class="mx-auto" max-width="500">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              placeholder="you@your_email_service_domain.com"
            ></v-text-field>
            <span
              class="caption grey--text text--darken-1"
            >This is the email you will use to login to your Post board account</span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field v-model="pw" :rules="pwRules" label="Password" type="password"></v-text-field>
            <v-text-field
              :rules=" [validatePw]"
              v-model="confrm_pw"
              label="Confirm Password"
              type="password"
            ></v-text-field>
            <span class="caption grey--text text--darken-1">Please enter a password for your account</span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img class="mb-4" contain height="128" src="@/assets/puppy.jpg"></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to the Post Board</h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" depressed @click="nextStepLogic">Next</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    step: 1,
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
    confrm_pw: "",
    // confrm_pwRules: [(v) => v === this.pw || "Password must match"],
    // confrm_pwRules: [validatePw],
    valid: true,
  }),
  methods: {
    nextStepLogic() {
      this.step++;
      if (this.step === 4) {
        this.$store.dispatch("auth/newUser", {
          email: this.email,
          password: this.pw,
        });
        this.$router.push({ name: "Notes" });
      }
    },
    validatePw() {
      if (this.pw !== this.confrm_pw) return "passwords must match";
      return true;
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    },
  },
};
</script>