<template>
  <navbar />

  <main>
    <main-header v-if="showHeader" />

    <div class="album py-5 bg-light">
      <div class="container">
        <router-view />
      </div>
    </div>
  </main>

  <footer class="text-muted py-5">
    <div class="container">
      <p class="float-end mb-1">
        <a href="#">Back to top</a>
      </p>
      <p class="mb-1">
        Album example is &copy; Bootstrap, but please download and customize it for yourself!
      </p>
      <p class="mb-0">
        New to Bootstrap? <a href="/">Visit the homepage</a> or read our
        <a href="/docs/5.0/getting-started/introduction/">getting started guide</a>.
      </p>
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Layout',
  components: {
    MainHeader,
    Navbar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const showHeader = computed(() => route.path === '/' || route.path === '/backend');

    onMounted(async () => {
      try {
        const { data } = await axios.get('/user');

        await store.dispatch('setUser', data);
      } catch (e) {
        await store.dispatch('setUser', null);
      }
    });

    return {
      showHeader,
    };
  },
};
</script>

<style scoped></style>
