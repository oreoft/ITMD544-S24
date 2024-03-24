<template>
  <div class="movie-list">
    <h2>Movie List</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id" class="movie-item">
        <span @click="selectMovie(movie)">
          {{ movie.title }} - {{ movie.year }}
        </span>
        <button @click.stop="confirmDelete(movie.id)" class="delete-button">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    movies: Array,
  },
  methods: {
    selectMovie(movie) {
      this.$emit('movieSelected', movie);
    },
    confirmDelete(movieId) {
      if (confirm("Are you sure you want to delete this movie?")) {
        this.$emit('deleteMovie', movieId);
      }
    },
  },
};
</script>

<style>
.movie-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.movie-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background-color: #99ab8e;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.movie-item span {
  flex-grow: 1;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

