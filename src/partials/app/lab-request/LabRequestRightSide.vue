<script lang="ts" setup>
import {useStore} from "vuex";
import {TestPanel} from "@/models/test_panel.model.ts";
import {computed, ComputedRef} from "vue";
import ModalFooter from "@/components/misc/ModalFooter.vue";
import TextAreaInput from "@/components/form/TextAreaInput.vue";
import RequestRightNav from "@/partials/app/lab-request/RequestRightNav.vue";
import RequestParameterDatatable from "@/partials/app/lab-request/RequestParameterDatatable.vue";
import {LabRequest, TestResultsForm} from "@/models/labRequest.model.ts";

const emit = defineEmits(["update:activeIndex"])
const props = defineProps<{ form: TestResultsForm, activeIndex: number }>()

const store = useStore()
const submitting: ComputedRef<boolean> = computed(() => store.getters["labRequest/submitting"])
const active: ComputedRef<TestPanel> = computed(() => store.getters["labRequest/requestActive"])
const record: ComputedRef<LabRequest> = computed(() => store.getters["labRequest/requestRecord"])
const errors = computed(() => store.getters["labRequest/requestErrors"])

const model = computed({
  get: () => props.activeIndex,
  set: (val) => emit("update:activeIndex", val)
})
</script>

<template>
  <div class="flex flex-col flex-grow bg-white max-h-full max-w-full overflow-hidden">
    <div class="grid grid-cols-3 items-center border-b-[1px] text-lg font-bold border-[#dee2e6] pb-0 border-solid px-4">
      <div class="col-span-2">
        <request-right-nav
            v-model="model"
            :needs-culture="active ? active.needCulture : false"
        />
      </div>
      <div class="text-base font-bold">
        {{ active ? active.name : "----" }}
      </div>
    </div>
    <div class="flex-grow gap-4 flex flex-col max-h-full overflow-hidden p-4">
      <request-parameter-datatable
          :items="form.items"
      />
      <text-area-input
          id="comment"
          v-model="form.comment"
          :error="errors.comment"
          :mb0="true"
          :rows="3"
          label="Comment"
          name="comment"
      />
      <!--
      <code>{{ form }}</code>
      --->
    </div>
    <modal-footer :disabled="record.status === 'approved' || record.status === 'collected'" :submitting="submitting"/>
  </div>
</template>

<style scoped>

</style>
