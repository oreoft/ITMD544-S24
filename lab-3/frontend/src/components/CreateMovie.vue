<template>
  <div class="create-movie-container">
    <h2>Create Movie</h2>
    <select v-model="selectedUserId">
      <option disabled value="">Please select a user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <input v-model="title" placeholder="Movie Title"/>
    <input v-model="year" placeholder="Year" type="number"/>
    <button @click="createMovie">Create Movie</button>
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
        alert('Please fill in all fields');
        return;
      }
      try {
        await axios.post(`${process.env.VUE_APP_HOST}/movies`, {
          userId: this.selectedUserId,
          title: this.title,
          year: this.year,
        });
        this.$emit('movieCreated');
        this.selectedUserId = '';
        this.title = '';
        this.year = null;
      } catch (error) {
        alert("Failed to create movie");
      }
    },
  },
};
</script>

<style>
.create-movie-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-movie-container h2 {
  text-align: center;
  color: #333;
}

.create-movie-container select,
.create-movie-container input {
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-movie-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-movie-container button:hover {
  background-color: #0056b3;
}
</style>

