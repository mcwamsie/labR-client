<script lang="ts" setup>
import {emptyArray} from "@/lib.ts";

defineProps<{ size: string | number, colSpan: string | number }>()
</script>


<template>
  <tr v-for="_ of emptyArray(size)">
    <td v-for="_ of emptyArray(colSpan)" class="h-[27px]"></td>
  </tr>
</template>
