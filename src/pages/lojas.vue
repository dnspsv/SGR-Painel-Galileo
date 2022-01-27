<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <div class="flex justify-center">
          <p class="text-h4">Lojas</p>
        </div>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="row q-col-gutter-md"
          ref="loja"
        >
          <q-input
            outlined
            clearable
            type="text"
            v-model="form.nm_loja"
            label="Nome da loja"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'O nome da loja é obrigatório ',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="store" />
            </template>
          </q-input>

          <q-input
            outlined
            clearable
            type="text"
            v-model="form.cd_loja"
            label="Código da loja"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'O código da loja é obrigatório ',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="qr_code" />
            </template>
          </q-input>

          <div class="col-12">
            <input type="hidden" v-model="form.uuid_loja" />
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
          <div
            v-for="info in dados"
            :key="info.uuid_loja"
            style="width: 100%"
          >
            <q-card class="my-card bg-grey-2" bordered >
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <input type="hidden" :value="info.uuid_loja" />
                  <div class="text-h6">Nome: {{ info.nm_loja }}</div>
                
                  <div class="text-h6">código da loja: {{ info.cd_loja }}</div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  size="xs"
                  round
                  icon="edit"
                  color="black"
                  title="Editar uma loja"
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
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageLoja",
  data() {
    return {
      dados: [],
      form: {
        nm_loja: "",
        cd_loja: "",
        uuid_loja: "",
      },
    };
  },
  created() {
    this.listagem();
  },
  methods: {
    listagem() {
      axios
        .get("http://localhost:3030/lojas", {
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
      this.form.uuid_loja = dados.uuid_loja;
      this.form.cd_loja = dados.cd_loja;
      this.form.nm_loja = dados.nm_loja;
    },
    async onSubmit() {
      const dadosEnvio = {
        nm_loja: this.form.nm_loja,
        cd_loja: this.form.cd_loja
      };

      if (this.form.uuid_loja === "") {
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
      this.$refs.loja.resetValidation();
    },
    async resetForm() {
      this.form = {
        uuid_loja: "",
        nm_loja: "",
        cd_loja: ""
      };
    },
    gravarDados(dadosEnvio) {
      this.$api
        .post("/lojas", dadosEnvio)
        .then((response) => {
          console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    alterarDados(dadosEnvio) {
      this.$api
        .put(
          "/lojas/" + this.form.uuid_loja,
          dadosEnvio
        )
        .then((response) => {
          console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
