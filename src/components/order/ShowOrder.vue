<template lang="html">

  <div id="app">
  <v-app id="inspire">
    <h1>Order</h1>
    <v-data-table
      v-model="selected"
      :single-select="true"
      show-select
      item-key="id"
      :headers="headers"
      :items="orders"
      :sort-by="[]"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    >
    <template v-slot:item.days="{item}">
        <v-icon
          small
          class="mr-2"
        >
          {{ countDays(item) }}
        </v-icon>
    </template>

    <template v-slot:item.returnBook="{item}">
        <v-btn
          small
          class="mr-2"
          :disabled= item.isReturnBook
          @click="returnBook(item)"
        >
          Return Book
        </v-btn>
    </template>
    </v-data-table>
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
    name: 'show-order',
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
        { text: 'ID Student', value: 'idSV' },
        { text: 'ID Book', value: 'idBook' },
        {text: 'Name Of Book', value: 'nameBook'},
        { text: 'Date', value: 'date' },
        { text: 'Is Return Book', value: 'isReturnBook' },
        { text: 'Days', value: 'days', sortable: false },
        { text: 'Return Book', value: 'returnBook', sortable: false}
      ],
      orders: this.$store.state.orders,
      selected: [],
      }
    },
    methods: {
      deleteBook () {
        this.orders = this.orders.filter(book => book.id != this.selected[0].id);
        console.log(this.$store.state.categories)
        this.$store.state.orders = this.orders
      },
      edit () {
        this.$emit('clicked', 'ChangeOrder', null, null, this.selected[0].id)
      },
      add () {
        this.$emit('clicked', 'ChangeOrder')
      },

      countDays (item) {
        if (item.isReturnBook) {
          return "OK" 
        } else {
          var d = new Date(),
          month = (d.getMonth() + 1),
          day = d.getDate(),
          year = d.getFullYear()
          
          var rent = item.date.split( "-")

          if (year - rent[0] > 0) {
            return "Above a year"
          } else if ( month - rent[1] > 0) {
            return "Above a month"
          } else {
            return day - rent[2] + " days"
          }
        }
      },

      returnBook (item) {
        item.isReturnBook = true
        this.$store.state.orders = this.orders
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-order {

  }
</style>
