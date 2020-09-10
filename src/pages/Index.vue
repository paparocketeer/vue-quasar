<template>
  <div class="row">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="index-form row justify-center q-pa-lg"
    >
      <q-select
        filled
        v-model="search"
        behavior="menu"
        use-input
        option-value="id"
        option-label="name"
        :options="destinations"
        @filter="filterFn"
        :rules="[
          val => (val !== null && val !== '') || 'Please choose destination'
        ]"
        label="Destination"
        style="width: 250px; padding-bottom: 20px;"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        class="checkdate"
        filled
        v-model="checkinDate"
        mask="date"
        label="Check-in"
        :rules="[val => !!val || 'Check-in date is required']"
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
        :rules="[val => !!val || 'Check-out date is required']"
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
          val => (val !== null && val !== '') || 'Please type adults number',
          val => val > 0 || 'Adults number should be more then 0',
          val => val < 10 || 'Adults number should be lower then 10'
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
          val => (val !== null && val !== '') || 'Please type children number',
          val => (val >= 0 && val < 10) || 'Children number should be lower then 10'
        ]"
      />

      <q-btn
        label="Search"
        type="submit"
        color="primary"
        style="margin-bottom: 20px;width: 100px;"
      />
      <!-- <q-btn :loading="loading" type="submit" color="primary" @click="simulateProgress(4)" style="width: 150px">
      Button
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Loading...
      </template>
    </q-btn> -->
    </q-form>
    <div class="index-text q-py-lg">
      <p class="header">Travel With <span>Travolta</span></p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste est odit
        id laboriosam nulla quasi consectetur! Officia optio quasi tenetur
        saepe. Molestias possimus quia, consequuntur minus quas hic minima
        accusantium. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Iste est odit id laboriosam nulla quasi consectetur! Officia optio quasi
        tenetur saepe. Molestias possimus quia, consequuntur minus quas hic
        minima accusantium. Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Iste est odit id laboriosam nulla quasi consectetur! Officia optio
        quasi tenetur saepe. Molestias possimus quia, consequuntur minus quas
        hic minima accusantium.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      destinations: [],
      search: "",
      checkinDate: "",
      checkoutDate: "",
      adults: null,
      children: null,
      loading: true
    };
  },
  // created() {
  //   fetch(process.env.API_DEST)
  //     .then(resp => resp.json())
  //     .then(json => {
  //       this.destinations = json;
  //     });
  // },
  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        fetch(process.env.API_DEST)
          .then(resp => resp.json())
          .then(json => {
            this.destinations = json.filter(
              v => v.name.toLowerCase().indexOf(needle) > -1
            );
            this.loading = false
          });
      });
    },
    onSubmit() {
      let criteria = [this.search.name, this.checkinDate, this.checkoutDate, this.adults, this.children]
      localStorage.setItem("criteria", JSON.stringify(criteria));
      // this.$router.push({name : "results", params: { destination: this.search.name }})
      this.$router.push({name : "results" })
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>
