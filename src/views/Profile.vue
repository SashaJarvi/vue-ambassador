<template>
  <h3>Account Info</h3>

  <form @submit.prevent="infoSubmitHandler">
    <div class="mb-3">
      <label>First Name</label>
      <input v-model="infoData.first_name" class="form-control" name="first_name" />
    </div>

    <div class="mb-3">
      <label>Last Name</label>
      <input v-model="infoData.last_name" class="form-control" name="last_name" />
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input v-model="infoData.email" class="form-control" type="email" name="email" />
    </div>

    <button class="btn btn-outline-secondary" type="submit">Save</button>
  </form>

  <h3 class="mt-4">Change Password</h3>

  <form @submit.prevent="passwordHandler">
    <div class="mb-3">
      <label>Password</label>
      <input v-model="passwordData.password" class="form-control" name="password"/>
    </div>

    <div class="mb-3">
      <label>Password confirm</label>
      <input v-model="passwordData.password_confirm" class="form-control" name="password_confirm" />
    </div>

    <button class="btn btn-outline-secondary" type="submit">Save</button>
  </form>
</template>

<script>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'Profile',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    const infoData = reactive({
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email,
    });

    const passwordData = reactive({
      password: '',
      password_confirm: '',
    });

    watch(user, () => {
      infoData.first_name = user.value.first_name;
      infoData.last_name = user.value.last_name;
      infoData.email = user.value.email;
    });

    const infoSubmitHandler = async () => {
      const { data } = await axios.put('/users/info', infoData);
      await store.dispatch('setUser', data);
    };

    const passwordHandler = async () => {
      await axios.put('/users/password', passwordData);
    };

    return {
      infoData,
      passwordData,
      infoSubmitHandler,
      passwordHandler,
    };
  },
};
</script>
