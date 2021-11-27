<template> 
    <div>
      <b-modal id="modal-edit" ref="modal-edit" @hidden="resetModal" hide-footer>
        <div class="col-12">
          <h3><b>Formulario de inscripción</b></h3>
          <b-form ref="form" @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Nombre:"
              label-for="input-1"
              class="mb-3"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
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
                v-model="form.lastname"
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
                v-model="form.identification"
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
                v-model="form.age"
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
                v-model="form.house"
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
        "inscriptions", "houses"
      ]
    ),

    validateName(){
      return (this.form.name == null)? null:this.form.name.length > 0 && this.form.name.length <= 20;
    },
    validateLastName(){
      return (this.form.lastname == null)? null:this.form.lastname.length > 0 && this.form.lastname.length <= 20;
    },
    validateIdentification(){
      return (this.form.identification == null)? null: (parseInt(this.form.identification)) ? this.form.identification.length > 0 && this.form.identification.length <= 10: false;
    },
    validateAge(){
      return (this.form.age == null)? null: (parseInt(this.form.age)) ? this.form.age.length > 0 && this.form.age.length <= 2: false;
    },

    validatehouse(){
      console.log(this.form.house);
      return (this.form.house == null)? false: true;
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
        'actGetInscriptions', "actGetHouses"
      ]
    ),

    onSubmit(event) {
        event.preventDefault()
        console.log(this.$refs.form.checkValidity(), 'checkValidity');
        alert(JSON.stringify(this.form))
      },


      onReset(event = null) {
        (event == null )? '':event.preventDefault();
        // Reset our form values
        this.form.name = null;
        this.form.lastname = null;
        this.form.identification = null;
        this.form.age = null;
        this.form.house = null;
      },

      cancelar() {
        this.$bvModal.hide('modal-edit');
      },  
      
      resetModal(){
        this.onReset();
      }
  },
};
</script>

<style lang="scss" scoped>

</style>