<template lang="html">

  <v-app>
    <h1>Category</h1>
    <v-form
      ref="form"
      v-model="valid"
      class="mt-5"
    >
      <v-text-field
        v-model="categoryName"
        :rules="categoryNameRules"
        label="Category Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="changeCategory"
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
    name: 'change-category',
    props: {
      idCategory : {
        type : Number
      }},
    mounted () {
      var category = this.$store.getters.getCategoryById(this.idCategory)
      if (category) {
        this.categoryName = category.name
        this.description = category.description
      }
    },
    data () {
      return {
      valid: true,
      categoryName: '',
      categoryNameRules: [
        v => !!v || 'Name is required',
      ],
      description: '',
      descriptionRules: [
      ],
      category: {
        id: '',
        name: '',
        description: ''
      }
      }
    },
    methods: {
      changeCategory () {
        console.log(this.idCategory);
        if (Number.isInteger(this.idCategory)) {
          this.edit()
        } else {
          this.add()
        }
      },
      add () {
        this.category.name = this.categoryName
        this.category.id = this.$store.getters.categoriesCount
        this.category.description = this.description
        this.$store.state.categories.push(this.category)
        this.$refs.form.reset()
        this.$emit('clicked', 'ShowCategory')
      },
      edit () {
        var index = this.$store.getters.getCategoryIndexById(this.idCategory)
        this.$store.state.categories[index] = {
          id: this.idCategory,
          name: this.categoryName,
          description: this.description
        }
        // this.$refs.form.reset()
        this.$emit('clicked', 'ShowCategory')
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
  .change-category {

  }
</style>
