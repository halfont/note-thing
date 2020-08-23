<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-form @submit.prevent="postnote" ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">{{title()}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="formauthor"
              :counter="10"
              :rules="nameRules"
              label="Author Name"
              required
            ></v-text-field>
            <v-container fluid>
              <v-textarea
                counter
                v-model="formcontext"
                :rules="contextRules"
                label="What do you want to post?"
                required
              ></v-textarea>
            </v-container>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
          <v-btn color="blue darken-1" text type="submit">Post</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
export default {
  name: "noteModal",
  data: () => ({
    valid: true,
    formcontext: "",
    formauthor: "",
    nameRules: [
      (v) => !!v || "Author is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    contextRules: [
      (v) => !!v || "Context is required",
      (v) =>
        (v && v.length <= 500) || "Context must be less than 500 characters",
    ],
  }),
  props: {
    dialog: Boolean,
    mode: {
      type: String,
      default: "new",
    },
    context: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
  },
  created() {
    this.formcontext = this.context;
    this.formauthor = this.author;
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    cancel() {
      this.$refs.form.reset();
      this.$emit("update:dialog", false);
    },
    postnote() {
      if (this.mode == "new") {
        this.$store.dispatch("notes/addNote", {
          context: this.formcontext,
          author: this.formauthor,
        });
      } else {
        this.$store.dispatch("notes/editNote", {
          context: this.formcontext,
          author: this.formauthor,
          date: this.date,
        });
      }
      this.$emit("update:dialog", false);
    },
    title() {
      return this.mode == "new" ? "New Note" : "Edit Note";
    },
  },
};
</script>
