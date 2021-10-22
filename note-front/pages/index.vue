<template>
  <div class="container  mt-5">
    <!--vertical align on parent using my-auto-->
    <div class="d-flex flex-column justify-content-center\">
      <div class="header m-3">
        <h2 class="text-muted">NoteOne</h2>
        <div class="d-flex justify-content-between">
          <p>Welcome {{ loggedInUser.username }}</p>
          <div>
            <b-button variant="primary" size="sm" @click="logout"
              >Logout</b-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <TextBox />
        <notes />
        <edit/>
      </div>
    </div>
  </div>
</template>

<script>
import notes from "../components/notes.vue";
import { mapGetters } from "vuex";
import Edit from '../components/edit.vue';

export default {
  middleware: "auth",
  components: { notes, Edit },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  data: () => ({}),

  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
