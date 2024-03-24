<template>
  <div id="app">
    <h1>电影收藏应用</h1>
    <CreateUser @userCreated="fetchMovies" />
    <CreateMovie @movieCreated="fetchMovies" :users="users" />
    <MovieList :movies="movies" @movieSelected="selectMovie" />
    <MovieDetails v-if="selectedMovie" :movie="selectedMovie" @reviewAdded="fetchMovies" />
  </div>
</template>

<script>
import CreateUser from './components/CreateUser.vue';
import CreateMovie from './components/CreateMovie.vue';
import MovieList from './components/MovieList.vue';
import MovieDetails from './components/MovieDetails.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CreateUser,
    CreateMovie,
    MovieList,
    MovieDetails,
  },
  data() {
    return {
      movies: [],
      users: [],
      selectedMovie: null,
    };
  },
  methods: {
    async fetchMovies() {
      const response = await axios.get('http://localhost:3000/movies');
      this.movies = response.data;
      this.fetchUsers(); // 每次获取电影列表后也更新用户列表
    },
    async fetchUsers() {
      const response = await axios.get('http://localhost:3000/users');
      this.users = response.data;
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
  },
  created() {
    this.fetchMovies();
  },
};
</script>
