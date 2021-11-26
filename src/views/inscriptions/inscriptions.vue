<template>
  <div>Inscripciones howar</div>
</template>

<script>
import HeadingUser from "@/components/user/HeadingUser.vue";
import MainBarMenuV2 from "@/components/layouts/MainBarMenuV2.vue";
import { mapActions, mapState } from "vuex";
import serverConfig from "../../services/config";

export default {
  name: "tipspointsale",
  components: {
    MainBarMenuV2,
    //TemplateLetter,
    HeadingUser,    
  },
  data() {
    return {
      escenario:[],
      pagina: null,
      bodegaSelected: null,
      bodegas: [],
      mensaje: '',

      // Modal
      bodega_title: '',
      pdvSelected: {},
      escenarioM:null,

      // Listado de turnos
      datatable: {
        filter: "",
        total: 18,
        per_page: 9,
        page: 1,
        last_page: 2,
        columns: [
          {
            label: "Nombre del Punto de Venta",
            field: "name",
            align: "left",
            sortable: true,
            headerClass: "text-left",
          },
          {
            label: "Codigo",
            field: "code",
            align: "left",            
            headerClass: "text-left",
            
          },
          {
            label: "Escenario",
            field: "scene_name",
            align: "right",            
            headerClass: "text-right",
          }
        ],
        rows: [],
      },

      selected: [], // Must be an array reference!
      checked: false, 
      text: '',
      serverPath: serverConfig.permisosURL,
      error: {
        flag: false,
        class: "", //is-valid
        message: "",
      },
      success: {
        flag: false,
        class: "", //is-invalid
        message: "",
      },
    };
  },

  watch: {
    pagina: function(pagina){
      this.obtenerDatatable(pagina);
    }
  },

  beforeMount() {
    // obtener pdv
    this.getPdv();
  },
  computed: {    
    ...mapState("modCore", [
      "user", "userData"
    ]),
    ...mapState("modTipshiftPointSale", [
      "turnos", "loadingH", "pointSaleIndex", "loadingSave"
    ]),
  }, 
  
  methods:{
    ...mapActions("modRequest", [
      "actGetSettings",
    ]),

    ...mapActions("modTipshiftPointSale",[
      "actGetDatatable", "actSavePdvEscenarios", "actGetIndex"
    ]),

    obtenerDatatableFilter(pagina){
      this.pagina = pagina;
      this.obtenerDatatable(this.pagina);
    },

    obtenerDatatable(pagina){
      let data = [];
      data = {
        'page': pagina,
        pro_scene_id: this.escenario,
        point_sale_id: this.bodegaSelected
      };
      
      this.actGetDatatable(data).then((response) =>{
        this.actualizarTabla(response);
      })
      .catch((response) => {
        this.error.flag = true;
        this.error.class = "is-invalid";
        this.error.message = "No se pudo conectar al servicio: error: "+response;
      });
    },

    limpiar(){
      this.escenario = [];
      this.bodegaSelected = null;
      this.pagina = 1;
      this.obtenerDatatable(this.pagina);
    },

    getPdv(){
      // Obtener la cargar de la página
      this.actGetIndex();
      // Obtener el listado de turnos
      this.obtenerDatatable(1);
    },

    verRegistro(row){
      // ABRIR MODAL
      this.message = '';
      this.escenarioM = null;
      this.pdvSelected = row;
      this.bodega_title = row.name;
      this.$bvModal.show('modal-scoped');
    },

    confirmar(){
      if(this.escenarioM){
        this.modalConfirmar();
      }
    },

    modalConfirmar(){
      // Mostrar ventana para confirmar
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('¿Estás segura/o de asignarle a la bodega '+this.pdvSelected.name+' el escenario '+this.escenarioM+'?', {
        title: '',
        okVariant: '',
        cancelVariant: 'success',
        okTitle: 'No, seguir editando',
        cancelTitle: 'Si, estoy seguro',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
      .then(value => {
        // si es false => confirmar cambio 
        if(!value){
          // Guardar escenario
          let data  = {
            pro_scene_id: this.escenarioM,
            id: this.pdvSelected.id
          };
          this.actSavePdvEscenarios(data).then((res) =>{
            // mostrar msg
            this.mensaje = res.message;
            this.$bvModal.hide('modal-scoped');
            this.$bvModal.show('modal-msg');
            //this.obtenerDatatable(1);
          })
          .catch((response) => {
            this.error.flag = true;
            this.error.class = "is-invalid";
            this.error.message = "No se pudo conectar al servicio: error: "+response;
          });
        }
      })
      .catch(err => {
        // An error occurred
        console.log(err);
      });
    },

    actualizarTabla(response){
      this.datatable.rows = response.data.data;
      this.datatable.last_page = response.data.last_page;
      this.datatable.per_page = response.data.per_page;
      this.datatable.total = response.data.total;
    },

  }  
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.page-tips-pint-sale {
  .table tbody tr td {
    font-size: 10px;
    color: #454545;
  }
  
  
  .title-3 {
        font-size: 24px;
        font-weight: bold;
        color: #1C3A4E;
      }
  .cont-request-text {    
    .cont-title {
      color: #1c3a4e;
      .title-1 {
        font-size: 40px;
        font-weight: bold;
      }
      .title-2 {
        font-weight: bold;
        font-size: 25px;
        line-height: 27px;

        @media (min-width: 768px) {
          font-size: 80px;
          line-height: 80px;
        }
      }
    }
    .form-request {         
      .button1 {
        font-family: "Open Sans";
        background: #E9ECEE;
        color: #1C3A4E;
        font-weight: bold;
        //border-radius: 50px;
        height: 32px;
        font-size: 14px;
        text-align: left !important;   
        padding-left: 5%;
        padding-right: 5%;
        outline: none;
        border: none;
        &:hover {
          background: darken(#cddce6, 5);
          border: none;
        }
      }
      
      .button2 {
        background: #8d9092;
        color: #ffffff;
        border-color: #8d9092;
        font-family: "Poppins";
        border-radius: 100px;
        height: 42px;
        width: 220px;
        font-size: 14px;
        text-align: center !important;  
        padding-left: 2%;
        padding-right: 2%;
        &:hover {
          background: darken(#7a7c7e, 5);
        }

        .button3{          
          border-radius: 50px;
          font-family: "Open Sans";
          color: #1c3a4e;
          font-size: 20px;
          border: 0 none;
          outline: none;
          text-decoration: none;
          border: 2px solid #1c3a4e;
          /*&:hover {
              text-decoration: none;
              color: #ffffff;
              background: darken(#1c3a4e, 5);
          }*/
        }
      }
    }
  }
  .p1 {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #454545;
  }
  .p2 {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 15px;
    //color: #979494;
    text-align: center !important;  
  } 
  .p3 {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #999797;
  }
  .center {
    display: flex;
    align-items: center;
  }

  .button4 {
    background: #99A6AF;
    color: #ffffff;
    border-radius: 8px;
    height: 20px;
    font-size: 8px;
    text-align: left !important;   
    padding-left: 5%;
    padding-right: 5%;
    &:hover {
      background: darken(#99A6AF, 5);
    }
  }   
  .collapsed > .when-opened,
      :not(.collapsed) > .when-closed {
          display: none;
      }

  .centerImg2 {
    vertical-align: middle;
    position: relative;
    bottom: 2px;
    padding-right: 2%;
  }

  .centerImg1 {
    width: 16px;
    height: 16px;
    top: 100%; 
    float: right;
  }
  .mycheck 
  { 
    width: 1.3em;
    height: 1.3em;
    
    border-radius: 30%;
    vertical-align: middle;
    border: 1px solid #ddd;
    -webkit-appearance: none;
  }

  .mycheck:checked {
    background-color: #1C3A4E;
  }

    /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 19px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: #242424;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #779B49;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #779B49;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .style-filter .vs__search::placeholder,
  .style-filter .vs__dropdown-toggle,
  .style-filter .vs__dropdown-menu {
    background: #dfe5fb;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
    font-size: 11px;
    line-height: 12px;
  }

  .style-filter .vs__clear,
  .style-filter .vs__open-indicator {
    fill: #394066;
  }

  
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Add animation to "page content" */
  .animate-bottom {
    position: relative;
    -webkit-animation-name: animatebottom;
    -webkit-animation-duration: 1s;
    animation-name: animatebottom;
    animation-duration: 1s
  }

  @-webkit-keyframes animatebottom {
    from { bottom:-100px; opacity:0 } 
    to { bottom:0px; opacity:1 }
  }

  @keyframes animatebottom { 
    from{ bottom:-100px; opacity:0 } 
    to{ bottom:0; opacity:1 }
  }

  #myDiv {
    display: none;
    text-align: center;
  }

  .nav-item{
    text-decoration-color: #1c6776 !important;
    border-left-color:#1c6776 !important;
    border-left-width: thick !important;
    background-color: rgba(0, 0, 0, 0.03) !important;
  }

  .card-header{
    background-color: none !important;
  }

  .cont-search {
      label {
        font-size: 11px;
        color: #454545;
      }
      .cont-input {
        background: #1c3a4e;
        border-radius: 4px;
        padding: 1px;
        width: fit-content;
        float: left;

        .input-text {
          padding: 8px;
          min-width: 160px;
          border-radius: 4px;
          font-style: italic;
          font-weight: 300;
          font-size: 12px;
          color: #bbbbbb;
          border: 0 none;
          &:focus {
            outline: none;
          }
        }
        button {
          background: transparent;
          border: 0 none;
          color: #ffffff;
        }

        @media (min-width: 768px) {
          float: right;
        }
      }
    }
    a:hover, a:focus, a:active {
      text-decoration: none;
      color: inherit;
    }
    .button1 {
      font-family: "Open Sans";
      background: #E9ECEE;
      color: #1C3A4E;
      font-weight: bold;
      //border-radius: 50px;
      height: 32px;
      font-size: 14px;
      text-align: left !important;   
      padding-left: 5%;
      padding-right: 5%;
      outline: none;
      border: none;
      &:hover {
        background: darken(#cddce6, 5);
        border: none;
      }
    }
    .div1 {
      border: 0px solid black;
      margin-top: 0px;
      margin-bottom: 0px;
      margin-right: 40px;
      margin-left: 40px;    
    }
    .tabla1{  
      border-radius: 5px;
      border: 3px solid #E9ECEE;
      border-color: #E9ECEE;  
      background: #E9ECEE;
      -moz-border-radius: 6px;
      border-collapse: separate;
      border-spacing: 0px;    
      padding-left: 5%;
      align-self: left;
    }
    .td1 {
      color: #1C3A4E;
      font-family: "Open Sans";
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      padding-left: 0%;
      padding-right: 3%;
      text-align: left;
    }
    .td2 {
      background: #E9ECEE;
      color: #1C3A4E;
      font-family: "Open Sans";
      font-weight: normal;
      font-style: normal;
      font-size: 13px;
      line-height: 14px;
      text-align: left;
      padding-left: 4%;
      padding-right: 4%;
    }
    .td3 {
      background: #ffffff;
      color: #1C3A4E;
      font-family: "Open Sans";
      font-weight: normal;
      font-style: normal;
      font-size: 13px;
      line-height: 40px;
      //width: 50px;
      text-align: left;
      padding-left: 4%;
      padding-right: 4%;
    }
    .td4 {
      background: #1C3A4E;
      color: #ffffff;
      font-family: "Open Sans";
      //font-weight: bold;
      font-size: 12px;
      line-height: 25px;
      padding-left: 1%;
      padding-right: 1%;
      width: 100px;
      text-align: left;
    }
    .p2 {
      font-family: "Open Sans";
      font-style: normal;
      //font-weight: 600;
      font-size: 14px;
      line-height: 15px;
      //color: #454545;
      text-align: left !important;
      
    }
    .collapsed > .when-opened,
        :not(.collapsed) > .when-closed {
            display: none;
        }
    .centerImg1 {
      width: 16px;
      height: 16px;
      top: 100%; 
      float: right;
    }
    .leftImg1 {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    /* Center the loader */
    #loader {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      width: 150px;
      height: 150px;
      margin: 85px 0 0 -75px;
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Add animation to "page content" */
    .animate-bottom {
      position: relative;
      -webkit-animation-name: animatebottom;
      -webkit-animation-duration: 1s;
      animation-name: animatebottom;
      animation-duration: 1s
    }

    @-webkit-keyframes animatebottom {
      from { bottom:-100px; opacity:0 } 
      to { bottom:0px; opacity:1 }
    }

    @keyframes animatebottom { 
      from{ bottom:-100px; opacity:0 } 
      to{ bottom:0; opacity:1 }
    }

    #myDiv {
      display: none;
      text-align: center;
    }
    .mycheck 
    { 
      vertical-align: middle;
      position: relative;
      bottom: 1px;
    }
    @media only screen and (max-width: 600px) {
    .td2 {
      width: 33%;
    }
  }

  .tab-filtros{
    /* Neutral / Gray blue light */
    background: #F5F5F5;
    /* Neutral / Gray 3 */
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    /* up leve */
    box-shadow: 0px 8px 8px rgba(110, 116, 134, 0.16);
    border-radius: 8px;
  }

  table {
    //border-collapse: collapse;
    border-radius: 8px !important;
  }

  thead > tr{
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      /* Alert / Info Bg */
      background: #EEF2FA;
      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
      margin: 0px 0px;

      /* Body Tablas - Párrafo mediano */
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      /* Neutral / Black */
      color: #000000;
  }

  tbody > tr{
    /* Body Tablas - Párrafo mediano */
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    /* Neutral / Gray 1 */
    color: #454545;
  }

  table > input {
    border: 1px solid #AAAAAA;
    box-sizing: border-box;
    border-radius: 2px;
    background: #269887;
  }

  .titulo-pagina{
    /* Subtítulos */
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      /* identical to box height */
      /* Primary / 1 */
      color: #1C3A4E;
  }
}

/* Center the loader */
  .loader {
    position: relative;
    z-index: 1072;
    left: 50%;
    top: 50%;
    z-index: 1;    
    
    margin: -75px 0 0 -75px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  .content-loader{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1071;
    background-color: #fff;
    opacity: 0.9;
  }
</style>