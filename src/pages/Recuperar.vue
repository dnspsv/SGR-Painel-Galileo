<template>
  <q-page padding class="flex flex-center bg-grey-4">
    <q-card class="my-card" style="width: 320px; padding: 10px">
      <q-card-section class="text-center">
        <p class="text-h3">SGR Galileo</p>
      </q-card-section>
      <q-form @submit="iniciarSessao" @reset="onReset" ref="LoginUsuario">
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            clearable
            v-model="login.email"
            type="email"
            label="Digite seu Email"
            color="black"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'O Email do usuário é obrigatório ',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="q-pt-none">
          <q-btn
            class="q-mt-sm"
            color="black"
            type="submit"
            label="Recuperar a Senha"
            style="width: 100%"
          />
        </q-card-actions>
        <q-card-actions class="q-pt-none">
          <q-btn
            class="q-mt-sm"
            color="blue"
            label="Voltar ao login"
            @click="this.$router.push({ name: 'home' })"
            style="width: 100%"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Recuperar",

  data() {
    return {
      login: {
        email: "",
      },
    };
  },

  created() {},
  methods: {
    async armazenarUsuario(dados) {},
    async iniciarSessao() {
      this.$router.push({ name: "home" });
    },
    onReset() {},
  },
});
</script>
