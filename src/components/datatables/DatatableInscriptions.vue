<template> 
  <div class="row">
    <div class="col-12">
        <b-button variant="outline-success" @click="crear()" size="lg">Nueva inscripción</b-button>
        <figure class="text-end">
          <blockquote class="blockquote">
            <p>Doble clic para editar el registro.</p>
          </blockquote>
        </figure>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <datatable
          :columns="datatable.columns"
          :data="inscriptions.data"
          :per-page="size"
          :page="inscriptions.last_page"  
          :current-page="pagina"
          class="table table-hover caption-top rounded-circle"          
        >
          <template slot-scope="{ row, columns }">
            <tr @dblclick="editar(row)">
              <template>
                <datatable-cell v-for="(column, j) in columns" 
                  :key="j" 
                  :column="column" 
                  :row="row"
                  >
                </datatable-cell>
              </template>
            </tr>
          </template>
        </datatable>
        <div class="col-12">
          <b-pagination
            align="center"
            v-model="pagina"
            :total-rows="inscriptions.total"
            :per-page="size"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import OpcionesDatatable from "@/components/datatables/OpcionesDatatable.vue";

export default {
  name: "DatatableInscriptions",
  data() {
    return {
      datatable: {
        filter: "",
        total: null,
        per_page: null,
        page: null,
        last_page: null,
        columns: [
          {
            label: "Nombre",
            field: "name",
            align: "center",
            headerClass: "text-left",
            sortable: true,
          },
          {
            label: "Apellido",
            field: "lastname",
            align: "center",
            headerClass: "text-left",
            sortable: true,
          },
          {
            label: "Identificación",
            field: "identification",
            align: "center",
            sortable: true,
            headerClass: "text-left",
          },
          {
            label: "Edad",
            field: "age",
            align: "center",            
            headerClass: "text-right",
            
          },
          {
            label: "Escuela",
            field: "house.name",
            align: "center",            
            headerClass: "text-right",
          },
          {
            label: "Opciones",
            field: "house.name",
            align: "center",  
            sortable: false,          
            component: OpcionesDatatable
          }
        ],
        rows: [],
      },
    }
  },
  props: [],
  computed: {
    ...mapState(
      "inscriptionStore",[
        "inscriptions", "houses", "size"
      ]
    ),

    pagina: {
      get () {
        return this.inscriptions.per_page;
      },
      set (val) {
        this.actSetPagina(val);
        this.obtenerDatatable(val, 'set');        
      }
    },
  },

  watch: {
    
  },

  beforeMount() {
    
  },

  methods: {
    ...mapActions(
      'inscriptionStore',[
        'actGetInscriptions', "actGetHouses", "actSetPagina"
      ]
    ),

    crear(){
      this.$bvModal.show('modal-edit');
    },

    refrescar(){
      this.obtenerDatatable(this.pagina, 'refrescar');
    },

    obtenerDatatable(pagina, donde){
      console.log('obtenerDatatable', donde, pagina);
      let data = [];
      data = {
        'page': (pagina == null)? 1:pagina,
        'size': this.size,
      };
      
      this.actGetInscriptions(data).then((res) =>{
        console.log(res);
      })
      .catch((response) => {
        this.error.flag = true;
        this.error.class = "is-invalid";
        this.error.message = "No se pudo conectar al servicio: error: "+response;
      });
    },

  },
};
</script>

<style lang="scss" scoped>

</style>