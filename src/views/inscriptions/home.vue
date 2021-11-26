<template>
  <div>Inscripciones howar HOOOME {{ mensaje }}</div>
</template>

<script>

export default {
  name: "home",
  components: {

  },
  data() {
    return {
      mensaje : 'Hola mundo!! inscripciones',
      msg:2
    }
  },
  // Observadores
  watch: {
    
  },
  // Antes de que cargue la pagina
  beforeMount() {
    this.msgAlert();
  },
  // Filtros
  computed: {    
    
  }, 
  
  // Metodos
  methods:{
    msgAlert(){
      //alert('Pagina inicializada');
    }

  }  
};
</script>

<style lang="scss">

</style>