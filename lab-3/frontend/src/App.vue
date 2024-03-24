<template>
  <div id="app">
    <header>
      <h1>Movie Collection App</h1>
    </header>
    <main>
      <div class="movie-list-details">
        <MovieList :movies="movies" @movieSelected="selectMovie" @deleteMovie="handleDeleteMovie"/>
        <MovieDetails v-if="selectedMovie" :movie="selectedMovie" :users="users" @reviewAdded="fetchMovies"/>
      </div>
      <div class="create-user-movie">
        <CreateUser @userCreated="fetchMovies"/>
        <CreateMovie @movieCreated="fetchMovies" :users="users"/>
      </div>
    </main>
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
      const response = await axios.get('http://localhost:4000/movies');
      this.movies = response.data;
      this.fetchUsers(); // 每次获取电影列表后也更新用户列表
    },
    async handleDeleteMovie(movieId) {
      try {
        await axios.delete(`http://localhost:4000/movies/${movieId}`);
        alert("Movie deleted successfully");
        this.fetchMovies(); // 重新获取电影列表
      } catch (error) {
        alert("Failed to delete movie");
      }
    },
    async fetchUsers() {
      const response = await axios.get('http://localhost:4000/users');
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

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}
</style>

<style scoped>
.movie-list-details {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header {
  background-color: #007bff;
  color: #fff;
  padding: 20px;
  text-align: center;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.movie-list, .movie-details {
  flex-basis: 48%; /* Adjust based on your preference */
}

.create-user-movie {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.create-user, .create-movie {
  flex-basis: 48%; /* Adjust based on your preference */
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

input, select {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: calc(100% - 22px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .movie-list, .movie-details, .create-user, .create-movie {
    flex-basis: 100%;
  }
}
</style>
