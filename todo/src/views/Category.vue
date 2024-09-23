<template>
    <div>
      <h2>Categories</h2>
      <form @submit.prevent="submitCategory">
        <input v-model="newCategory" placeholder="Add new category" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        newCategory: ''
      };
    },
    computed: {
      ...mapGetters(['categories']), // Get the list of categories from Vuex
    },
    methods: {
      ...mapActions(['addCategory', 'fetchCategories']),
      submitCategory() {
        this.addCategory(this.newCategory); // Call Vuex action to add category
        this.newCategory = ''; // Clear the input field after submission
      }
    },
    mounted() {
      this.fetchCategories(); // Fetch categories when the component is mounted
    }
  };
  </script>
  