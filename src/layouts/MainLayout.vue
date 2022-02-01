<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title @click="$router.push({ name: 'home' })">
          SGR Galileo
        </q-toolbar-title>

        <!--<div>v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div
        class="row flex bg-grey-3"
        style="padding: 20px; border-bottom: 1px solid #ccc"
      >
        <div class="col-xs-3 col-sm-3 text-caption">
          <q-avatar text-color="white" color="black">{{ inicial }}</q-avatar>
        </div>
        <div class="col-xs-8 col-sm-9 text-caption" text-color="white">
          {{ nivel > 0 ? "Administrador: " : "Loja: " }}
          <br />
          {{ nome }}
        </div>
      </div>

      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="link.funcaoMenu()"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Ingredientes",
    caption: "Ingredientes",
    icon: "list",
    link: "autorizado/ingredientes",
    funcaoMenu: () => {},
  },
  {
    title: "Receitas",
    caption: "Gerenciamneto das receitas",
    icon: "work",
    link: "autorizado/receitas",
    funcaoMenu: (msg) => {},
  },
  {
    title: "Lojas",
    caption: "Lojas conectadas",
    icon: "store",
    link: "autorizado/lojas",
    funcaoMenu: (msg) => {},
  },
  {
    title: "Unidades",
    caption: "Unidades de medida",
    icon: "speed",
    link: "autorizado/unidades",
    funcaoMenu: (msg) => {},
  },
  {
    title: "Usuários",
    caption: "Usuários do sistema",
    icon: "person",
    link: "autorizado/usuarios",
    funcaoMenu: (msg) => {},
  },
  {
    title: "Sair",
    caption: "Sair do sistema",
    icon: "exit_to_app",
    link: "/",
    funcaoMenu: (msg) => {
      localStorage.removeItem("usuario");
    },
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      nome: "",
      inicial: "",
      nivel: "",
    };
  },

  components: {
    EssentialLink,
  },

  mounted() {
    
      this.nome = JSON.parse(localStorage.usuario).nm_usuario;
      this.inicial = JSON.parse(localStorage.usuario).nm_usuario[0];
      this.nivel = JSON.parse(localStorage.usuario).nivel_usuario;
   
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
