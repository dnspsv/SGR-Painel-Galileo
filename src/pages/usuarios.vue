<template>
  <q-page class="content">
    <div class="row flex justify-center">
      <div class="col-md-6 col-xs-12" style="padding: 10px">
        <TituloPagina titulo="USUÁRIOS" />

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="row q-col-gutter-md"
          ref="usuario"
        >
          <q-input
            outlined
            clearable
            type="text"
            v-model="form.nm_usuario"
            label="Nome do usuário"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'O nome do usuário é obrigatório ',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            clearable
            type="email"
            v-model="form.email_usuario"
            label="Email"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) => (val && val.length > 0) || 'O email é obrigatório ',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            outlined
            clearable
            type="password"
            v-model="form.senha_usuario"
            label="senha"
            class="col-md-12 col-sm-12 col-xs-12"
            color="black"
            :rules="[
              (val) => (val && val.length > 0) || 'A senha é obrigatório ',
            ]"
            style="text-transform: uppercase"
          >
            <template v-slot:prepend>
              <q-icon name="password" />
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

          <q-select
            name="nivel_usuario"
            id="nivel_usuario"
            outlined
            v-model="model"
            :options="niveis"
            label="Nível"
            style="width: 280px"
            :rules="[(val) => val || 'Selecione um nível é obrigatório']"
          />
          <div class="q-pb-lg">
            <q-toggle color="black" v-model="dense" label="Ativar Usuário" />
          </div>

          <div class="col-12">
            <input type="hidden" v-model="form.uuid_usuario" />
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
            labelPesquisa="Pesquisar Usuários"
            v-model="pesquisa"
            @input="pesquisa = $event.target.value"
          />

          <div
            v-for="info in comFiltro"
            :key="info.uuid_usuario"
            style="width: 100%"
          >
            <q-card class="my-card bg-grey-2" bordered>
              <q-card-section class="flex flex-rigth">
                <div class="column">
                  <input type="hidden" :value="info.uuid_usuario" />
                  <div class="text-subtitle2">Nome: {{ info.nm_usuario }}</div>
                  <div class="text-subtitle2">
                    Email: {{ info.email_usuario }}
                  </div>
                  <div class="text-subtitle2">
                    Fone: {{ info.fone_usuario }}
                  </div>
                  <div class="text-subtitle2">
                    Nível:
                    {{ info.nivel_usuario > 0 ? "Administrador" : "Loja" }}
                  </div>
                  <div class="text-subtitle2">
                    Estado:
                    {{
                      info.status_usuario === true ? "Ativado" : "Desativado"
                    }}
                  </div>
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
import { ref } from "vue";
import { defineComponent } from "vue";
import TituloPagina from "components/TituloPagina.vue";
import PesquisarRegistro from "components/PesquisarRegistro.vue";

export default defineComponent({
  name: "PageLoja",
  data() {
    return {
      pesquisa: "",
      dense: ref(true),
      model: ref(null),
      dados: [],
      niveis: [
        {
          label: "Loja",
          value: 0,
        },
        {
          label: "Administrador",
          value: 1,
        },
      ],

      form: {
        uuid_usuario: "",
        nm_usuario: "",
        email_usuario: "",
        senha_usuario: "",
        telefone: "",
        nivel_usuario: "",
        status_usuario: "",
      },
    };
  },
  components: {
    TituloPagina,
    PesquisarRegistro,
  },
  created() {
    this.listagem();
  },
  computed: {
    comFiltro() {
      if (this.pesquisa) {
        let exp = new RegExp(this.pesquisa.trim(), "i");
        return this.dados.filter((dado) => exp.test(dado.nm_usuario));
      } else {
        return this.dados;
      }
    },
  },
  methods: {
    listagem() {
      this.$api
        .get("/usuarios", {
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
      this.form.uuid_usuario = dados.uuid_usuario;
      this.form.nm_usuario = dados.nm_usuario;
      this.form.email_usuario = dados.email_usuario;
      this.form.senha_usuario = dados.senha_usuario;
      this.form.status_usuario = dados.status_usuario;
      this.form.telefone = dados.fone_usuario;
      this.model = this.niveis[dados.nivel_usuario];
    },
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
        nm_usuario: this.form.nm_usuario,
        email_usuario: this.form.email_usuario,
        senha_usuario: this.form.senha_usuario,
        nivel_usuario: data[0].value,
        fone_usuario: this.form.telefone,
        status_usuario: this.dense,
      };

      if (this.form.uuid_usuario === "") {
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
      this.$refs.usuario.resetValidation();
    },
    async resetForm() {
      (this.model = ref(null)),
        (this.form = {
          uuid_usuario: "",
          nm_usuario: "",
          email_usuario: "",
          nivel_usuario: "",
          senha_usuario: "",
          telefone: "",
        });
    },
    gravarDados(dadosEnvio) {
      this.$api
        .post("/usuarios", dadosEnvio)
        .then((response) => {
          console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
    alterarDados(dadosEnvio) {
      this.$api
        .put("/usuarios/" + this.form.uuid_usuario, dadosEnvio)
        .then((response) => {
          console.log(response);
          this.listagem();
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
