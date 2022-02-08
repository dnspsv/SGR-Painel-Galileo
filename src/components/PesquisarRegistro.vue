<template>
  <q-input
    style="width: 100%"
    color = "black"
    label-color="black"
    outlined
    v-model="pesquisa"
    :label="labelPesquisa"
  >
    <template v-slot:append>
      <q-icon name="search" color="black" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PesquisarRegistro",
  data() {
    return {
      pesquisa: "",
    };
  },
  props: {
    labelPesquisa: {
      type: String,
      required: true,
    }
  }
});
</script>
