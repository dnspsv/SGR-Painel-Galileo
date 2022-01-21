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

        <q-toolbar-title @click="$router.push({ name: 'home'})"> SGR Galileo </q-toolbar-title>

        <!--<div>v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="bg-black text-white"> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @click="link.funcaoMenu()"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-1">
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
    caption: "Só as melhores",
    icon: "work",
     link: "autorizado/receitas",
    funcaoMenu: (msg) => {
      
    },
  },
  {
    title: "Lojas",
    caption: "Lojas conectadas",
    icon: "store",
     link: "autorizado/lojas",
    funcaoMenu: (msg) => {
   
    },
  },
  {
    title: "Usuários",
    caption: "Usuários do sistema",
    icon: "person",
     link: "autorizado/usuarios",
    funcaoMenu: (msg) => {
    
    },
  },
  {
    title: "Logout",
    caption: "Sair do sistema",
    icon: "exit_to_app",
    link: "/",
    funcaoMenu: (msg) => {
     
    },
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
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
