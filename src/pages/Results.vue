<template>
  <div class="results full-width row wrap justify-between">
    <!-- <div class="row"> -->
    <div class="sidebar col-3">
      <p class="header">Filter Box for {{ $route.params.destination }}</p>
      <span>
        Filter by hotel name:
        <q-input outlined v-model="search" />
      </span>
      <span>
        Filter by rating:
        <q-option-group
          v-model="group"
          :options="options"
          color="green"
          type="checkbox"
          label="fgasdg"
        />
      </span>
    </div>
    <div class="filters col-8">
      <p v-for="n in 15" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
        praesentium molestias a adipisci, dolore vitae odit, quidem consequatur
        optio voluptates asperiores pariatur eos numquam rerum delectus commodi
        perferendis voluptate?
      </p>

      <!-- place QPageScroller at end of page -->
      <q-page-scroller
        expand
        position="top"
        :scroll-offset="150"
        :offset="[0, 0]"
      >
        <div
          class="col cursor-pointer q-pa-sm bg-accent text-white text-center"
        >
          Scroll back up...
        </div>
      </q-page-scroller>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotels: [],
      search: "",
      group: ["op1"],
      options: [
        {
          label: "Option 1",
          value: "op1"
        },
        {
          label: "Option 2",
          value: "op2"
        },
        {
          label: "Option 3",
          value: "op3"
        }
      ]
    };
  },
  created() {
    fetch(process.env.API_HOTELS)
      .then(resp => resp.json())
      .then(json => {
        this.hotels = json
      });
  }
};
</script>
