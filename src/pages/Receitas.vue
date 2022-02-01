<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <div class="row text-h6" style="padding: 5px">
          <div class="col">RECEITAS</div>
          <div class="justify-right">
            <q-btn
              label="Novo"
              title="Nova Receita"
              color="black"
              icon="note_add"
              @click="onResetReceita()"
            />
          </div>
        </div>

        <div style="padding: 10px; ">
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
              class="col-md-10 col-sm-10 col-xs-12"
              color="black"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'O nome da receita é obrigatório',
              ]"
              style="margin-bottom: -10px"
            >
              <template v-slot:prepend>
                <q-icon name="receipt" />
              </template>
            </q-input>

            <div class="col-md-2 col-sm-2 col-xs-12">
              <q-btn
                title="Gravar uma receita"
                type="submit"
                color="black"
                class=""
                icon="save"
                style="width: 100%; height: 55px"
              />
            </div>
          </q-form>
        </div>

        <div style="padding: 10px; " v-if="novo">
          <q-form
            @submit="onSubmitReceitaIngrediente"
            @reset="onResetReceitaIngrediente"
            class="row q-col-gutter-md"
            ref="formReceitaIngrediente"
          >
            <q-input
              outlined
              clearable
              type="text"
              v-model="form.nm_ingrediente"
              label="Ingrediente"
              class="col-md-6 col-sm-6 col-xs-12"
              color="black"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'O ingrediente é obrigatório',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="view_array" />
              </template>
            </q-input>

            <q-input
              outlined
              clearable
              type="text"
              v-model="form.qtde_ingrediente"
              label="QTDE"
              class="col-md-4 col-sm-4 col-xs-12"
              color="black"
              :rules="[
                (val) => (val && val.length > 0) || 'Aquantidade é obrigatória',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="library_books" />
              </template>
            </q-input>

            <div class="col-md-2 col-sm-2 col-xs-12">
              <q-btn
                title="Gravar um Ingrediente"
                type="submit"
                color="black"
                class="float-left"
                icon="save"
                style="width: 100%; height: 55px"
              />
            </div>
          </q-form>
        </div>

        <div style="padding: 10px; " v-if="novo">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="row q-col-gutter-md"
            ref="formReceita"
          >
            <q-select
              class="col-md-3 col-sm-3 col-xs-12 flex"
              name="ordem_etapa"
              id="ordem_etapa"
              outlined
              v-model="model"
              :options="niveis"
              label="Ordem"
              :rules="[(val) => val || 'Selecione uma ordem de preparo']"
            />

            <q-input
              outlined
              clearable
              type="text"
              v-model="form.nm_modo"
              label="Modo de preparo"
              class="col-md-7 col-sm-7 col-xs-12"
              color="black"
              :rules="[
                (val) => (val && val.length > 0) || 'Atapa é obrigatória',
              ]"
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
                style="width: 100%; height: 55px"
              />
            </div>
          </q-form>
        </div>
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
          <q-input
            style="width: 100%"
            color="with"
            label-color="black"
            outlined
            v-model="pesquisa"
            label="Pesquisar Receitas"
            @input="pesquisa = $event.target.value"
          >
            <template v-slot:append>
              <q-icon name="search" color="black" />
            </template>
          </q-input>
          <div
            v-for="info in dados"
            :key="info.uuid_receita"
            style="width: 100%"
          >
            <q-card class="my-card bg-grey-2" bordered>
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <div class="text-h6">{{ info.nm_receita }}</div>
                  <div class="text-subtitle2">{{ info.nm_receita }}</div>
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
export default defineComponent({
  name: "PageReceitas",
  data() {
    return {
      pesquisa: "",
      usuario: "",
      novo: false,
      dados: [],
      niveis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      model: ref(1),
      form: {
        uuid_receita: "",
        nm_receita: "",
        nm_ingrediente: "",
        qtde_ingrediente: "",
        nm_modo: "",
      },
    };
  },
  created() {},

  mounted() {
    this.listagem();
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
      this.form = {
        uuid_receita: "",
        nm_receita: "",
        nm_ingrediente: "",
        qtde_ingrediente: "",
        nm_modo: "",
      };
    },
    editar(dados) {
      this.form.uuid_receita = dados.uuid_receita;
      this.form.nm_receita = dados.nm_receita;
      this.novo = true;
    },
    incluirReceita() {
      const dadosParaEnvio = {
        nm_receita: this.form.nm_receita,
        uuid_usuario: JSON.parse(localStorage.usuario).uuid_usuario,
        status_receita: true,
      };

      console.log(dadosParaEnvio);
      this.$api
        .post("/receitas", dadosParaEnvio)
        .then((response) => {
          console.log(response);
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
  },
});
</script>
