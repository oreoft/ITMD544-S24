<template>
  <div class="movie-details" v-if="movie">
    <h2>Movie Details</h2>
    <div class="movie-info">
      <p><strong>Title:</strong> {{ movie.title }}</p>
      <p><strong>Year:</strong> {{ movie.year }}</p>
    </div>
    <div class="reviews-section" v-if="movie.reviews && movie.reviews.length">
      <h3>Reviews</h3>
      <div class="review" v-for="review in movie.reviews" :key="review.id">
        <p>{{ review.content }}</p>
        <p>Rating: {{ review.rating }}</p>
      </div>
    </div>
    <div class="add-review">
      <h3>Add a Review</h3>
      <select v-model="selectedUserId">
        <option disabled value="">Please select a user</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <textarea v-model="newReviewContent" placeholder="Review content"></textarea>
      <input v-model.number="newReviewRating" type="number" placeholder="Rating"/>
      <button @click="addReview">Submit Review</button>
    </div>
  </div>
  <div v-else>
    <p>Movie details are not available.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    movie: Object,
    users: Array,
  },
  data() {
    return {
      newReviewContent: '',
      newReviewRating: '',
      selectedUserId: ''
    };
  },
  methods: {
    async addReview() {
      if (!this.newReviewContent || !this.newReviewRating || !this.selectedUserId) {
        alert('Please fill in the review content, rating, and select a user');
        return;
      }
      try {
        await axios.post('http://localhost:3000/reviews', {
          movieId: this.movie.id,
          content: this.newReviewContent,
          rating: this.newReviewRating,
          userId: this.selectedUserId,
        });
        window.location.reload();
      } catch (error) {
        alert("Failed to add review");
      }
    },
  },
};
</script>

<style>
.movie-details {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.movie-info, .reviews-section, .add-review {
  margin-bottom: 20px;
}

.review {
  background-color: #99ded0;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
}

select, textarea, input[type="number"] {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button.delete-movie {
  background-color: red;
}
</style>
