<template>
  <div>
    <noteModal 
      :mode="'edit'" 
      :dialog.sync=dialog
      :context = content
      :author = author
      :date = date
      >
    </noteModal>

    <v-card class="mx-auto" max-width="600" raised>
      <v-list-item three-line>
        <v-list-item-content>
          <v-card-text>
            <div>
              <v-textarea
                outlined
                :disabled=true
                name="input-7-4"
                :label=label()
                :value=contentString()
              ></v-textarea>
            </div>
          </v-card-text>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn text @click="del" >Delete</v-btn>
        <v-btn text @click="edit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import noteModal from '@/components/NoteModal.vue'

export default {
  name: "Note",
  data: () => ({
    dialog: false,
  }),
  components: {
    noteModal
  },
  props: {
    author: String,
    content: String,
    date: String,
    ellipsis: {
      type: Number,
      default: 70
    }
  },
  methods: {
    del() {
      this.$store.dispatch("notes/delNote", this.date);
    },
    edit() {
      this.dialog = true
    },
    contentString() {
      return this.content.length > this.ellipsis ? `${this.content.substring(0, this.ellipsis)}...` : this.content;
    },
    dateconv(i){
      let d = new Date(i*1)
      return d;
    },
    label() {
      return this.author + ' ' + this.dateconv(this.date)
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
