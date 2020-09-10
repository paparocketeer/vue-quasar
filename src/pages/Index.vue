<template>
  <div class="row">
    <q-form @submit="onSubmit" class="index-form row justify-center q-pa-lg">
      <q-select
        outlined
        v-model="search"
        behavior="menu"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        class="destination"
        option-value="id"
        option-label="name"
        :options="destinations"
        @filter="filterFn"
        :rules="[
          val => (val !== null && val !== '') || 'Please choose destination'
        ]"
        label="Destination"
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
        outlined
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
        outlined
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

      <span class="row">
        <q-input
          ref="adults"
          class="numeric"
          outlined
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
          outlined
          type="number"
          v-model="children"
          label="Children *"
          lazy-rules
          :rules="[
            val =>
              (val !== null && val !== '') || 'Please type children number',
            val =>
              (val >= 0 && val < 10) ||
              'Children number should be lower then 10'
          ]"
        />
      </span>

      <q-btn label="Search" type="submit" color="primary" />
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
      search: {
        id: null,
        name: ""
      },
      checkinDate: "",
      checkoutDate: "",
      adults: null,
      children: null,
      loading: true
    };
  },
  created() {
    if (localStorage["criteria"]) {
      let criteria = JSON.parse(localStorage["criteria"]);
      this.search = criteria.search;
      this.checkinDate = criteria.checkin;
      this.checkoutDate = criteria.checkin;
      this.adults = criteria.adults;
      this.children = criteria.children;
    }
  },
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
            this.loading = false;
          });
      });
    },
    onSubmit() {
      let criteria = {
        search: this.search,
        checkin: this.checkinDate,
        checkout: this.checkoutDate,
        adults: this.adults,
        children: this.children
      };
      localStorage.setItem("criteria", JSON.stringify(criteria));
      // this.$router.push({name : "results", params: { destination: this.search.name }})
      this.$router.push({ name: "results" });
    }
  }
};
</script>
