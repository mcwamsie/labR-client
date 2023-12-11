<script lang="ts" setup>
import AppSidebar from "@/layout/AppSidebar.vue";
import AppBar from "@/layout/AppBar.vue";
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore()

const sidebarOpen = computed(() => store.getters["misc/sidebarOpen"])
</script>

<template>

  <div id="wrapper" :class="sidebarOpen ? 'open': ''">
    <app-sidebar/>
    <app-bar/>
    <main id="app-content">
      <slot name="body"/>
    </main>
  </div>


  <slot name="modal"/>


</template>

<style scoped>

</style>
