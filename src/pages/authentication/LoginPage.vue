<script lang="ts" setup>

import FormInput from "@/components/form/FormInput.vue";
import {useStore} from "vuex";
import {computed, ref} from "vue";
import {mdiGamepadCircle} from "@mdi/js"
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()
const errors = computed(() => store.getters["auth/errors"])

const form = ref({
  username: "",
  password: ""
})

const inputMode = ref("password")

const handleChangeMode = () => {
  if (inputMode.value === "password") inputMode.value = "text"
  else inputMode.value = "password"
}
const loading = computed(() => store.getters["auth/loading"])
const handleSubmit = async () => {
  let tokens = await store.dispatch("auth/login", form.value)
  if (tokens) {
    //let next = router.currentRoute.value.query.next
    let {next} = router.currentRoute.value.query
    if (next) {
      return await router.push(next)
    }
    await router.push('/app/home/')
  }
}
</script>

<template>
  <form class="w-full h-full flex bg-cover" novalidate style="background-image: url('/images/bg.jpg')"
        @submit.prevent="handleSubmit">
    <div class="container mx-auto gap-5 grid grid-cols-2 flex-grow">
      <div class="col-span-2 row-span-full md:col-span-1 flex items-center px-4">
        <div
            class="sm:max-w-[400px] w-full mx-auto rounded-none p-4 bg-white shadow-sm border-solid border-s-amber-100 border-[1px]">
          <h2 class="text-4xl font-black text-center font-logo mt-4 mb-0">Lab-R.</h2>
          <h2 class="text-lg mb-8 text-primary text-center font-bold">Login Here</h2>

          <form-input
              id="username"
              v-model="form.username"
              :error="errors.username"
              label="Username"
              name="username"
          />
          <form-input
              id="password"
              v-model="form.password"
              :error="errors.password"
              :input-type="inputMode"
              :password="true"
              label="Password"
              name="password"
              @change-mode="handleChangeMode"
          />
          <div class="mb-8">
            <a class="text-primary font-bold">Forgot Password</a>
          </div>

          <button :disabled="loading"
                  class="h-[40px] bg-primary flex justify-center items-center text-white w-full focus:bg-blue-700"
                  type="submit">
            <span v-if="!loading" class="font-bold">Login</span>
            <svg-icon
                v-else
                class="animate-spin"
                :path="mdiGamepadCircle"
                :size="14"
                type="mdi"/>
          </button>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1 flex items-end md:items-center p-4">
        <!--
        <pre><code>form:{{form}}</code></pre>
        --->
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>
