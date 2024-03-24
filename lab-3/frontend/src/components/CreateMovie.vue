<template>
  <div>
    <h2>创建电影</h2>
    <select v-model="selectedUserId">
      <option disabled value="">请选择用户</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <input v-model="title" placeholder="电影名" />
    <input v-model="year" placeholder="年份" type="number" />
    <button @click="createMovie">创建电影</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    users: Array,
  },
  data() {
    return {
      selectedUserId: '',
      title: '',
      year: null,
    };
  },
  methods: {
    async createMovie() {
      if (!this.selectedUserId || !this.title || !this.year) {
        alert('请填写所有字段');
        return;
      }
      try {
        await axios.post('http://localhost:3000/movies', {
          userId: this.selectedUserId,
          title: this.title,
          year: this.year,
        });
        this.$emit('movieCreated');
        this.selectedUserId = '';
        this.title = '';
        this.year = null;
      } catch (error) {
        alert("创建电影失败");
      }
    },
  },
};
</script>

