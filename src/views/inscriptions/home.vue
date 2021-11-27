<template>
  <div>
    <HeaderLayout />

    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Inscripciones Hogwarts</h1>
        <p class="col-md-12 fs-4">Inscripciones para el próximo periodo académico (Gryffindor, Hufflepuff , Ravenclaw , Slytherin )</p>
        <router-link to="/inscriptions" class="menu-button">
          <b-button variant="outline-primary" size="lg">Inscribirme</b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import HeaderLayout from "@/components/layout/HeaderLayout.vue";

export default {
  name: "home",
  components: {
    HeaderLayout
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