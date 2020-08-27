<template lang="html">

  <div class="main">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" @click="current= 'ListBooks'">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Book
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="current= 'ChangeBook'">Add</a>
          <a class="dropdown-item" @click="current= 'ShowBook'">Show</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="current= 'ChangeCategory'">Add</a>
          <a class="dropdown-item" @click="current= 'ShowCategory'">Show</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Order
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="current= 'ChangeOrder'">Add</a>
          <a class="dropdown-item" @click="current= 'ShowOrder'">Show</a>
        </div>
      </li>
    </ul>
  </div>
</nav>

<component :is="current" @clicked="onClickChild" :idCategory="idCategory" :idBook="idBook" :idOrder="idOrder"></component>


</div>

</template>

<script lang="js">
import ListBooks from './book/ListBooks'
import ChangeBook from './book/ChangeBook'
import ShowBook from './book/ShowBook'
import ChangeCategory from './category/ChangeCategory'
import ShowCategory from './category/ShowCategory'
import ChangeOrder from './order/ChangeOrder'
import ShowOrder from './order/ShowOrder'

  export default  {
    name: 'home',
    props: [],
    components : {
      ChangeCategory,
      ChangeBook,
      ChangeOrder,
      ShowCategory,
      ShowBook,
      ShowOrder,
      ListBooks
    },
    mounted () {

    },
    data () {
      return {
        current: "ListBooks",
        idCategory: null,
        idBook: null,
        idOrder: null,
      }
    },
    methods: {
      onClickChild (component, idCategory, idBook, idOrder, idOrderAdd) {
      console.log(component) // someValue
      this.current = component
      this.idCategory = idCategory
      this.idBook = idBook
      this.idOrder = idOrder
      this.idOrderAdd = idOrderAdd
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .home {

  }
  .sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 0;
}

/* The navigation menu links */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
  margin-right: 100px;
}
</style>
