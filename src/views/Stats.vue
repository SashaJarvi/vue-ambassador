<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th>Link</th>
        <th>Users</th>
        <th>Revenue</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="link in links" :key="link.id">
        <td>{{ checkoutUrl(link.code) }}</td>
        <td>{{ link.count }}</td>
        <td>{{ link.revenue }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { Link } from '@/models/link';

export default {
  name: 'Stats',
  setup() {
    const links = ref<Link[]>([]);
    // const checkoutUrl = (code: string) => `${process.env.VUE_APP_CHECKOUT_URL}/${code}`;
    const checkoutUrl = computed(() => (code: string) => `${process.env.VUE_APP_CHECKOUT_URL}/${code}`);

    onMounted(async () => {
      const { data } = await axios.get('/stats');

      links.value = data;
    });

    return {
      links,
      checkoutUrl,
    };
  },
};
</script>
