<template> 
    <div>
      <b-modal id="modal-edit" ref="modal-edit" @hidden="cancelar" hide-footer>
        <b-overlay :show="loadingSave" rounded="sm">
          <div class="col-12">
            <h3><b>Formulario de inscripción</b></h3>
            <input type="hidden" v-model="inscriptionsSelected.id">
            <b-form ref="form" @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="input-group-1"
                label="Nombre:"
                label-for="input-1"
                class="mb-3"
              >
                <b-form-input
                  id="input-1"
                  v-model="inscriptionsSelected.name"
                  :state="validateName"
                  type="text"
                  placeholder="Ingrese su nombre"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="validateName">
                  EL nombre es rquerido y no debe superar los 20 caracteres.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group 
                id="input-group-2" 
                label="Apellido:" 
                label-for="input-2"
                class="mb-3"
                
                >
                <b-form-input
                  id="input-2"
                  v-model="inscriptionsSelected.lastname"
                  :state="validateLastName"
                  type="text"
                  placeholder="Ingrese su apellido"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="validateLastName">
                  EL apellido es rquerido y no debe superar los 20 caracteres.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group 
                id="input-group-3" 
                label="Identificación:" 
                label-for="input-3"
                class="mb-3"
                >
                <b-form-input
                  id="input-3"
                  v-model="inscriptionsSelected.identification"
                  :state="validateIdentification"
                  type="text"
                  placeholder="Ingrese su número de identificación"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="validateIdentification">
                  La identificación es requerida y no debe superar los 10 digitos.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group 
                id="input-group-4" 
                label="Edad:" 
                label-for="input-4"
                description=""
                class="mb-3"
                >
                <b-form-input
                  id="input-4"
                  v-model="inscriptionsSelected.age"
                  type="text"
                  :state="validateAge"
                  placeholder="Ingrese su edad"
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="validateAge">
                  La edad  es requerida y no debe superar los 2 digitos.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group id="input-group-3" label="Casa a la que aspira pertenecer:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="inscriptionsSelected.house"
                  :options="houses"
                  :state="validatehouse"
                  class="form-control"
                  value-field="id"
                  text-field="name"
                  required
                >
                </b-form-select>
                <b-form-invalid-feedback :state="validatehouse">
                  La casa es obligatoria.
                </b-form-invalid-feedback>
              </b-form-group>
              <div class="mt-4">
                <b-button @click="onSubmit" variant="outline-success" class="m-1" :disabled="!this.validateForm">Guardar</b-button>
                <b-button @click="onReset" variant="outline-danger" class="m-1">Resetear</b-button>
                <b-button @click="cancelar" variatn="outline" class="m-1">Cancelar</b-button>
              </div>
            </b-form>
          </div>
        </b-overlay>
      </b-modal>
    </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "ModalInscription",
  data() {
    return {
      selected: null,
      nameState: null,
      name:null,
      options: null,
      msg:{
          name: null,
          lastname: null,
          identification: null,
          age: null,
          house: null
        },
      form: {
          name: null,
          lastname: null,
          identification: null,
          age: null,
          house: null
        },
      show: true
    }
  },
  props: [],
  computed: {
    ...mapState(
      "inscriptionStore",[
        "inscriptions", "houses", "loadingSave", 
        "loading", "loadingUpdate", "loadingDelete","inscriptionsSelected", "size"
      ]
    ),

    validateName(){
      return (this.inscriptionsSelected.name == null)? null:this.inscriptionsSelected.name.length > 0 && this.inscriptionsSelected.name.length <= 20;
    },
    validateLastName(){
      return (this.inscriptionsSelected.lastname == null)? null:this.inscriptionsSelected.lastname.length > 0 && this.inscriptionsSelected.lastname.length <= 20;
    },
    validateIdentification(){
      return (this.inscriptionsSelected.identification == null)? 
                null: 
                (parseInt(this.inscriptionsSelected.identification)) ? 
                    this.inscriptionsSelected.identification.toString().length > 0 && this.inscriptionsSelected.identification.toString().length <= 10: 
                    false;
    },
    validateAge(){
      return (this.inscriptionsSelected.age == null)? 
              null: 
              (parseInt(this.inscriptionsSelected.age)) ? 
                  this.inscriptionsSelected.age.toString().length > 0 && this.inscriptionsSelected.age.toString().length <= 2:
                  false;
    },

    validatehouse(){
      console.log(this.inscriptionsSelected.house);
      return (this.inscriptionsSelected.house == null)? false: true;
    },

    validateForm(){
     if(!this.validateName) return false;
     if(!this.validateLastName) return false;
     if(!this.validateIdentification) return false;
     if(!this.validateAge) return false;
     if(!this.validatehouse) return false;
      return true;
    },

  },

  beforeMount() {
    this.actGetHouses();
  },
  methods: {
    ...mapActions(
      'inscriptionStore',[
        'actGetInscriptions', "actGetHouses", "actSaveInscription",
        "actSetInscriptionSelected", "actUpdateInscription"
      ]
    ),

    onSubmit(event) {
        event.preventDefault();
        let data = {
          name: this.inscriptionsSelected.name,
          lastname: this.inscriptionsSelected.lastname,
          identification: this.inscriptionsSelected.identification,
          age: this.inscriptionsSelected.age,
          house:this.inscriptionsSelected.house,
        };
        if(this.inscriptionsSelected.id == null){
          this.actSaveInscription(data).then((res) =>{
            let data =  {'page': 1,'size': this.size};
            this.actGetInscriptions(data).then((res) =>{
              console.log(res);
            })
            .catch((response) => {
              this.error.flag = true;
              this.error.class = "is-invalid";
              this.error.message = "No se pudo conectar al servicio: error: "+response;
            });
            console.log('actSaveInscription',res);
            this.cancelar();
          });  
        }else{
          this.actUpdateInscription(this.inscriptionsSelected).then((res) =>{
            let data =  {'page': 1,'size': this.size};
            this.actGetInscriptions(data).then((res) =>{
              console.log(res);
            })
            .catch((response) => {
              this.error.flag = true;
              this.error.class = "is-invalid";
              this.error.message = "No se pudo conectar al servicio: error: "+response;
            });
            console.log('actUpdateInscription',res);
            this.cancelar();
          });   
        }
        
      },

      onReset(event = null) {
        (event == null )? '':event.preventDefault();
        // Reset our form values
        let inscript = {
          id : null,
          name: null,
          lastname: null,
          identification: null,
          age: null,
          house: null
        };
        this.setearInscription(inscript);
      },

      cancelar() {
        this.onReset();
        this.$bvModal.hide('modal-edit');
      },  

      setearInscription(inscription){
        this.actSetInscriptionSelected(inscription);
      },
  },
};
</script>

<style lang="scss" scoped>

</style>