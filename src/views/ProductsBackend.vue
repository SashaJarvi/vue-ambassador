<template>
  <products :products="products" :filters="filters" @set-filters="load" :last-page="lastPage" />
</template>

<script lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { Product } from '@/models/product';
import { Filter } from '@/models/filter';
import Products from '@/views/Products.vue';

export default {
  name: 'ProductsBackend',
  components: { Products },

  setup() {
    const products = ref<Product[]>([]);
    const filters = reactive<Filter>({
      s: '',
      sort: '',
      page: 1,
    });

    const lastPage = ref(0);

    const load = async (f: Filter) => {
      filters.s = f.s;
      filters.sort = f.sort;
      filters.page = f.page;

      const arr = [];

      if (filters.s) {
        arr.push(`s=${filters.s}`);
      }

      if (filters.sort) {
        arr.push(`sort=${filters.sort}`);
      }

      if (filters.page) {
        arr.push(`page=${filters.page}`);
      }

      const { data } = await axios.get(`/products/backend?${arr.join('&')}`);

      products.value = filters.page === 1 ? data.data : [...products.value, ...data.data];
      lastPage.value = data.meta.last_page;
    };

    onMounted(() => load(filters));

    return {
      products,
      filters,
      lastPage,
      load,
    };
  },
};
</script>
