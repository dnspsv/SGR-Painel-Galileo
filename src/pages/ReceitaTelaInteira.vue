<template>
  <q-page>
    <CardReceita titulo="choco" ingredientes="" preparo="" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CardReceita from "components/CardReceita.vue";

export default defineComponent({
  name: "PageReceitasTelaInteira",
  data() {
    return {
      mensagem: "SGR - Galileo",
    };
  },
  components:{
    CardReceita
  },
  created() { },
});
</script>
