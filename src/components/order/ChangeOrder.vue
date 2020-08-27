<template lang="html">

  <v-app>
    <v-alert
        :value="alert"
        color="pink"
        dark
        border="top"
        icon="mdi-home"
        transition="scale-transition"
      >
        Quantity too much
      </v-alert>
    <h1>Order</h1>
    <v-form
      ref="form"
      v-model="valid"
      class="mt-5"
    >
      <select v-model="select" name="Book" class="form-control" tabindex="12">
      <option v-for="book in books" :key="book.id" :value="book.id" @click="setMaxQuantity(book.quantity)">{{ book.name }}</option>
      </select>

  <v-menu        
    v-model="dateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y 
    max-width="290px"
    min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          label="From"
          readonly
          :value="dateDisp"
          v-on="on"
        ></v-text-field>
      </template>
       <v-date-picker
          locale="en-in"
          v-model="date"
          no-title
          @input="dateMenu = false"
          :min="minDate"
          :max="maxDate"
        ></v-date-picker>
    </v-menu>

    <v-text-field
        v-model="idSV"
        :rules="idSVRules"
        label="ID Student"
        required
    ></v-text-field>

    <p>Is Return Book?</p>
    <v-switch v-model="isReturnBook" :label="this.isReturnBook ? 'Yes' : 'No' "></v-switch>

    <v-text-field type=number min=1 max=999 v-model="quantity" label="Quantity"></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="changeOrder"
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
    name: 'add-order',
    props: ['idOrder'],
    mounted () {
      
      var order = this.$store.getters.getOrderById(this.idOrder)
      if (order) {
        this.date = order.date
        this.idSV = order.idSV
        this.select = order.idBook
        this.isReturnBook = order.isReturnBook
        this.quantity = order.quantity
        this.editQuantity = order.quantity
        this.editIsReturnBook = order.isReturnBook
      }
      if(this.select)
        this.maxQuantity = this.$store.state.books[this.select].quantity
    },
    data () {
      return {
        editQuantity: 0,
        editIsReturnBook: true,
        alert: false,
        valid: true,
        select: localStorage.getItem('idBook'),
        maxQuantity: 999,
        order: {
        id: '',
        idBook: '',
        nameBook: '',
        idSV: '',
        isReturnBook: '',
        quantity: 1
        },

        dateMenu: false,
        date: null,
        minDate: "2000-01-01",
        maxDate: this.formatDate(),

        books: this.$store.state.books,

        idSV: "",
        idSVRules: [
        v => !!v || 'ID is required',      
        ],
        
        quantity: 1,

        isReturnBook: false,
      }
    },
    methods: {
      changeOrder () {
        if (Number.isInteger(this.idOrder)) {
          this.edit()
        } else {
          this.add()
        }
      },

      add () {
        var quantity = 0
        this.order.id = this.$store.getters.ordersCount
        this.order.idBook = this.select
        this.order.nameBook = this.$store.state.books[this.select].name,
        this.order.idSV = this.idSV
        this.order.quantity = this.quantity
        this.order.date = this.date
        this.order.isReturnBook = this.isReturnBook
        if (this.isReturnBook) {
          quantity = parseInt(this.$store.state.books[this.select].quantity) + parseInt(this.quantity)
          this.$store.state.orders.push(this.order)
          this.$store.state.books[this.select].quantity = quantity
          localStorage.removeItem("idBook")
          this.$emit('clicked', 'ShowOrder')
        } else {
          quantity = parseInt(this.$store.state.books[this.select].quantity) - parseInt(this.quantity)
        
          if (parseInt(this.quantity) > parseInt(this.maxQuantity)) {
            console.log(this.quantity)
            console.log(this.maxQuantity)
            this.alert = true
          } else {
            this.alert = false          
            this.$store.state.orders.push(this.order)
            this.$store.state.books[this.select].quantity = quantity
            localStorage.removeItem("idBook")
            this.$emit('clicked', 'ShowOrder')
          }        
        }

      },

      edit () {
        var index = this.$store.getters.getBookIndexById(this.idOrder)
        var quantity = 0
        if (this.isReturnBook == true && this.editIsReturnBook == true) {
          quantity = parseInt(this.$store.state.books[this.select].quantity) - this.editQuantity + this.quantity
        } else if (this.isReturnBook == true && this.editIsReturnBook == false) {
          quantity = parseInt(this.$store.state.books[this.select].quantity) + this.editQuantity + this.quantity
        } else if (this.isReturnBook == false && this.editIsReturnBook == true) {
          quantity = parseInt(this.$store.state.books[this.select].quantity) - this.editQuantity - this.quantity
        } else {
          quantity = parseInt(this.$store.state.books[this.select].quantity) + this.editQuantity - this.quantity
        }

          if (parseInt(this.quantity) > parseInt(this.maxQuantity) && this.isReturnBook == false ) {
            
            console.log(this.quantity)
            console.log(this.maxQuantity)
            this.alert = true            
          } else {
            
            console.log(this.maxQuantity)
            this.alert = false
            this.$store.state.orders[index] = {
            id: this.idOrder,
            idBook: this.select,
            nameBook: this.$store.state.books[this.select].name,
            quantity: this.quantity,
            idSV: this.idSV,
            date: this.date,
            isReturnBook: this.isReturnBook,
            }
            this.$store.state.books[this.select].quantity = quantity
            this.$emit('clicked', 'ShowOrder')
          }
      },

      setMaxQuantity (quantity) {
        this.maxQuantity = quantity
      },

      formatDate () {
        var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
          month = '0' + month;
        if (day.length < 2) 
          day = '0' + day;

        return [year, month, day].join('-');
      },

      reset () {
        this.$refs.form.reset()
      },
    },
    computed: {
      dateDisp() {
      return this.date;
      // format/do something with date
    },  
    }
}


</script>

<style scoped lang="scss">
  .add-order {

  }
</style>
