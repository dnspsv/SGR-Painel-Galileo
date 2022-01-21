<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="border: solid 2px red; padding:10px;" >

        <div class="flex justify-center">
          <p class="text-h4">RECEITAS</p>
        </div>
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
            :rules="[(val) => (val && val.length > 0) || 'Nome obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            clearable
            v-model="form.telefone"
            label="telefone"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            mask="(##) #####-####"
            unmasked-value
            :rules="[
              (val) => (val && val.length > 0) || 'Telefone obrigatório',
              (val) => val.length === 11 || 'Coloque um telefone real',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
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
          <div
            v-for="info in dados"
            :key="info.uuid_receita"
            style="width: 100%"
          >
            <q-card class="my-card bg-primary">
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <div class="text-h6">{{ info.nm_receita }}</div>
                  <div class="text-subtitle2">{{ info.nm_receita }}</div>
                  <div class="text-subtitle2">{{ info.data_criacao }}</div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn round icon="edit" color="black" />
                <q-btn round icon="store" color="black" />
                <q-btn round icon="more_vert" color="black" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageReceitas",
  data() {
    return {
      dados: [],
      form: {
        nome: "",
        telefone: "",
      },
    };
  },
  created() {
    axios
      .get("http://localhost:3030/receitas", {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          this.dados = res.data;
          console.log(res.data);
        },
        (err) => console.log(err)
      );
  },

  methods: {
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
        telefone: "",
      };
    },
  },
});
</script>
