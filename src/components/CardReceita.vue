<template>
  <q-card class="my-card bg-grey-3">
    <q-card-section>
      <div class="row q-col-gutter-md" align="right">
        <div class="row">
          <TituloCard :titulo="titulo" />
        </div>
      </div>
      <q-separator />
      <br />
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
          <TextoCard :titulo="info.qtde_ingrediente.replace('.', ',') + ' /'" />
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
        <div class="row">
          <div class="col" style="margin-top: 0px">
            <TextoCard
              :titulo="info.ordem_Receita + ' - ' + info.preparo_Receita"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-actions align="right" class="bg-white">
      <q-input
        outlined
        clearable
        type="text"
        v-model="qtde_produzir"
        label="Quantidade a ser produzida em KG"
        color="black"
        :rules="[(val) => !!val || 'Campo Obrigatório']"
        style="width: 100%"
        :disable="desabilita"
        id="qtde_produzir"
      >
        <template v-slot:prepend>
          <q-icon name="library_books" />
        </template>
      </q-input>

      <q-btn
        title="Reiniciar Receita"
        label="Reiniciar Receita"
        color="black"
        class="float-left"
        icon="history"
        @click="reiniciar"
        :disable="!desabilita"
      />

      <q-btn
        title="Produzir Receita"
        label="Produzir Receita"
        color="black"
        class="float-left"
        icon="miscellaneous_services"
        @click="produzir"
        :disable="desabilita"
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
  data() {
    return {
      qtde_produzir: "",
      desabilita: false,
    };
  },
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
    // console.log(this.preparo);
  },
  methods: {
    produzir() {
      if (this.qtde_produzir > 1) {
        this.ingredientes.forEach((ingrediente) => {
          if (ingrediente.qtde_fixa === false) {
            ingrediente.qtde_ingrediente = (
              this.qtde_produzir * ingrediente.qtde_ingrediente
            ).toFixed(3);
          }
        });
      } else {
        document.querySelector("#resetarReceita").click();
      }
      this.desabilita = true;
    },
    reiniciar() {
      document.querySelector("#resetarReceita").click();
      this.desabilita = false;
    },
  },
});
</script>
<style scoped lang="scss">
.my-card {
  margin-top: 20px;
}
</style>
