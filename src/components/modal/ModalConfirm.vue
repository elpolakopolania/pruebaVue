<template> 
    <div>
      <b-modal id="modal-confirm" @hidden="cancelar"  hide-footer>
        <b-overlay :show="loadingDelete" rounded="sm">
          <div class="col-12">
            <h3><b>Eliminar</b></h3>
            <p>¿Esta seguro que quiere eliminar la inscripción de <b>{{ inscriptionsSelected.name + inscriptionsSelected.lastname }}</b>?</p>
          </div>
          <div class="col-12">
            <b-button variant="outline-danger" @click="eliminar">
              si
            </b-button>
            <b-button @click="cancelar" variatn="outline" class="m-2">
              Cancelar
            </b-button>
          </div>
        </b-overlay>
      </b-modal>
    </div>
</template>

<script>

import {mapActions, mapState} from 'vuex';

export default {
  name: "ModalConfirm",
  data() {
    return {
      selected: false
    }
  },
  props: [],
  computed: {
    ...mapState(
      'inscriptionStore',[
        'inscriptionsSelected', 'pagina', "loadingDelete", "size"
      ]
    )
    
  },
  methods: {
    ...mapActions(
      'inscriptionStore',[
        'actDeleteInscription', 'actGetInscriptions'
      ]
    ),

    eliminar(){
      this.actDeleteInscription(this.inscriptionsSelected.id).then(() =>{
        let data =  {'page': this.pagina,'size': this.size};
        this.actGetInscriptions(data).then();
        this.$bvModal.hide('modal-confirm');
      });
    },

    cancelar() {
      this.$bvModal.hide('modal-confirm');
    }, 
    
  },
};
</script>

<style lang="scss" scoped>

</style>