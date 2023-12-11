<script setup lang="ts">
import {mdiAccountPlus} from "@mdi/js";
import {useStore} from "vuex";

const store = useStore()

const handleNewPatient = () => {
  store.dispatch("patients/setPatientModalOpen", true)
  store.dispatch("patients/setPatientModalHeading", "New Patient")
}
</script>

<template>
  <div class="w-full min-h-[40px] bg-white shadow px-4">
    <ul class="flex h-full gap-4">
      <li class="h-full">
        <a @click="handleNewPatient" class="h-full flex items-center gap-[2px] cursor-pointer text-primary font-bold">
          <svg-icon type="mdi" :path="mdiAccountPlus" :size="16"/>
          <span class="text-[12px] font-bold">New Patient</span>
        </a>
      </li>

    </ul>
  </div>
</template>

<style scoped>

</style>
