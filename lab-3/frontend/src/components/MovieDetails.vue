<template>
  <div>
    <h2>电影详情</h2>
    <p>标题: {{ movie.title }}</p>
    <p>年份: {{ movie.year }}</p>
    <h3>评论</h3>
    <div v-for="review in movie.reviews" :key="review.id">
      <p>{{ review.content }}</p>
      <p>评分: {{ review.rating }}</p>
    </div>
    <h3>添加评论</h3>
    <textarea v-model="newReviewContent" placeholder="评论内容"></textarea>
    <input v-model.number="newReviewRating" type="number" placeholder="评分" />
    <button @click="addReview">提交评论</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      newReviewContent: '',
      newReviewRating: 0,
    };
  },
  methods: {
    async addReview() {
      if (!this.newReviewContent || !this.newReviewRating) {
        alert('请填写评论内容和评分');
        return;
      }
      try {
        await axios.post('http://localhost:3000/reviews', {
          movieId: this.movie.id,
          content: this.newReviewContent,
          rating: this.newReviewRating,
        });
        this.$emit('reviewAdded');
        this.newReviewContent = '';
        this.newReviewRating = 0;
      } catch (error) {
        alert("添加评论失败");
      }
    },
  },
};
</script>

