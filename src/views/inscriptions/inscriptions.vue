<template>
  <div>
    <HeaderLayout />

    <DatatableInscriptions />

    <ModalInscription />
    <ModalConfirm />
  </div>
</template>

<script>

import HeaderLayout from "@/components/layout/HeaderLayout.vue";
import DatatableInscriptions from "@/components/datatables/DatatableInscriptions.vue";
import ModalInscription from "@/components/modal/ModalInscription.vue";
import ModalConfirm from "@/components/modal/ModalConfirm.vue";

export default {
  name: "inscriptions",
  components: {
    HeaderLayout,
    DatatableInscriptions,
    ModalInscription,
    ModalConfirm
  },
  data() {
    return {
      mensaje : ' ',
      msg:2
    }
  },
  // Observadores
  watch: {
    
  },
  // Antes de que cargue la pagina
  beforeMount() {
  },
  // Filtros
  computed: {    
    
  }, 
  
  // Metodos
  methods:{

    crear(){
      this.$bvModal.show('modal-scoped');
    },

  }  
};
</script>

<style lang="scss">

</style>