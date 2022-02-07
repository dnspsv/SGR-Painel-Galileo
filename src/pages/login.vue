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
            label="Email"
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

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            clearable
            v-model="login.senha"
            :type="login.isPwd ? 'password' : 'text'"
            label="Digite sua senha"
            color="black"
            :rules="[
              (val) => (val && val.length > 0) || 'A senha é obrigatória ',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="login.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="login.isPwd = !login.isPwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="q-pt-none">
          <q-btn
            class="q-mt-sm"
            color="black"
            type="submit"
            label="Entrar"
            style="width: 100%"
          />
        </q-card-actions>
        <q-card-actions class="q-pt-none">
          <q-btn
            class="q-mt-sm"
            flat
            color="black"
            label="Esquecia a senha"
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
  name: "Login",
  
  data() {
    
    return {
        
      login: {
        email: "",
        senha: "",
        isPwd: true,
      },
    };
  },

  created() {},
  methods: {
    async armazenarUsuario(dados) {
      localStorage.usuario = JSON.stringify(dados); //save lerr==== // JSON.parse(dados);
    },
    async iniciarSessao() {
      const dadosParaEnvio = {
        email_usuario: this.login.email,
        senha_usuario: this.login.senha,
      };

      await this.$api
        .post("/usuarios/LoginUsuario", dadosParaEnvio)
        .then((response) => {
          console.log(response);
          this.armazenarUsuario(response.data);
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            message: "Email ou senha inválida",
            color: "negative",
            icon: "check_circle_outline",
            position: "top",
          });
         
        });

      this.$router.push({ name: "home" });
    },
    onReset() {},
  },
});
</script>
