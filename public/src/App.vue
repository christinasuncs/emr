<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import 'bulma/css/bulma.min.css';

const store = useStore();
const isMenuOpen = ref(false);
const isLoggedIn = computed(() => store.getters.isLoggedIn);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const router = useRouter();

// Simulating login and logout for temporary testing
// Simulate logout
const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};

// // Simulate login
// const login = () => {
//   isLoggedIn.value = true;
//   router.push('/');
// };



</script>

<template>
  <div id="layout">
    <header>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <RouterLink class="navbar-item" to="/">Dashboard</RouterLink>
          <!-- Navbar burger -->
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="toggleMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <!-- Navbar menu -->
        <div :class="{ 'navbar-menu': true, 'is-active': isMenuOpen }">
          <div class="navbar-start">
            <RouterLink class="navbar-item" to="/patients">Patients</RouterLink>
            <RouterLink class="navbar-item" to="/calendar">Calendar</RouterLink>
            <RouterLink class="navbar-item" to="/drugs">Drugs</RouterLink>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <!-- <div class="buttons">
                <RouterLink v-if="!isLoggedIn" class="button is-light" to="/login">Log in</RouterLink>
                <button v-if="isLoggedIn" class="button is-danger" @click="logout">Logout</button>
              </div> -->
            </div>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: #2e73c9;
}
</style>
