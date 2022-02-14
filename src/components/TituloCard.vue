<template>
  <div class="flex justify-left">
    <p class="text-h6" id="titulo" style="margin:0px;">{{ titulo }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TituloCard",

  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
});
</script>
<style scoped lang="scss">
#titulo {
  color: $dark;
}
</style>
