<template>
  <div class="results full-width row wrap justify-between">
    <div class="sidebar col-xs-12 col-sm-4 col-md-3">
      <!-- <p class="header">Filter Box for {{ $route.params.destination }}</p> -->
      <p class="header">Filter Box</p>
      <span>
        Filter by hotel name:
        <q-input outlined v-model="search" @input="onChange" />
      </span>
      <span>
        Filter by rating:
        <q-list dark>
          <q-item
            v-for="star in [5, 4, 3, 2, 1]"
            tag="label"
            :key="star"
            @click="onChange"
          >
            <q-item-section avatar>
              <q-checkbox v-model="stars" :val="star" color="purple" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-rating
                  :value="stars.includes(star) ? star : 0"
                  :max="star"
                  size="1.5em"
                  color="purple-13"
                  readonly
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </span>
    </div>
    <div
      v-if="filteredItems.length"
      class="filters col-xs-12 col-sm-8 col-md-9"
    >
      <div
        v-for="hotel in filteredItems"
        :key="hotel.id"
        class="filters-item row justify-between items-center"
      >
        <div v-lazyload class="row justify-center items-center">
          <img data-url="/hotel.png" alt="" />
          <div class="filters-item--text">
            <p>{{ hotel.name }}</p>
            <q-rating
              :value="Number.parseFloat(hotel.hotel_rating)"
              :max="Math.ceil(Number.parseFloat(hotel.hotel_rating))"
              size="1.5em"
              color="purple-13"
              icon-half="star_half"
              readonly
            />
            <p>{{ hotel.address }}</p>
          </div>
        </div>
        <div>
          <q-btn color="purple-13" label="Show Details" />
        </div>
      </div>
      <trigger @triggerIntersected="page += 1" />
    </div>
    <div v-else class="filters col-xs-12 col-sm-8 col-md-9">
      No items found
    </div>
  </div>
</template>

<script>
import Trigger from "../component/Trigger";
import LazyLoadDirective from "../directive/LazyLoadDirective";
export default {
  data() {
    return {
      hotels: [],
      search: "",
      page: 1,
      limit: 10,
      stars: []
    };
  },
  components: {
    Trigger
  },
  directives: {
    lazyload: LazyLoadDirective
  },
  created() {
    fetch(process.env.API_HOTELS)
      .then(resp => resp.json())
      .then(json => {
        this.hotels = json;
      });
  },
  methods: {
    onChange() {
      this.page = 1;
    }
  },
  computed: {
    filteredItems() {
      return this.hotels
        .filter(
          item =>
            item.name.includes(this.search) &&
            (this.stars.length
              ? this.stars.includes(
                  Math.ceil(Number.parseFloat(item.hotel_rating))
                )
              : true)
        )
        .slice(0, this.page * this.limit);
    }
  }
};
</script>
