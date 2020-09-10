<template>
  <q-layout view="lHh Lpr lFf">
    <div class="container q-gutter-y-md">
      <div class="row justify-between">
        <router-link class="logo row items-center" :to="{ path: '/' }"
          ><span></span>
          <h1>Travolta</h1></router-link
        >
        <ul class="menu row items-center">
          <li class="menu-item pointer">About Us</li>
          <li class="menu-item pointer">My Boockings</li>
          <li class="menu-item pointer">Sing-in</li>
        </ul>
      </div>
      <router-view />
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  }
};
</script>
