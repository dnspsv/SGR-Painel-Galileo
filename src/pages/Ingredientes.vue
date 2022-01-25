<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div
        class="col-md-6 col-xs-12"
        style="border: solid 2px red; padding: 10px"
      >
        <div class="flex justify-center">
          <p class="text-h4">INGREDIENTES</p>
        </div>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="row q-col-gutter-md"
          ref="formIngrediente"
        >
          <q-input type="text" v-model="form.uuid"/>
          <q-input
            outlined
            clearable
            type="text"
            v-model="form.nome"
            label="Nome do Ingrediente"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'O nome do ingrediente é obrigatório',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="view_array" />
            </template>
          </q-input>

          <q-input
            outlined
            clearable
            type="text"
            v-model="form.obs"
            label="Observações"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="note_add" />
            </template>
          </q-input>

          <q-select
            name="sigla_unidade"
            outlined
            v-model="model"
            :options="dadosUnidade"
            label="Unidade de medida"
            style="width: 280px"
          />
          <div class="q-pb-lg">
            <q-toggle v-model="dense" label="Ativar Ingrediente" />
          </div>

          <div class="col-12">
            <q-btn
              label="Cadastrar"
              type="submit"
              color="black"
              class="float-right"
            />
            <q-btn
              label="Limpar"
              type="reset"
              color="default"
              class="float-right text-grey-10 q-mr-md"
            />
          </div>
        </q-form>
      </div>

      <div class="col-md-6 col-xs-12" style="border: solid 1px black">
        <div
          class="q-pa-md row items_start q-gutter-md flex flex-center"
          style="max-heigth: 50px"
        >
          <q-input
            style="width: 100%"
            color="with"
            label-color="black"
            outlined
            v-model="pesquisa"
            label="Pesquisar Ingredientes"
          >
            <template v-slot:append>
              <q-icon name="search" color="orange" />
            </template>
          </q-input>
          <div
            v-for="info in dados"
            :key="info.uuid_ingrediente"
            style="width: 100%"
          >
            <q-card class="my-card bg-secundary">
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <div class="text-h6">{{ info.uuid_ingrediente }}</div>
                  <div class="text-h6">{{ info.nm_ingrediente }}</div>
                  <div class="text-subtitle2">{{ info.obs_ingrediente }}</div>
                  <div class="text-subtitle2">{{ info.data_criacao }}</div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn round icon="edit" color="black" @click="editar(info)"/>
                <q-btn round icon="delete" color="black" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageIngrediente",
  data() {
    return {
      
      pesquisa:'',
      dense: ref(true),
      model: ref(null),
      dados: [],
      dadosUnidade: [],
      form: {
        nome: "",
        obs: "",
        uuid: "",
      },
    };
  },
  created() {
    axios
      .get("http://localhost:3030/ingredientes", {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          res.data.idErro ? (this.dados = []) : (this.dados = res.data);
        },
        (err) => console.log(err)
      );

    axios
      .get("http://localhost:3030/unidades", {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          for (var i = 0; i < res.data.length; i++) {
            var obj = {
              label: "",
              value: "",
            };
            obj.label = res.data[i].sigla_unidade;
            obj.value = res.data[i].uuid_unidade;
            this.dadosUnidade.push(obj);
          }
        },
        (err) => console.log(err)
      );
  },

  methods: {
    onSubmit(evt) {
      const formData = new FormData(evt.target);
      const data = [];

      for (const [name, value] of formData.entries()) {
        data.push({
          name,
          value,
        });
      }

      const dadosEnvio = {
        nm_ingrediente: this.form.nome,
        obs_ingrediente: this.form.obs,
        uuid_unidade: data[0].value,
      };

      //alert(data[0].value);

      axios
        .post("http://localhost:3030/ingredientes", dadosEnvio)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          //console.log(error);
        });

      this.$q.notify({
        message: "Cadastrado com sucesso",
        color: "positive",
        icon: "check_circle_outline",
      });

      this.onReset();
    },
    async onReset() {
      await this.resetForm();
      this.$refs.formIngrediente.resetValidation();
    },
    async resetForm() {
      this.form = {
        nome: "",
        telefone: "",
      };
    },
    editar(info){
      this.form.uuid = info.uuid_ingrediente;
      this.form.nome = info.nm_ingrediente;
      this.form.obs = info.obs_ingrediente;
      this.dense = ref(info.status_ingrediente);
      this.model= ref(info.tb_unidade.sigla_unidade);
    },
  },
});
</script>
