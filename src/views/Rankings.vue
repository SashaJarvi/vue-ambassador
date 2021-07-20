<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Revenue</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(value, name, index) in rankings" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ name }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Ranking } from '@/models/ranking';

export default {
  name: 'Rankings',
  setup() {
    const rankings = ref<Ranking[]>([]);

    onMounted(async () => {
      const { data } = await axios.get<Ranking[]>('/rankings');

      rankings.value = data;
    });

    return {
      rankings,
    };
  },
};
</script>

<style scoped>

</style>
