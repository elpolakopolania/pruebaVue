<template> 
    <div>
      <b-modal id="modal-confirm" centered>
        <template>
          <div class="col-12 text-center">
            <h3><b>Titulo modal confirmar</b></h3>
            <p>Contenido modal confirmar</p>
          </div>
        </template>
        
        <template #modal-footer="{ ok }" class="text-center">
          <div class="col-12 text-center">
            <b-button pill class="text-center" size="lg" variant="success" @click="ok()">
              Guardar
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
</template>

<script>

export default {
  name: "ModalConfirm",
  data() {
    return {
      selected: false
    }
  },
  props: [],
  computed: {
    
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>