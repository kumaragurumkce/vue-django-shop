<template>
  <div>
    <h1>Categories</h1>
    <div v-for="category in categories" :key="category.id">
      <h2>{{ category.name }}</h2>
      <div v-for="item in category.items" :key="item.id">
        <h3>{{ item.name }}</h3>
        <ul>
          <li v-for="product in item.products" :key="product.id">
            {{ product.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CategoryList',
  computed: {
    ...mapGetters(['getCategories']),
    categories() {
      return this.getCategories;
    }
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    ...mapActions(['fetchCategories']),
  }
};
</script>
