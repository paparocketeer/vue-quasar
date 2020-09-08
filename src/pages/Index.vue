<template>
  <q-page class="flex justify-center">
    <q-form @submit="onSubmit" @reset="onReset" class="no-wrap q-pa-md">
        <div class="q-gutter-md row">
          <q-input v-model="search" filled type="search" label="Destination">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-input
          class="checkdate"
            filled
            v-model="checkinDate"
            mask="date"
            :rules="['date']"
            label="Check-in"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="checkinDate">
                    <div class="">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
          class="checkdate"
            filled
            v-model="checkoutDate"
            mask="date"
            :rules="['date']"
            label="Check-out"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="checkoutDate">
                    <div class="">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            ref="adults"
            class="numeric"
            filled
            type="number"
            v-model="adults"
            label="Adults *"
            lazy-rules
            :rules="[
              val => (val !== null && val !== '') || 'Please type your age',
              val => (val > 0 && val < 100) || 'Please type a real age'
            ]"
          />

          <q-input
            ref="children"
            class="numeric"
            filled
            type="number"
            v-model="children"
            label="Children *"
            lazy-rules
            :rules="[
              val => (val !== null && val !== '') || 'Please type your age',
              val => (val > 0 && val < 100) || 'Please type a real age'
            ]"
          />

          <q-btn label="Submit" type="submit" color="primary" />
          <!-- <q-btn :loading="loading" type="submit" color="primary" @click="simulateProgress(4)" style="width: 150px">
      Button
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Loading...
      </template>
    </q-btn> -->
        </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      name: null,
      age: null,
      accept: false,
      password: "",
      isPwd: true,
      loading: false,
      email: "",
      search: "",
      tel: "",
      url: "",
      time: "",
      checkinDate: "",
      checkoutDate: "",
      adults: null,
      children: null
    };
  },

  methods: {
    simulateProgress (number) {
      // we set loading state
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 3000)
    },
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>

<style lang="scss">
.numeric{
  max-width: 120px;
}
.checkdate{
  max-width: 200px;
}
</style>
