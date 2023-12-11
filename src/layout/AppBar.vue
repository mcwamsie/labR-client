<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, ComputedRef} from "vue";
import {AuthUser} from "@/models/auth.models.ts";
import AppBarDropdown from "@/components/misc/AppBarDropdown.vue";

const store = useStore()
const user: ComputedRef<AuthUser> = computed(() => store.getters["auth/user"])

</script>

<template>
  <div id="app-bar">
    <div class="flex flex-grow items-center px-4 justify-between">
      <span class="text-xl font-black font-logo">
        <span class="text-white">Lab-R</span>
        <span class="text-primary">.</span>
      </span>
      <app-bar-dropdown :name="`${ user ? user.firstName : '' } ${user ? user.lastName : '' }`"/>
    </div>
  </div>
</template>

<style scoped>

</style>
