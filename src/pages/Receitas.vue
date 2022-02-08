<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <q-tabs v-model="tab" class="text-black">
          <q-tab name="receitas" icon="work" label="Receitas" />
          <q-tab name="ingredientes" icon="list" label="Itens" />
          <q-tab name="preparo" icon="edit" label="Preparo" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="receitas">
            <div class="row text-h6" style="padding: 5px">
              <div class="col"><TituloPagina titulo="RECEITAS" /></div>
              <div class="justify-right">
                <q-btn
                  label="Nova"
                  title="Nova Receita"
                  color="black"
                  icon="note_add"
                  @click="onResetReceita()"
                />
              </div>
            </div>

            <div style="padding: 10px">
              <q-form
                @submit="onSubmitReceita"
                @reset="onResetReceita"
                class="row q-col-gutter-md"
                ref="formReceita"
              >
                <input type="hidden" v-model="form.uuid_receita" />
                <q-input
                  outlined
                  clearable
                  type="text"
                  v-model="form.nm_receita"
                  label="Nome da Receita"
                  class="col-md-12 col-sm-12 col-xs-12"
                  color="black"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'O nome da receita é obrigatório',
                  ]"
                  style="margin-bottom: -10px"
                >
                  <template v-slot:prepend>
                    <q-icon name="receipt" />
                  </template>
                </q-input>

                <div class="row" style="width: 100%">
                  <div class="col-md-6 col-sm-6 col-xs-12">
                    <q-input
                      outlined
                      clearable
                      type="number"
                      v-model="form.prioridade"
                      label="Prioridade de produção"
                      color="black"
                      style="width: 100%"
                      hint="Quanto maior o número, maior será a prioridade na produção."
                    >
                      <template v-slot:prepend>
                        <q-icon name="trending_up" />
                      </template>
                    </q-input>
                  </div>
                  <div
                    class="col-md-4 col-sm-4 col-xs-12"
                    style="margin-top: 10px"
                  >
                    <q-toggle
                      color="black"
                      v-model="form.ativar"
                      :label="
                        form.ativar ? 'Receita Ativa' : 'Receita Desativada'
                      "
                    />
                  </div>

                  <div class="col-md-2 col-sm-2 col-xs-12">
                    <q-btn
                      title="Gravar uma receita"
                      type="submit"
                      color="black"
                      class=""
                      icon="save"
                      style="width: 100%; height: 55px; margin-left: 10px"
                    />
                  </div>
                </div>
              </q-form>
            </div>
          </q-tab-panel>

          <q-tab-panel name="ingredientes">
            <div style="padding: 9px" v-if="novo">
              <div
                class="flex text-black text-h6 justify-center bg-grey-3 q-mb-sm"
              >
                {{ this.form.nm_receita }}
              </div>

              <q-form
                @submit="onSubmitRIngrediente"
                @reset="onResetRIngrediente"
                class="row q-col-gutter-md"
                ref="formReceitaIngrediente"
              >
                <q-select
                  outlined
                  v-model="modelIngrediente"
                  :options="ingredientes"
                  label="Ingrediente"
                  style="width: 100%"
                  :rules="[(val) => val || 'Preencha o campo passo']"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhum resultado encontrado
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <div class="row">
                  <div class="col-md-6 col-sm-6 col-xs-12" style="padding: 3px">
                    <q-input
                      outlined
                      clearable
                      type="number"
                      v-model="formIngredienteReceita.passo"
                      label="Passo"
                      color="black"
                      style="width: 100%"
                      :rules="[(val) => !!val || 'Campo Obrigatório']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="trending_up" />
                      </template>
                    </q-input>
                  </div>

                  <div class="col-md-6 col-sm-6 col-xs-12" style="padding: 3px">
                    <q-input
                      outlined
                      clearable
                      type="text"
                      v-model="formIngredienteReceita.qtde_ingrediente"
                      label="Quantidade"
                      color="black"
                      :rules="[(val) => !!val || 'Campo Obrigatório']"
                      style="width: 100%"
                    >
                      <template v-slot:prepend>
                        <q-icon name="library_books" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="row" style="width: 100%">
                  <div
                    class="col-md-10 col-sm-10 col-xs-12"
                    style="padding: 3px"
                  >
                    <q-checkbox
                      v-model="formIngredienteReceita.fixa"
                      label="Ingrediente com quantidade fixa"
                    />
                  </div>
                  <div class="col-md-2 col-sm-2 col-xs-12" style="padding: 3px">
                    <q-btn
                      title="Gravar um Ingrediente"
                      type="submit"
                      color="black"
                      class="float-left"
                      icon="save"
                      style="width: 100%; height: 55px"
                    />
                  </div>
                </div>
              </q-form>
              <br />

              <q-markup-table v-if="ingredienteReceita">
                <thead class="bg-black text-white">
                  <tr>
                    <th class="text-left">Passo</th>
                    <th class="text-left">Ingrediente</th>
                    <th class="text-right">Quantidade</th>
                    <th class="text-right">Excluir</th>
                  </tr>
                </thead>
                <tbody
                  v-for="info in ingredienteReceita"
                  :key="info.uuid_ireceita"
                  style="width: 100%"
                >
                  <tr>
                    <td class="text-left">
                      {{ info.ordem_ingrediente }}
                    </td>
                    <td class="text-left">
                      {{ info.tb_ingrediente.nm_ingrediente }}
                    </td>
                    <td class="text-right">
                      {{
                        info.qtde_ingrediente +
                        " / " +
                        info.tb_ingrediente.tb_unidade.sigla_unidade
                      }}
                    </td>
                    <td class="text-right">
                      <q-btn
                        size="xs"
                        round
                        icon="close"
                        color="black"
                        title="Excluir"
                        @click="excluirIngredienteReceita(info.uuid_ireceita)"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-tab-panel>

          <q-tab-panel name="preparo">
            <div style="padding: 10px" v-if="novo">
              <div
                class="flex text-black text-h6 justify-center bg-grey-3 q-mb-sm"
              >
                {{ this.form.nm_receita }}
              </div>
              <q-form
                @submit="onSubmitPrepado"
                @reset="onResetPreparo"
                class="row q-col-gutter-md"
                ref="formPreparoReceita"
              >
                <q-select
                  class="col-md-3 col-sm-3 col-xs-12 flex"
                  name="ordem_etapa"
                  id="ordem_etapa"
                  outlined
                  v-model="formPreparo.modelPreparo"
                  :options="formPreparo.niveis"
                  label="Ordem"
                  :rules="[(val) => val || 'Selecione uma ordem de preparo']"
                />

                <q-input
                  outlined
                  clearable
                  type="text"
                  v-model="formPreparo.nm_modo"
                  label="Modo de preparo"
                  class="col-md-7 col-sm-7 col-xs-12"
                  color="black"
                  :rules="[(val) => !!val || 'Modo de preparo é obrigatório']"
                >
                  <template v-slot:prepend>
                    <q-icon name="mode_edit" />
                  </template>
                </q-input>

                <div class="col-md-2 col-sm-2 col-xs-12">
                  <q-btn
                    title="Gravar uma Etapa"
                    type="submit"
                    color="black"
                    class="float-left"
                    icon="save"
                    style="width: 100%; height: 55px; margin-bottom: 10px"
                  />
                </div>
              </q-form>

              <q-markup-table v-if="preparoReceita">
                <thead class="bg-black text-white">
                  <tr>
                    <th class="text-left">Ordem de preparo</th>
                    <th class="text-left">Modo de preparar</th>
                    <th class="text-right">Excluir</th>
                  </tr>
                </thead>
                <tbody
                  v-for="info in preparoReceita"
                  :key="info.uuid_preparo"
                  style="width: 100%"
                >
                  <tr>
                    <td class="text-left">
                      {{ info.ordem_Receita }}
                    </td>
                    <td class="text-left">
                      {{ info.preparo_Receita }}
                    </td>

                    <td class="text-right">
                      <q-btn
                        size="xs"
                        round
                        icon="close"
                        color="black"
                        title="Excluir"
                        @click="excluirPreparoReceita(info.uuid_preparo)"
                      />
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <div
        class="col-md-6 col-xs-12"
        style="
          padding: 10px;
          border: solid 1px black;
          overflow-y: scroll;
          height: 600px;
        "
      >
        <div
          class="q-pa-md row items_start q-gutter-md flex flex-center"
          style="max-heigth: 50px"
        >
          <PesquisarRegistro
            labelPesquisa="Pesquisar Receitas"
            v-model="pesquisa"
            @input="pesquisa = $event.target.value"
          />

          <div
            v-for="info in comFiltro"
            :key="info.uuid_receita"
            style="width: 100%"
          >
            <q-card class="my-card bg-grey-2" bordered>
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <div class="text-h6">{{ info.nm_receita }}</div>
                  <div class="text-subtitle2">
                    Prioridade: {{ info.prioridade_receita }}
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  size="xs"
                  round
                  icon="edit"
                  color="black"
                  title="Editar uma receita"
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
  name: "PageReceitas",
  data() {
    return {
      tab: ref("receitas"),
      pesquisa: "",
      usuario: "",
      novo: false,
      dados: [],

      ingredientes: [],
      ingredienteReceita: [],
      preparoReceita: [],

      modelIngrediente: ref(null),

      form: {
        uuid_receita: "",
        nm_receita: "",
        prioridade: 1,
        ativar: true,
      },

      formIngredienteReceita: {
        qtde_ingrediente: "",
        nm_ingrediente: "",
        passo: 1,
        nm_modo: "",
        fixa: false,
      },
      formPreparo: {
        niveis: [
          { label: 1, value: 1 },
          { label: 2, value: 2 },
          { label: 3, value: 3 },
          { label: 4, value: 4 },
          { label: 5, value: 5 },
          { label: 6, value: 6 },
          { label: 7, value: 7 },
          { label: 8, value: 8 },
          { label: 9, value: 9 },
          { label: 10, value: 10 },
        ],
        modelPreparo: ref(null),
        nm_modo: "",
      },
    };
  },
  components: {
    TituloPagina,
    PesquisarRegistro,
  },

  created() {
    this.listagemIngredientes();
  },

  mounted() {
    this.listagem();
  },
  computed: {
    comFiltro() {
      if (this.pesquisa) {
        let exp = new RegExp(this.pesquisa.trim(), "i");
        return this.dados.filter((dado) => exp.test(dado.nm_receita));
      } else {
        return this.dados;
      }
    },
  },
  methods: {
    addForm() {
      !this.novo ? (this.novo = true) : (this.novo = false);
    },
    listagem() {
      this.$api
        .get("/receitas", {
          headers: { "Content-Type": "application/json" },
        })
        .then(
          (res) => {
            res.data.idErro ? (this.dados = []) : (this.dados = res.data);
          },
          (err) => console.log(err)
        );
    },
    listagemIngredientes() {
      this.$api
        .get("/ingredientes", {
          headers: { "Content-Type": "application/json" },
        })
        .then(
          (res) => {
            for (var i = 0; i < res.data.length; i++) {
              var obj = {
                label: "",
                value: "",
              };
              obj.label = res.data[i].nm_ingrediente;
              obj.value = res.data[i].uuid_ingrediente;

              this.ingredientes.push(obj);
            }
          },
          (err) => console.log(err)
        );
    },
    async listagemRIngrediente(id) {
      this.ingredienteReceita = [];

      await this.$api
        .get("/ingredientesReceitas/" + id, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          res.data.idErro
            ? (this.ingredienteReceita = [])
            : (this.ingredienteReceita = res.data);
        })
        .catch((err) => {
          this.ingredienteReceita = false;
        });
    },
    onSubmitReceita() {
      if (this.form.uuid_receita === "") {
        this.incluirReceita();
      } else {
        this.alterarReceita();
      }

      this.$q.notify({
        message: "cadastrado com sucesso",
        color: "positive",
        icon: "check_circle_outline",
      });
      this.onResetReceita();
    },
    async onResetReceita() {
      await this.resetForm();
      this.$refs.formReceita.resetValidation();
    },
    async resetForm() {
      this.novo = false;
      this.modelIngrediente = ref(null);
      this.form = {
        uuid_receita: "",
        nm_receita: "",
        prioridade: 1,
        ativar: true,
      };

      this.formIngredienteReceita = {
        qtde_ingrediente: "",
        nm_ingrediente: "",
        passo: 1,
        nm_modo: "",
        fixa: false,
      };
    },
    async editar(dados) {
      await this.listagemRIngrediente(dados.uuid_receita);
      await this.listagemPreparo(dados.uuid_receita);
      this.form.uuid_receita = dados.uuid_receita;
      this.form.nm_receita = dados.nm_receita;
      this.novo = true;

      console.log(this.ingredienteReceita);
    },
    incluirReceita() {
      const dadosParaEnvio = {
        nm_receita: this.form.nm_receita,
        uuid_usuario: JSON.parse(localStorage.usuario).uuid_usuario,
        prioridade_receita: this.form.prioridade,
        status_receita: true,
      };

      console.log(dadosParaEnvio);
      this.$api
        .post("/receitas", dadosParaEnvio)
        .then((response) => {
          //console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    alterarReceita() {
      const dadosParaEnvio = {
        nm_receita: this.form.nm_receita,
        uuid_usuario: JSON.parse(localStorage.usuario).uuid_usuario,
        status_receita: true,
      };

      console.log(dadosParaEnvio);
      this.$api
        .put("/receitas/" + this.form.uuid_receita, dadosParaEnvio)
        .then((response) => {
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    onSubmitRIngrediente() {
      this.incluirRIngrediente();
    },
    incluirRIngrediente() {
      alert(this.formIngredienteReceita.fixa);
      const dadosEnvio = {
        qtde_ingrediente: this.formIngredienteReceita.qtde_ingrediente,
        status_ingrediente: "true",
        qtde_fixa: this.formIngredienteReceita.fixa,
        ordem_ingrediente: this.formIngredienteReceita.passo,
        uuid_receita: this.form.uuid_receita,
        uuid_ingrediente: this.modelIngrediente.value, //pega o valor do select
      };

      this.$api
        .post("/ingredientesReceitas", dadosEnvio)
        .then((response) => {
          console.log(response);
          this.listagem();
          this.listagemRIngrediente(this.form.uuid_receita);
          this.onResetRIngrediente();
        })
        .catch((error) => console.log(error));
    },
    async onResetRIngrediente() {
      await this.resetFormIngrediente();
      this.$refs.formReceitaIngrediente.resetValidation();
    },
    async resetFormIngrediente() {
      this.modelIngrediente = ref(null);
      this.formIngredienteReceita.qtde_ingrediente = "";
      (this.formIngredienteReceita.passo = 1),
        (this.formIngredienteReceita.fixa = false);
    },
    excluirIngredienteReceita(id) {
      const confirmado = confirm("Deseja realmente excluir o ingrediente?");
      if (confirmado) {
        this.$api
          .delete("/ingredientesReceitas/" + id, { data: id })
          .then((response) => {
            this.listagemRIngrediente(this.form.uuid_receita);
            this.onResetRIngrediente();
          })
          .catch((error) => console.log(error));
      }
    },
    async onSubmitPrepado() {
      const dadosParaEnviar = {
        uuid_receita: this.form.uuid_receita,
        preparo_Receita: this.formPreparo.nm_modo,
        ordem_Receita: this.formPreparo.modelPreparo.value,
      };
      console.log(dadosParaEnviar);
      this.$api
        .post("/preparoReceitas", dadosParaEnviar)
        .then((response) => {
          this.listagemPreparo(this.form.uuid_receita);
        })
        .catch((error) => console.log(error));
      await this.onResetPreparo();
    },
    async onResetPreparo() {
      await this.resetFormPreparo();
      this.$refs.formPreparoReceita.resetValidation();
    },
    async resetFormPreparo() {
      this.formPreparo = {
        niveis: [
          { label: 1, value: 1 },
          { label: 2, value: 2 },
          { label: 3, value: 3 },
          { label: 4, value: 4 },
          { label: 5, value: 5 },
          { label: 6, value: 6 },
          { label: 7, value: 7 },
          { label: 8, value: 8 },
          { label: 9, value: 9 },
          { label: 10, value: 10 },
        ],
        model: ref(1),
        nm_modo: "",
      };
    },

    async listagemPreparo(id) {
      this.preparoReceita = [];
      await this.$api
        .get("/preparoReceitas/" + id, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          res.data.idErro
            ? (this.preparoReceita = [])
            : (this.preparoReceita = res.data);
          //console.log(this.preparoReceita);
        })
        .catch((err) => (this.preparoReceita = false));
    },
    excluirPreparoReceita(id) {
      const confirmado = confirm("Deseja realmente excluir o modo de preparo?");
      if (confirmado) {
        this.$api
          .delete("/preparoReceitas/" + id, { data: id })
          .then((response) => {
            this.listagemPreparo(this.form.uuid_receita);
            //this.onResetRIngrediente();
          })
          .catch((error) => console.log(error));
      }
    },
  },
});
</script>
