export default  {

  state:() => ({
    notes:[],
    modal:{
      editing:false,
      editingNote:{}
    }
  }),

  mutations:{
   setNotes: (state, payload) => {
    state.notes = payload
   },

   addNote: (state, payload) =>{
     state.notes = [...state.notes, payload]
   },

   deleteNote: (state, payload) =>{
    var index = state.notes.findIndex(note => note._id == payload)
    state.notes.splice(index, 1)
   },

   updateNote: (state, payload) =>{
      var index = state.notes.findIndex(note => note._id == payload._id);
      state.notes.splice(index, 1, payload)
   },

   setModal:(state, payload) =>{
     state.modal.editing = payload.editing,
     state.modal.editingNote = payload.editingNote

   }
  },

  getters: {
  getNotes(state)  {
    return state.notes
  },

  getModal(state){
    return state.modal
  }

},
}
