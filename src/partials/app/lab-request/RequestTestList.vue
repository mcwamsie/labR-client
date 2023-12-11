<script lang="ts" setup>

import {useStore} from "vuex";
import {TestPanel} from "@/models/test_panel.model.ts";
import {computed, ComputedRef} from "vue";
import RequestTestItem from "@/partials/app/lab-request/RequestTestItem.vue";

defineProps<{ tests: TestPanel[] }>()

const store = useStore()
const active: ComputedRef<TestPanel> = computed(() => store.getters["labRequest/requestActive"])

</script>

<template>
  <ul class="flex-grow gap-2 flex-col flex max-h-full overflow-y-auto">
    <request-test-item
        v-for="test of tests"
        :active="test === active"
        :test="test"

    />
  </ul>
</template>

<style scoped>

</style>
