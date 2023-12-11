<script lang="ts" setup>
import {Ref, ref} from "vue";
import {useStore} from "vuex";
import sweetAlert from "@/sweetAlert.ts";
import {useRouter} from "vue-router";

defineProps<{ name: string }>()
const show: Ref<boolean> = ref(false)

const store = useStore()
const router = useRouter()
const handleLogout = async () => {
  let willConfirm = await sweetAlert.willSubmit("Are you sure you want to logout?")

  if (willConfirm.isConfirmed) {
    await store.dispatch("auth/logout")
    await router.push("/auth/login")
  }
}

</script>

<template>
  <div class="relative">
    <button
        class="flex items-center whitespace-nowrap rounded px-2 pb-2 pt-2.5 text-xs font-medium capitalize leading-normal text-white transition duration-150 ease-in-out  focus:bg-primary-600"
        type="button"
        @click="show=!show"
    >
      <slot>
        {{ name }}
      </slot>
      <span class="ml-2 w-2">
      <svg
          class="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
        <path
            clip-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            fill-rule="evenodd"/>
      </svg>
    </span>
    </button>
    <ul
        :class="show ? 'show' : ''"
        aria-labelledby="dropdownMenuButton1tx"
        class="absolute z-[1000] w-full m-0 hidden py-1 px-4 min-w-full list-none overflow-hidden rounded-0 border-none bg-white bg-clip-padding text-left text-base shadow-lg  [&.show]:block"
    >
      <li class="w-full border-t-neutral-400">
        <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-[12px] font-bold text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 "
            href="#"
        >
          Profile
        </a
        >
      </li>
      <li class="w-full border-t-neutral-400 border-solid border-t-[1px]">
        <a @click="handleLogout"
           class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-[12px] font-bold text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 "
           data-te-dropdown-item-ref
           href="#"
        >
          Logout
        </a
        >
      </li>
      <!---
      <li>
        <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
          href="#"
          data-te-dropdown-item-ref
          >Another action</a
        >
      </li>
      -->
    </ul>
  </div>
</template>

<style scoped>

</style>
