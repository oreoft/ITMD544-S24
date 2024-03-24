<template>
  <div>
    <h2>创建用户</h2>
    <input v-model="name" placeholder="用户名" />
    <input v-model="email" placeholder="邮箱" />
    <button @click="createUser">创建</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
    };
  },
  methods: {
    async createUser() {
      if (!this.name || !this.email) {
        alert('请填写用户名和邮箱');
        return;
      }
      try {
        await axios.post('http://localhost:3000/users', {
          name: this.name,
          email: this.email,
        });
        this.name = '';
        this.email = '';
        this.$emit('userCreated');
      } catch (error) {
        alert("创建用户失败");
      }
    },
  },
};
</script>

