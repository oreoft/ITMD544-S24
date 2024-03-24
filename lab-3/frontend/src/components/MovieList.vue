<template>
  <div>
    <h2>电影列表</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id" @click="selectMovie(movie)">
        {{ movie.title }} - {{ movie.year }}
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
  },
};
</script>
