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
          :data="datatable.rows"
          :per-page="size"
          :page="datatable.last_page"  
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
            :total-rows="datatable.last_page"
            :per-page="1"
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
import OpcionesDatatableHeader from "@/components/datatables/OpcionesDatatableHeader.vue";

export default {
  name: "DatatableInscriptions",
  data() {
    return {
      pagina: null,
      size:10,
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
            component: OpcionesDatatable, 
            headerComponent: OpcionesDatatableHeader 
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
        "inscriptions", "houses"
      ]
    )
  },

  watch: {
    pagina: function(newVal){
      this.obtenerDatatable(newVal);
    }
  },

  beforeMount() {
    this.$bvModal.show('modal-edit');
    this.obtenerDatatable(1);
  },

  methods: {
    ...mapActions(
      'inscriptionStore',[
        'actGetInscriptions', "actGetHouses"
      ]
    ),

    crear(){
      this.$bvModal.show('modal-edit');
    },

    refrescar(){
      this.obtenerDatatable(this.pagina);
    },

    obtenerDatatable(pagina){
      let data = [];
      data = {
        'page': (pagina),
        'size': this.size,
      };
      
      this.actGetInscriptions(data).then((response) =>{
        this.actualizarTabla(response);
      })
      .catch((response) => {
        this.error.flag = true;
        this.error.class = "is-invalid";
        this.error.message = "No se pudo conectar al servicio: error: "+response;
      });
    },

    actualizarTabla(response){
      this.datatable.rows = response.data;
      this.datatable.last_page = response.last_page;
      this.datatable.per_page = response.per_page;
      this.datatable.total = response.total;
    },

  },
};
</script>

<style lang="scss" scoped>

</style>