import { createStore } from "vuex";

export default createStore({
  state: {
    formData: {
      fio: "",
      age: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      adress: "",
    },
    adressSuggestions: [],
  },
  getters: {},
  mutations: {
    setAdressSuggestions(state, suggestions) {
      state.adressSuggestions = suggestions;
    },
  },
  actions: {},
  modules: {},
});
