<template lang="html">

  <v-container class="grey lighten-5">
    <div class="sidenav">
      <div v-for="category in categories" :key="category.id">
      <a @click="findByCategory(category.id)">{{category.name}}</a>
      </div>
    </div>
    <div class="main">
    <v-row dense>
        <v-col
          v-for="book in books"
          :key="book.id"
          :cols="4"
        >
          <v-card>
            <div v-if="book.image == null">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              
              height="200px"
            >
            </v-img>
            </div>
            <div v-else>
            <v-img
              :src="book.image"
              
              height="200px"
            >
            </v-img>
            </div>
            <v-card-title>{{ book.name }}</v-card-title>
            
            <v-card-subtitle class="pb-0">{{ book.author }}</v-card-subtitle>
            
            <v-card-subtitle class="pb-0">{{ book.nxb }}</v-card-subtitle>

            <v-card-subtitle class="pb-0">Quantity: {{ book.quantity }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ book.year }}</div>
            </v-card-text>


            <v-card-actions>
              <v-btn icon @click="add (book.id)">
                Rent
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      </div>
  </v-container>

</template>

<script lang="js">

  export default  {
    name: 'list-book',
    props: [],
    mounted () {

    },
    data () {
      return {
        books: this.$store.state.books,
        categories: this.$store.state.categories,
        listProducts: [],
        categoryId: localStorage.getItem('categoryId')
      }
    },
    methods: {
      add (idBook) {
        this.$emit('clicked', 'ChangeOrder')
        console.log(idBook);
        localStorage.setItem('idBook', idBook)
      },

      findByCategory (idCategory) {
        this.books = this.$store.getters.getBookByIdCategory(idCategory)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .list-book {

  }
  .sidenav {
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 160px; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #f1f1f1; /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }

  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 15px;
    color: #f1f1f1;
    display: block;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
    color: #f1f1f1;
  }
  .main {
    margin-left: 160px; /* Same as the width of the sidebar */
    padding: 0px 10px;
    margin-top: 50px;
  }
    
</style>
