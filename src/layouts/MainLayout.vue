<template>
  <q-layout view="lHh Lpr lFf">
    <div class="container q-gutter-y-md">
      <!-- <div class="q-pa-md"> -->
        <div class="row justify-between">
          <div class="logo row items-center">
            <span></span>
            <h1>Travolta</h1>
          </div>
          <ul class="menu row items-center">
            <li class="menu-item pointer"><router-link :to="{ name: 'results', params: { destination: 'Atlanta' } }">About Us</router-link></li>
            <li class="menu-item pointer">My Boockings</li>
            <li class="menu-item pointer">Sing-in</li>
          </ul>
        </div>
        <router-view />
      </div>
    <!-- </div> -->
  </q-layout>
</template>

<script>

export default {
  name: "MainLayout",
  // components: { EssentialLink },
  data() {
    return {
    };
  }
};
</script>
