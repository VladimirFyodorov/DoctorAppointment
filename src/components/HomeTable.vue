<template>
  <div class="box">
    <h5 class="item">Patient: {{ fio }}</h5>
    <h5 class="item">Age: {{ formData.age }}</h5>
    <h5 class="item">Email: {{ formData.email }}</h5>
    <h5 class="item">At: {{ date }} {{ formData.appointmentTime }}</h5>
    <h5 class="item">Adress: {{ adress }}</h5>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CyrillicToTranslit from "cyrillic-to-translit-js";
export default {
  name: "HomeTable",
  computed: {
    ...mapState(["formData"]),
    fio() {
      const cyrillicToTranslit = new CyrillicToTranslit();
      return cyrillicToTranslit.transform(this.formData.fio);
    },
    date() {
      return new Date(this.formData.appointmentDate)
        .toLocaleDateString("en-GB")
        .replaceAll("/", "-");
    },
    adress() {
      const cyrillicToTranslit = new CyrillicToTranslit();
      return cyrillicToTranslit.transform(this.formData.adress);
    },
  },
};
</script>

<style scoped>
div.box {
  margin-left: 8vw;
  width: 423px;
  height: 300px;
  margin-top: 10vh;
  padding: 50px;
  border-radius: 4px;
  box-shadow: 2px 6px 20px 2px rgba(0, 0, 0, 0.15);
}

h5.item {
  text-align: left;
  color: rgba(113, 113, 113, 1);
}
</style>
