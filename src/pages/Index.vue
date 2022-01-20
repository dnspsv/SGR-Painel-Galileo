<template>
  <q-page class="">
    <div class="q-pa-md row items_start q-gutter-md flex flex-center" style="max-heigth:50px">
      <div v-for="info in dados" :key="info.uuid_receita" style="width: 100%">
        <q-card class="my-card bg-primary">
          <q-card-section class="flex flex-rigth">
            
            <div class="row">
              <div class="col-9">
                <div class="text-h6">{{ info.nm_receita }}</div>
                <div class="text-subtitle2">{{ info.nm_receita }}</div>
                <div class="text-subtitle2">{{ info.data_criacao }}</div>
              </div>
              <div class="col-3 right" align="right">
                <img 
                  class="row rigth"
                  style="width: 120px"
                  v-if="info.img_receita !== ''"
                  :src="info.img_receita"
                  alt="Imagem da receita"
                />
              </div>

            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn round icon="edit" color="black" />
            <q-btn round icon="store" color="black" />
            <q-btn round icon="more_vert" color="black" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      mensagem: "SGR - Galileo",
      dados: [],
    };
  },
  created() {
    axios
      .get("http://localhost:3030/receitas", {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          this.dados = res.data;
          console.log(res.data);
        },
        (err) => console.log(err)
      );
  },
});
</script>
