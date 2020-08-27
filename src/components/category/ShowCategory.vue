<template lang="html">

   <div id="app">
  <v-app id="inspire">
    <h1>Category</h1>
    <v-data-table
      v-model="selected"
      :single-select="true"
      show-select
      item-key="id"
      :headers="headers"
      :items="categories"
      :sort-by="[]"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
    <v-form>
    <v-btn color="error" class="mr-4" :disabled="!selected.length" @click="deleteCategory">Delete</v-btn>
    <v-btn color="info" class="mr-4" :disabled="!selected.length" @click="edit">Edit</v-btn>
    <v-btn color="success" class="mr-4" @click="add">Add</v-btn>
      </v-form>
  </v-app>

</div>


</template>

<script lang="js">

  export default  {
    name: 'show-category',
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
        { text: 'Tên', value: 'name' },
        { text: 'Mô Tả', value: 'description' },
      ],
      categories: this.$store.state.categories,
      selected: [],
      }
    },
    methods: {
      deleteCategory () {
        this.categories = this.categories.filter(category => category.id != this.selected[0].id);
        console.log(this.$store.state.categories)
        this.$store.state.categories = this.categories
      },
      edit () {
        this.$emit('clicked', 'ChangeCategory', this.selected[0].id)
      },
      add () {
        this.$emit('clicked', 'ChangeCategory')
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-category {

  }
</style>
