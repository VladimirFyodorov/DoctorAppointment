<template>
  <div class="box">
    <div
      class="item"
      v-for="{ value } in adressSuggestions"
      :key="value"
      @click="() => onClick(value)"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TheFormAdress",
  computed: {
    ...mapState(["formData", "adressSuggestions"]),
  },
  methods: {
    ...mapMutations(["setAdressSuggestions"]),
    onClick(adress) {
      this.setAdressSuggestions([]);
      this.formData.adress = adress;
    },
  },
};
</script>

<style scoped>
div.item {
  width: 100%;
  height: 30px;
  text-align: left;
  cursor: pointer;

  color: rgba(113, 113, 113, 1);
}

div.item:hover {
  margin-left: -20px;
  padding-left: 20px;
  margin-right: -20px;
  padding-right: 20px;
  background-color: rgba(220, 220, 220, 1);
}

div.box {
  margin-left: -20px;
  padding-left: 20px;
  margin-right: -20px;
  padding-right: 20px;
  background-color: rgb(248, 248, 248);
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  margin-bottom: -320px;
}
</style>
