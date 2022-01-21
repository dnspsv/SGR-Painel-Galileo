<template>
  <q-page class="container" padding>
   <div class="flex justify-center"> 
     <p class="text-h4" >INGREDIENTES</p>
   </div>
    
    
      <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-md" ref="formIngrediente">
        <q-input 
          outlined 
          clearable
          type="text"
          v-model="form.nome" 
          label="Nome do Ingrediente" 
          class="col-md-12 col-sm-12 col-xs-12" 
          color="black"
          :rules="[
            val=> val && val.length > 0 || 'Nome obrigatório'
          ]"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input 
            outlined 
            clearable
            v-model="form.telefone" 
            label="telefone" 
            class="col-md-12 col-sm-12 col-xs-12" 
            color="black"
            mask="(##) #####-####"
            unmasked-value
            :rules="[
                val=> val && val.length > 0 || 'Telefone obrigatório',
                val=> val.length === 11 || 'Coloque um telefone real'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <div class="col-12">
          
            <q-btn 
              label="Cadastrar"
              type="submit"
              color="black"
              class="float-right"
            />
            <q-btn 
              label="Limpar"
              type="reset"
              color="default"
              class="float-right text-grey-10 q-mr-md"
            />
        </div>
        
    </q-form>

  </q-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageIngrediente",
  data() {
    return {
      form:{
        nome:'',
        telefone:''
      }
    };
  },
  created() {},
  methods:{
    onSubmit(){
      this.$q.notify({
        message: 'cadastrado com sucesso',
        color: 'positive',
        icon: 'check_circle_outline'
      });
      this.onReset();
    },
   async onReset(){
      await this.resetForm();
      this.$refs.formIngrediente.resetValidation();  
    },
   async resetForm(){
      this.form = {
        nome:'',
        telefone:''
      } 
    }
  }
});
</script>
