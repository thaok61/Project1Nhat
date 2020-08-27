<template lang="html">

  <v-app>
    <h1>Book</h1>
    <v-form
      ref="form"
      v-model="valid"
      class="mt-5"
    >
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="author"
        :rules="authorRules"
        label="Author"
        required
      ></v-text-field>

      <v-text-field
        v-model="year"
        :rules="yearRules"
        label="Year"
        required
      ></v-text-field>

      <v-text-field
        v-model="nxb"
        :rules="nxbRules"
        label="Publisher"
        required
      ></v-text-field>

      <v-text-field
        v-model="image"
        :rules="imageRules"
        label="Image"
        required
      ></v-text-field>

      <v-text-field
        v-model="quantity"
        :rules="quantityRules"
        label="Quantity"
        required
      ></v-text-field>

      <select v-model="select" name="Category" class="form-control" tabindex="12">
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="changeBook"
      >
        Add
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

    </v-form>
</v-app>


</template>

<script lang="js">

  export default  {
    name: 'change-book',
    props: ['idBook'],
    mounted () {
      var book = this.$store.getters.getBookById(this.idBook)
      if (book) {
        this.name = book.name
        this.author = book.author
        this.year = book.year
        this.nxb = book.nxb
        this.image = book.image
        this.quantity = book.quantity
        this.select = book.idCategory
      }
    },
    data () {
      return {
      valid: true,
      select: null,
      book: {
        id: '',
        name: '',
        author: '',
        year: '',
        nxb: '',
        image: '',
        quantity: '',
        idCategory: ''
      },
      categories: this.$store.state.categories,

      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],

      author: '',
      authorRules: [
        v => !!v || 'Author is required',
      ],
      
      year: '',
      yearRules: [
        v => !!v || 'Year is required',
      ],

      nxb: '',
      nxbRules: [

      ],

      image: '',
      imageRules: [

      ],

      quantity: '',
      quantityRules: [
        v => !!v || 'Quantity is required',
      ],

      }
    },
    methods: {
      changeBook () {
        if (Number.isInteger(this.idBook)) {
          this.edit()
        } else {
          this.add()
        }
      },
      add () {
        this.book.id = this.$store.getters.booksCount
        this.book.name = this.name
        this.book.author = this.author
        this.book.year = this.year
        this.book.nxb = this.nxb
        this.book.image = this.image
        this.book.quantity = this.quantity
        this.book.idCategory = this.select

        this.$store.state.books.push(this.book)
        this.$emit('clicked', 'ShowBook')
      },
      edit () {
        var index = this.$store.getters.getBookIndexById(this.idBook)
        this.$store.state.books[index] = {
          id: this.idBook,
          name: this.name,
          author: this.author,
          year: this.year,
          nxb: this.nxb,
          image: this.image,
          quantity: this.quantity,
          idCategory: this.select
        }
        this.$emit('clicked', 'ShowBook')
      },
      reset () {
        this.$refs.form.reset()
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .change-book {

  }
</style>
