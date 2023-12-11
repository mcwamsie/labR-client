<script setup lang="ts">
import {mdiAccountCircle, mdiAccountGroupOutline, mdiCog, mdiHomeOutline, mdiTestTube, mdiViewGrid} from "@mdi/js"
import {ref} from "vue";
import {useStore} from "vuex";


const sidebarLeftItems = ref([
  {
    item: "Grid",
    icon: mdiViewGrid,
    onClick: () => handleToggleSidebar()
  },
  {
    icon: mdiAccountCircle,
    item: "Account",
    onClick: () => alert("About to logout")
  },
  {
    icon: mdiCog,
    item: "Setting",
    onClick: () => alert("Going to settings")
  }
])
const sidebarRightItems = ref([
  {
    text: "Homepage",
    icon: mdiHomeOutline,
    link: "/app/home"
  },
  {
    text: "Patients",
    icon: mdiAccountGroupOutline,
    link: "/app/patients"
  },
  {
    text: "Lab Request",
    icon: mdiTestTube,
    link: "/app/requests"
  }

])
const store = useStore()

const handleToggleSidebar = () => store.dispatch("misc/toggleSidebar")
</script>

<template>
  <div id="app-sidebar">
    <div id="app-logo">
      <!--
      <svg-icon type="mdi" :path="mdiAlphaRBox"  :size="40"/>
      -->
    </div>
    <div class="flex flex-row flex-grow">
      <div id="app-sidebar-left">
        <button @click="item.onClick" class="sidebar-link" v-for="item of sidebarLeftItems">
          <svg-icon type="mdi" :path="item.icon" :size="24"/>
        </button>
      </div>
      <div id="app-sidebar-right">
        <span class="block mb-4">Main Menu</span>
        <div class="flex-grow max-h-full overflow-y-auto">
          <ul>
            <li class="mb-4" v-for="item of sidebarRightItems">
              <router-link class="font-bold text-[14px] gap-2 flex items-center p-2"
                           :to="item.link" exact-active-class="bg-primary" active-class="bg-primary text-white">
                <svg-icon type="mdi" :path="item.icon" :size="24"/>
                {{ item.text }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
