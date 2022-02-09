<template>
  <q-card class="my-card bg-grey-3">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col">
          <TituloCard :titulo="titulo" />
        </div>
        <div>
          <q-btn size="xs" round icon="open_in_full" color="black" title="Tela Inteira" @click="telaInteira" />
        </div>
      </div>
      <q-separator />

      <TextoCard
        titulo="Ingredientes"
        style="margin-bottom: 0px; padding: 5px; height: 30px"
        class="bg-white justify-center"
      />
      <div
        v-for="info in ingredientes"
        :key="info.uuid_ingrediente"
        style="width: 100%; padding: 10px"
      >
        <div class="row" style="height: 5px">
          <div class="col" style="margin-top: 0px">
            <span> {{ info.tb_ingrediente.nm_ingrediente }}</span>
          </div>
          <TextoCard :titulo="info.qtde_ingrediente + ' /'" />
          <TextoCard :titulo="info.tb_ingrediente.tb_unidade.sigla_unidade" />
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <TextoCard
        titulo="Modo de Preparo"
        style="margin-bottom: 0px; padding: 5px; height: 30px"
        class="bg-white justify-center"
      />
      <div
        v-for="info in preparo"
        :key="info.uuid_preparo"
        style="width: 100%; padding: 10px"
      >
        <div class="row" style="height: 5px">
          <div class="col" style="margin-top: 0px">
            <TextoCard
              :titulo="info.ordem_Receita + ' - ' + info.preparo_Receita"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-actions align="right">
      <q-btn
        title="Ver resultado da receita"
        label="Ver Resultado"
        color="black"
        class="float-left"
        icon="edit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import TituloCard from "components/TituloCard.vue";
import TextoCard from "components/TextoCard.vue";

export default defineComponent({
  name: "CardReceita",

  props: {
    titulo: {
      type: String,
      required: true,
    },
    ingredientes: {
      type: Array,
      required: true,
    },
    preparo: {
      type: Object,
      required: true,
    },
  },
  components: {
    TituloCard,
    TextoCard,
  },
  mounted() {
    console.log(this.preparo);
  },
  methods:{
    telaInteira(){
       this.$router.push({ name: "telaReceita" });
    }
  }
});
</script>
<style scoped lang="scss">
.my-card {
  margin-top: 20px;
}
</style>
