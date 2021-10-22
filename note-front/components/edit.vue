<template>
  <div v-if="modal.editing">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.self="save()">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div
              class="modal-content"
              :style="{ backgroundColor: modal.editingNote.color }"
            >
              <div class="modal-header border-0">
                <b-input
                  placeholder="Title"
                  name="title"
                  :value="modal.editingNote.title"
                  id="title"
                  class="border-0 title"
                ></b-input>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" @click="close()">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <b-form-textarea
                  class="border-0 edited-title"
                  style="overflow:auto"
                  id="textarea-no-resize"
                  placeholder="Type a note or create a To-Do list"
                  rows="5"
                  max-rows="20"
                  :value="modal.editingNote.note"
                ></b-form-textarea>
              </div>
              <div class="modal-footer d-flex justify-content-between">
                <div class="d-flex justify-content-start">
                  <a href="" class="p-2"> <b-icon-trash></b-icon-trash> </a>
                  <!-- <a href="" class="p-1">
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
                  </a> -->
                </div>
                <div class="d-flex justify-content-start">
                      <b-button-group size="sm">
                  <b-button variant="" @click="save()">Save</b-button>
                      </b-button-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      modal: "note/getModal"
    })
  },

  data: () => ({
    show: false
  }),

  methods: {
    close() {
      this.$store.commit("note/setModal", {
        editingNote: {},
        editing: false
      });
    },

    async save() {

      try{
      let title = document.querySelector("#title").value;
      let note = document.querySelector(".edited-title").value;

      await this.$axios.put('/notes/'+this.modal.editingNote._id, {
        note:note,
        title:title,
        color:this.modal.editingNote.color
      })

      this.$store.commit('note/updateNote', {
        _id: this.modal.editingNote._id,
        note:note,
        title:title
      })
      this.close();
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style>
.note-text {
  word-break: break-all;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
