<template>
  <div class="flex justify-left">
    <p class="text-subtitle2" id="textoCard"  style="margin:0px;">{{ titulo }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TextoCard",

  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
});
</script>
<style scoped lang="scss">
#TextCard {
  color: $dark;
}
</style>
