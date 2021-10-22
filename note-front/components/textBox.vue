<template>
  <!-- area for creating notes -->
  <b-card
    @click.once="focus()"
    class="card border rounded shadow-sm mx-4"
    :style="{ backgroundColor: color }"
    style="fill:rgba(0,0,0,0.4)"
  >
    <b-card-text class="shadow-0">
      <!--textarea input -->
      <div class="d-flex flex-column">
        <b-input
          placeholder="Title"
          name="title"
          v-model="title"
          class="border-0 title"
        ></b-input>
        <b-form-textarea
          class="border-0"
          style="overflow:hidden"
          id="textarea-no-resize"
          placeholder="Type a note or create a To-Do list"
          rows="3"
          max-rows="8"
          v-model="notes"
        ></b-form-textarea>

        <div class="d-inline-flex  justify-content-between p-2">
          <v-swatches
            v-model="color"
            :swatches="swatches"
            row-length="3"
            show-border
            popover-y="left"
          >
            <span slot="trigger" class="icon lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-palette"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                />
                <path
                  d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"
                />
              </svg>
            </span>
          </v-swatches>

          <div class="m-1">
            <b-button
              variant="primary"
              :style="{
                display: notes != '' || title != '' ? 'block' : 'none'
              }"
              size="sm"
              @click="save()"
              >Save</b-button
            >
          </div>
        </div>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  data: () => ({
    title: "", //header title
    notes: "", //notes or todo's
    color: "", //color of the note
    swatches: [
      "#d7aefb",
      "#fdcfe8",
      "#e6c9a8",
      "#e8eaed",
      "#ccff90",
      "#a7ffeb",
      "#cbf0f8",
      "#aecbfa",
      "#fff475"
    ]
  }),
  methods: {
    async save() {
      //create note
      try {
        await this.$axios.post("/note", {
          note: this.notes,
          color: this.color,
          title: this.title,
          completed: false,
          user: this.$auth.user._id
        });

        this.$store.commit("note/addNote", {
          title: this.title,
          note: this.notes,
          color: this.color
        });

        this.notes = "";
        this.color = "";
        this.title = "";
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    focus() {
      document.querySelector(".title").focus();
    }
  }
};
</script>

<style lang="scss">
textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}

.title {
  font-size: 20px !important;
  font-weight: 500 !important;
  color: rgb(0, 0, 0) !important;
  background-color: transparent;
}

#textarea-no-resize {
  font-size: 16px !important;
  background-color: transparent;
}
</style>
