<template>
  <div class="form">
    <h1>Запись к врачу</h1>

    <h5 class="input-hint">Ф.И.О.</h5>
    <input
      :class="error.fio ? 'withError' : ''"
      v-model="formData.fio"
      @blur="validateFio"
    />

    <h5 class="input-hint">Возраст</h5>
    <input
      :class="error.age ? 'withError' : ''"
      v-model="formData.age"
      @blur="validateAge"
    />

    <h5 class="input-hint">Email</h5>
    <input
      :class="error.email ? 'withError' : ''"
      v-model="formData.email"
      @blur="validateEmail"
    />

    <h5 class="input-hint">Дата записи</h5>
    <input
      type="date"
      :class="error.date ? 'withError' : ''"
      v-model="formData.appointmentDate"
      @blur="validateDate"
    />

    <h5 class="input-hint">Время</h5>
    <select
      :class="error.time ? 'withError' : ''"
      v-model="formData.appointmentTime"
      @blur="validateTime"
    >
      <option v-for="time in timeIntervals" :key="time" :value="time">
        {{ time }}
      </option>
    </select>

    <h5 class="input-hint">Город проживания + улица</h5>
    <input
      :class="error.adress ? 'withError' : ''"
      v-model="formData.adress"
      @input="setSuggestions"
      @blur="validateAdress"
    />
    <TheFormAdress v-if="adressSuggestions.length > 0" />

    <button @click="onSubmit">Записаться</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Service from "../service";
import TheFormAdress from "./TheFormAdress.vue";
export default {
  name: "TheForm",
  components: { TheFormAdress },
  data() {
    return {
      error: {
        fio: false,
        age: false,
        email: false,
        date: false,
        time: false,
        adress: false,
      },
    };
  },
  computed: {
    ...mapState(["formData", "adressSuggestions"]),
    timeIntervals() {
      const arr = [...Array(9).keys()].map((num) => {
        const params = { minimumIntegerDigits: 2 };
        const minTime = (num + 9).toLocaleString("en-US", params);
        const maxTime = (num + 10).toLocaleString("en-US", params);
        return `${minTime}:00-${maxTime}:00`;
      });
      return arr;
    },
  },
  methods: {
    ...mapMutations(["setAdressSuggestions"]),
    onSubmit() {
      this.validateFio();
      this.validateAge();
      this.validateEmail();
      this.validateDate();
      this.validateTime();
      this.validateAdress();
      let msg = "";
      for (const [key, value] of Object.entries(this.error)) {
        msg += value ? `${key} is not valid \n` : "";
      }

      if (msg) {
        alert(msg);
      } else {
        this.$router.push("home");
      }
    },
    async setSuggestions() {
      const adress = this.formData.adress;
      const res = await new Service().getAdressSuggestions(adress);
      this.setAdressSuggestions(res.suggestions);
    },
    validateFio() {
      const isValid = this.formData.fio.split(" ").length >= 2;
      this.error.fio = isValid ? false : true;
    },
    validateAge() {
      const age = this.formData.age;
      const isValid = age > 0 && age <= 150;
      this.error.age = isValid ? false : true;
    },
    validateEmail() {
      const email = this.formData.email;
      const isValid = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email);
      this.error.email = isValid ? false : true;
    },
    validateDate() {
      Date.prototype.withoutTime = function () {
        const d = new Date(this);
        d.setHours(0, 0, 0, 0);
        return d;
      };

      const strDate = this.formData.appointmentDate;
      const date = new Date(Date.parse(strDate)).withoutTime();
      const minDate = new Date().withoutTime();
      const maxDate = new Date().withoutTime();
      maxDate.setMonth(maxDate.getMonth() + 1);
      const isValid = date >= minDate && date <= maxDate;
      this.error.date = isValid ? false : true;
    },
    validateTime() {
      const time = this.formData.appointmentTime;
      this.error.time = time ? false : true;
    },
    validateAdress() {
      const adress = this.formData.adress;
      this.error.adress = adress ? false : true;
    },
  },
};
</script>

<style scoped>
div.form {
  margin-left: 42vw;
  width: 423px;
  height: 600px;
  margin-top: 10vh;
  padding: 50px;
  border-radius: 4px;
  box-shadow: 2px 6px 20px 2px rgba(0, 0, 0, 0.15);
}

h5.input-hint {
  text-align: left;
  color: rgba(113, 113, 113, 1);
  margin-bottom: 10px;
}

h5.errorMsg {
  margin-bottom: -18px;
}

input,
select {
  width: 100%;
  border-width: 0px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(220, 220, 220, 1);
  height: 30px;
  outline: none;
}

input:focus {
  border-bottom-width: 2px;
  border-bottom-color: rgba(49, 139, 222, 1);
  background-color: white;
}

.withError {
  border-bottom-color: red;
}

button {
  width: 200px;
  height: 30px;
  font-size: 14px;
  font-weight: normal;
  color: white;
  background-color: rgba(49, 139, 222, 1);
  margin-top: 22px;
  margin-left: 223px;
  border-width: 0px;
  border-radius: 6px;

  cursor: pointer;
}
</style>
