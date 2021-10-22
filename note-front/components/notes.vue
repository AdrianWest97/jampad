<template>
  <div class="masonry-container my-5 mx-3">
    <div v-masonry transition-duration=".3s" item-selector=".item">
      <div v-for="(note, index) in notes" :key="index">
        <single-note :note="note" v-masonry-tile class="item" />
      </div>
    </div>
  </div>
</template>

<script>
import singleNote from "./singleNote.vue";
import { mapGetters } from "vuex";
export default {
  components: { singleNote },
  async mounted() {
    //load notes
    try {
      let result = await this.$axios.get("/notes");
      this.$store.commit("note/setNotes", result.data.notes);
    } catch (err) {
      console.log(err);
    }
  },

  computed: {
    ...mapGetters({
      notes: "note/getNotes"
    })
  }
};
</script>

<style scoped lang="scss" scoped></style>
