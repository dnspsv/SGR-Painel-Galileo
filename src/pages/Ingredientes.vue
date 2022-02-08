<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <TituloPagina titulo="INGREDIENTES" />

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="row q-col-gutter-md"
          ref="formIngrediente"
        >
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
                (val && val.length > 0) ||
                'O nome do ingrediente é obrigatório',
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
            style="text-transform: uppercase; padding-bottom: 15px"
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
            :rules="[
              (val) => val || 'Selecione uma unidade de medida é obrigatório',
            ]"
          />
          <div class="q-pb-lg">
            <q-toggle
              color="black"
              v-model="dense"
              label="Ativar Ingrediente"
            />
          </div>

          <div class="col-12">
            <input type="hidden" v-model="form.uuid" />
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
            labelPesquisa="Pesquisar Ingredientes"
            v-model="pesquisa"
            @input="pesquisa = $event.target.value"
          />

          <div
            v-for="info in comFiltro"
            :key="info.uuid_ingrediente"
            style="width: 100%"
          >
            <q-card class="my-card bg-grey-2" bordered>
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <input type="hidden" :value="info.uuid_ingrediente" />
                  <div class="text-h6">{{ info.nm_ingrediente }}</div>
                  <div class="text-subtitle2">{{ info.obs_ingrediente }}</div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  size="xs"
                  round
                  icon="edit"
                  color="black"
                  title="Editar um ingrediente"
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
import { ref } from "vue";
import { defineComponent } from "vue";
import TituloPagina from "components/TituloPagina.vue";
import PesquisarRegistro from "components/PesquisarRegistro.vue";

export default defineComponent({
  name: "PageIngrediente",
  data() {
    return {
      pesquisa: "",
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

  components: {
    TituloPagina,
    PesquisarRegistro,
  },

  computed: {
    comFiltro() {
      if (this.pesquisa) {
        let exp = new RegExp(this.pesquisa.trim(), "i");
        return this.dados.filter((dado) => exp.test(dado.nm_ingrediente));
      } else {
        return this.dados;
      }
    },
  },

  created() {
    this.$api
      .get("/unidades", {
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
    this.listagem();
  },

  methods: {
    async onSubmit(evt) {
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
        status_ingrediente: this.dense,
      };

      if (this.dense === false) {
        if (confirm("Deseja realmente desativar o ingrediente?") === false)
          return "";
      }

      if (this.form.uuid === "") {
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
      this.$refs.formIngrediente.resetValidation();
    },
    async resetForm() {
      (this.dense = ref(true)),
        (this.model = ref(null)),
        (this.form = {
          uuid: "",
          nome: "",
          telefone: "",
        });
    },
    editar(info) {
      this.form.uuid = info.uuid_ingrediente;
      this.form.nome = info.nm_ingrediente;
      this.form.obs = info.obs_ingrediente;
      this.dense = ref(info.status_ingrediente);
      this.model = {
        label: info.tb_unidade.sigla_unidade,
        value: info.tb_unidade.uuid_unidade,
      };
    },
    async listagem() {
      this.$api
        .get("/ingredientes", {
          headers: { "Content-Type": "application/json" },
        })
        .then(
          (res) => {
            res.data.idErro ? (this.dados = []) : (this.dados = res.data);
          },
          (err) => console.log(err)
        );
    },
    gravarDados(dadosEnvio) {
      this.$api
        .post("/ingredientes", dadosEnvio)
        .then((response) => {
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    alterarDados(dadosEnvio) {
      this.$api
        .put("/ingredientes/" + this.form.uuid, dadosEnvio)
        .then((response) => {
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    async ajustarDataBr(dataHora) {
      data = new Date(dataHora);
      return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    },
  },
});
</script>
