<template>
  <div class="fullscreen  text-black text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Página não encontrada!...
      </div>

      <q-btn
        class="q-mt-xl"
        color="black"
        text-color="white"
        unelevated
        to="/"
        label="Vá para o início"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
