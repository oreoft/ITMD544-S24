<template>
  <div class="create-user-container">
    <h2>Create User</h2>
    <input v-model="name" placeholder="Name"/>
    <input v-model="email" type="email" placeholder="Email"/>
    <button @click="createUser">Create</button>
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
        alert('Please fill in both name and email');
        return;
      }
      try {
        await axios.post('http://localhost:4000/users', {
          name: this.name,
          email: this.email,
        });
        this.name = '';
        this.email = '';
        this.$emit('userCreated');
      } catch (error) {
        alert("Failed to create user");
      }
    },
  },
};
</script>

<style>
.create-user-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-user-container h2 {
  text-align: center;
  color: #333;
}

.create-user-container input {
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.create-user-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-user-container button:hover {
  background-color: #0056b3;
}
</style>

