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

        <q-toolbar-title> SGR Galileo </q-toolbar-title>

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
          @click="link.funcaoMenu(link.title)"
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
    link: "#",
    funcaoMenu: (msg) => {
      alert(msg);
    },
  },
  {
    title: "Receitas",
    caption: "Só as melhores",
    icon: "work",
    link: "#",
    funcaoMenu: (msg) => {
      alert(msg);
    },
  },
  {
    title: "Lojas",
    caption: "Lojas conectadas",
    icon: "store",
    link: "#",
    funcaoMenu: (msg) => {
      alert(msg);
    },
  },
  {
    title: "Usuários",
    caption: "Usuários do sistema",
    icon: "person",
    link: "#",
    funcaoMenu: (msg) => {
      alert(msg);
    },
  },
  {
    title: "Logout",
    caption: "Sair do sistema",
    icon: "exit_to_app",
    link: "#",
    funcaoMenu: (msg) => {
      alert(msg);
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
