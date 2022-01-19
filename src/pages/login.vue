<template>
  <q-page padding class="flex flex-center bg-grey-4">

    <q-card class="my-card" style="width: 320px; padding:10px;">
      <q-card-section class="text-center">
        <p class="text-h3">SGR Galileo</p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="login.email" filled type="email" label="Email" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          v-model="login.senha"
          filled
          :type="login.isPwd ? 'password' : 'text'"
          label="Digite sua senha"
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
          label="Entrar"
          style="width: 100%"
          @click="$router.push({ name: 'home' })"
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
    </q-card>
  </q-page>
</template>

<script>
export default {
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
};
</script>
