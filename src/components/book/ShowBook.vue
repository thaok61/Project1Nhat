<template lang="html">

  <div id="app">
  <v-app id="inspire">
    <h1>Book</h1>
    <v-data-table
      v-model="selected"
      :single-select="true"
      show-select
      item-key="id"
      :headers="headers"
      :items="books"
      :sort-by="[]"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
    <v-form>
    <v-btn color="error" class="mr-4" :disabled="!selected.length" @click="deleteBook">Delete</v-btn>
    <v-btn color="info" class="mr-4" :disabled="!selected.length" @click="edit">Edit</v-btn>
    <v-btn color="success" class="mr-4" @click="add">Add</v-btn>
      </v-form>
  </v-app>

</div>
</template>

<script lang="js">

  export default  {
    name: 'show-book',
    props: [],
    mounted () {

    },
    data () {
      return {
        headers: [
        {
          text: 'STT',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Author', value: 'author' },
        { text: 'Year', value: 'year' },
        { text: 'Publisher', value: 'nxb' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Image', value: 'image' }
      ],
      books: this.$store.state.books,
      selected: [],
      }
    },
    methods: {
      deleteBook () {
        this.books = this.books.filter(book => book.id != this.selected[0].id);
        console.log(this.$store.state.categories)
        this.$store.state.books = this.books
      },
      edit () {
        this.$emit('clicked', 'ChangeBook', null ,this.selected[0].id)
      },
      add () {
        this.$emit('clicked', 'ChangeBook')
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-book {

  }
</style>
