<template>
  <b-card
    class="panel panel-default border rounded m-2 pb-0 "
    :class="[show ? 'shadow-sm' : 'shadow-0']"
    :style="{ backgroundColor: note.color, cursor: show ? 'pointer' : '' }"
    @mouseover="show = true"
    @mouseleave="show = false"
     >
    <transition name="fade">
      <b-button v-if="show" type="button" class="close" aria-label="Close">
        <b-icon-check-circle></b-icon-check-circle>
      </b-button>
    </transition>
    <b-card-title @click="showModal(note)">{{ note.title }}</b-card-title>
    <b-card-text class="panel-body" @click="showModal(note)"
>
      {{
        note.note.length > 700 ? note.note.substring(0, 650) + "..." : note.note
      }}
    </b-card-text>
    <transition name="fade">
      <div
        :style="{ visibility: show ? 'visible' : 'hidden' }"
        class="d-flex align-self-baseline p-2 justify-content-start footer"
      >
        <div class="m-1 footer-icon rounded-circle text-center">
          <a href="">
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
          </a>
        </div>
        <div class="m-1 footer-icon rounded-circle text-center">
          <a href="#" @click="trash()">
            <b-icon-trash></b-icon-trash>
          </a>
        </div>
      </div>
    </transition>
  </b-card>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  methods:{
    showModal(note){
      this.$store.commit('note/setModal',{
        editingNote:note,
        editing:true
      })
    },

    async trash(){
      try{
        await this.$axios.delete('/notes/'+this.note._id)
        this.$store.commit('note/deleteNote', this.note._id);
      }catch(err){
        console.log(err);
      }
    }
  },
  props: {
    note: Object
  }
};
</script>

<style lang="scss" scoped>
/* demo only* */

.panel {
  display: inline-block;
  max-width: 250px;
  min-width: 250px;
}

.card-body {
  padding-bottom: 0 !important;
}

.footer {
  visibility: hidden;
  .footer-icon {
    width: 30px;
    height: 30px;
    padding: 3px !important;
    cursor: pointer;

    a {
      color: #8d8d96 !important;
    }
  }

  .footer-icon:hover {
    background-color: rgba(95, 99, 104, 0.157);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
