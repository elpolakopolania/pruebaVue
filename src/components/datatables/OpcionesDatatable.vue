<template>  
  <div>
    <b-button variant="outline-primary" @click="editar()" size="xs" class="m-1">Editar</b-button>
    <b-button variant="outline-danger" @click="eliminar()" size="xs" class="m-1">Eliminar</b-button>
  </div>
</template>

<script>

export default {
  name: "SelectRow",
  data() {
    return {
      
    }
  },
  props: ['row'],
  computed: {
    
  },
  methods: {
    editar(){
      console.log('editar')
      this.$bvModal.show('modal-edit');
    },

    eliminar(){
      console.log('eliminar')
      this.$bvModal.show('modal-confirm');
    },
    
  },
  watch: {
    
  },
  updated: function () {

  }
};
</script>

<style lang="scss" scoped>

</style>