<template>  
  <div>
    <b-button variant="outline-primary" @click="editar()" size="xs" class="m-1">Editar</b-button>
    <b-button variant="outline-danger" @click="eliminar()" size="xs" class="m-1">Eliminar</b-button>
  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "SelectRow",
  data() {
    return {
      
    }
  },
  props: ['row'],
  computed: {
    ...mapState(
      "inscriptionStore",[
        "inscriptions", "houses", "loadingSave", 
        "loading", "inscriptionsSelected"
      ]
    ),
    
  },
  methods: {
    ...mapActions(
      'inscriptionStore',[
        'actGetInscriptions', "actGetHouses", "actSetInscription",
        "actSetInscriptionSelected"
      ]
    ),

    editar(){
      let inscription = {
        id: this.row.id,
        name: this.row.name,
        lastname: this.row.lastname,
        identification: this.row.identification,
        age: this.row.age,
        house: this.row.house.id
      };
      this.actSetInscriptionSelected(inscription);
      this.$bvModal.show('modal-edit');
    },

    eliminar(){
      let inscription = {
        id: this.row.id,
        name: this.row.name,
        lastname: this.row.lastname,
        identification: this.row.identification,
        age: this.row.age,
        house: this.row.house.id
      };
      this.actSetInscriptionSelected(inscription);
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