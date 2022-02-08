<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <TituloPagina titulo="UNIDADES" />

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="row q-col-gutter-md"
          ref="formUnidade"
        >
          <q-input
            outlined
            clearable
            type="text"
            v-model="form.sigla_unidade"
            label="Tipo da unidade"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) =>
                (val && val.length === 2) ||
                'O tipo da unidade é obrigatório e máximo 2 digitos',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="view_array" />
            </template>
          </q-input>

          <div class="col-12">
            <input type="hidden" v-model="form.uuid_unidade" />
            <q-btn
              label="Gravar"
              type="submit"
              color="black"
              class="float-right"
              icon="save"
            />
            <q-btn
              label="Limpar"
              type="reset"
              color="default"
              class="float-right text-grey-10 q-mr-md"
              icon="restore_from_trash"
            />
          </div>
        </q-form>
      </div>

      <div class="col-md-6 col-xs-12" style="overflow-y: scroll; height: 600px">
        <div
          class="q-pa-md row items_start q-gutter-md flex flex-center"
          style="max-heigth: 50px"
        >
          <PesquisarRegistro
            labelPesquisa="Pesquisar Unidades"
            v-model="pesquisa"
            @input="pesquisa = $event.target.value"
          />
          <div
            v-for="info in comFiltro"
            :key="info.uuid_unidade"
            style="width: 100%"
          >
            <q-card class="my-card bg-grey-2" bordered>
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <input type="hidden" :value="info.uuid_unidade" />
                  <div class="text-h4">{{ info.sigla_unidade }}</div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  size="xs"
                  round
                  icon="edit"
                  color="black"
                  title="Editar uma unidade"
                  @click="editar(info)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { defineComponent } from "vue";
import TituloPagina from "components/TituloPagina.vue";
import PesquisarRegistro from "components/PesquisarRegistro.vue";

export default defineComponent({
  name: "PageUnidade",
  data() {
    return {
      pesquisa:"",
      dados: [],
      form: {
        sigla_unidade: "",
        uuid_unidade: "",
      },
    };
  },
  
  components:{
    TituloPagina,
    PesquisarRegistro
  },
  computed: {
    comFiltro() {
      if (this.pesquisa) {
        let exp = new RegExp(this.pesquisa.trim(), "i");
        return this.dados.filter((dado) => exp.test(dado.sigla_unidade));
      } else {
        return this.dados;
      }
    },
  },
  created() {
    this.listagem();
  },
  methods: {
    listagem() {
      this.$api
        .get("/unidades", {
          headers: { "Content-Type": "application/json" },
        })
        .then(
          (res) => {
            res.data.idErro ? (this.dados = []) : (this.dados = res.data);
          },
          (err) => console.log(err)
        );
    },
    editar(dados) {
      this.form.uuid_unidade = dados.uuid_unidade;
      this.form.sigla_unidade = dados.sigla_unidade;
    },
    async onSubmit() {
      const dadosEnvio = {
        sigla_unidade: this.form.sigla_unidade,
      };
      if (this.form.uuid_unidade === "") {
        this.gravarDados(dadosEnvio);
      } else {
        this.alterarDados(dadosEnvio);
      }
      this.$q.notify({
        message: "Gravado com sucesso",
        color: "positive",
        icon: "check_circle_outline",
      });

      this.onReset();
    },
    async onReset() {
      await this.resetForm();
      this.$refs.formUnidade.resetValidation();
    },
    async resetForm() {
      this.form = {
        uuid_unidade: "",
        sigla_unidade: "",
      };
    },
    gravarDados(dadosEnvio) {
      this.$api
        .post("/unidades", dadosEnvio)
        .then((response) => {
          console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    alterarDados(dadosEnvio) {
      this.$api
        .put("/unidades/" + this.form.uuid_unidade, dadosEnvio)
        .then((response) => {
          console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
