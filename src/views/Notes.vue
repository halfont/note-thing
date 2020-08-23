<template>
  <v-container>
    <v-btn class="flBtn" color="primary" dark absolute right fab @click="newdialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <noteModal :dialog.sync="dialog"></noteModal>
    <v-row :class="'sm'">
      <v-col cols="12" sm="6" md="4" v-for="(k,i) in allNotes" :key="k.date">
        <Note :author="k['author']" :content="k['context']" :date="i"></Note>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Note from "@/components/Note.vue";
import noteModal from "@/components/NoteModal.vue";
import {mapGetters} from 'vuex'

export default {
  name: "Notes",
  components: {
    noteModal,
    Note,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({allNotes: 'notes/allNotes'})
  },
  methods: {

    newdialog() {
      this.dialog = true;
    }
  }
};
</script>

<style>
.flBtn {
  top: 0;
  position: absolute;
  margin: 20px 0 16px 16px;
}
</style>