<template>
  <q-page class="content">
    <div class="row flex bg-grey-4" style="padding: 10px">
      <div class="col-xs-12 col-sm-6 text-left text-caption">
        {{ nivelUsuario > 0 ? "Administrador: " : "Loja: " }}
        <br />
        {{ nomeUsuario }}
      </div>
    </div>
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <div class="text-h6 flex justify-center">RECEITAS</div>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="row q-col-gutter-md"
          ref="formReceita"
        >
          <q-input
            outlined
            clearable
            type="text"
            v-model="form.nm_receita"
            label="Nome da Receita"
            class="col-md-10 col-sm-10 col-xs-10"
            color="black"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'O nome da receita obrigatório',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="receipt" />
            </template>
          </q-input>

          <div class="col-md-2 col-sm-2 col-xs-2">
            <q-btn
              title="Gravar as alterações"
              type="submit"
              color="black"
              class="float-left"
              icon="save"
              style="height: 55px"
            />
          </div>
        </q-form>
      </div>

      <div
        class="col-md-6 col-xs-12"
        style="padding: 10px; border: solid 1px black"
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
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageReceitas",
  data() {
    return {
      pesquisa: "",
      nomeUsuario: "",
      nivelUsuario: "",
      novo: false,
      dados: [],
      form: {
        nm_receita: "",
      },
    };
  },
  created() {},

  mounted() {
    this.nomeUsuario = localStorage.nome;
    this.nivelUsuario = localStorage.nivel;

    if (!this.nomeUsuario) {
      alert("Login incorreto");
      this.$router.replace({ name: "login" });
      return;
    }

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
    onSubmit() {
      this.$q.notify({
        message: "cadastrado com sucesso",
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
      };
    },
  },
});
</script>
