<template>
  <div class="container mt-5">
    <h2>Products</h2>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">$ {{ product.price }}</p>
            <button class="btn btn-primary" @click="handleAddToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="message" class="alert alert-success">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['products', 'message'])
  },
  methods: {
    ...mapActions(['addToCart', 'setMessage']),
    async handleAddToCart(product) {
      // Add the product to the cart
      await this.addToCart(product);
      // Dispatch a message to indicate that the product was added
      const successMessage = `${product.name} has been added to the cart!`;
      this.setMessage(successMessage);
      // Clear the message after 3 seconds
      setTimeout(() => {
        this.setMessage('');
      }, 3000);
    }
  }
};
</script>
