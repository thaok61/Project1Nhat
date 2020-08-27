<template lang="html">

  <v-app>
    <h1>Order</h1>
    <v-form
      ref="form"
      v-model="valid"
      class="mt-5"
    >
      <select v-model="select" name="Book" class="form-control" tabindex="12">
      <option v-for="book in books" :key="book.id" :value="book.id">{{ book.name }}</option>
      </select>

  <v-menu        
    v-model="fromDateMenu"
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

    <p>Trả sách không?</p>
    <v-switch v-model="isReturnBook" :label="this.isReturnBook ? 'Có' : 'Không' "></v-switch>

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
      }
    },
    data () {
      return {
        valid: true,
        select: null,
        order: {
        id: '',
        idBook: '',
        nameBook: '',
        idSV: '',
        isReturnBook: '',
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
        this.order.id = this.$store.getters.ordersCount
        this.order.idBook = this.select
        this.order.nameBook = this.$store.state.books[this.select].name,
        this.order.idSV = this.idSV
        this.order.isReturnBook = this.isReturnBook

        this.$store.state.orders.push(this.order)
        this.$emit('clicked', 'ShowOrder')
      },

      edit () {
        var index = this.$store.getters.getBookIndexById(this.idOrder)
        this.$store.state.order[index] = {
          id: this.idOrder,
          idBook: this.select,
          nameBook: this.$store.state.books[this.select].name,
          idSV: this.idSV,
          isReturnBook: this.isReturnBook,
        }
        this.$emit('clicked', 'ShowOrder')
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
