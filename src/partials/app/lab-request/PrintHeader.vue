<script lang="ts" setup>

import {titleCase} from "@/lib.ts";
import notification from "@/notyft.ts";
import {computed, ComputedRef, onMounted, ref} from "vue";
import {API_HOST} from "@/constants.ts";
import {UserCompany} from "@/models/auth.models.ts";
import {useStore} from "vuex";

const base64Logo = ref(null)
const store = useStore()

const company: ComputedRef<UserCompany> = computed(() => store.getters["auth/company"])

onMounted(() => {
  if (company.value.logo) {
    let url = `${API_HOST}${company.value.logo}`
    convertImageUrlToBase64(url, (data: string) => {
      base64Logo.value = data
    })
  }
})

const convertImageUrlToBase64 = (url: string, callback) => {
  let image = new Image()
  image.crossOrigin = "anonymous"
  image.src = url
  image.onload = function () {
    let canvas = document.createElement("canvas")
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    canvas.getContext("2d").drawImage(image, 0, 0)
    let dataUrl = canvas.toDataURL("image/png")
    callback && callback(dataUrl)
  }
  image.onerror = function (error) {
    notification.error(error)
  }
}

</script>

<template>
  <div class="mb-6 flex justify-between ">
    <div>
      <img v-if="base64Logo" :src="base64Logo" alt="Company Logo" class="h-[100px]" height="50">
    </div>
    <div class="text-right">
            <span class="block">
              <span v-if="company.addressLine1">{{ company.addressLine1 }}</span>
              <span v-if="company.addressLine2">, {{ titleCase(company.addressLine2) }}</span>
            </span>
      <span v-if="company.telephone" class="block">{{ company.telephone }}</span>
      <span v-if="company.mobile" class="block">{{ company.mobile }}</span>
      <span v-if="company.email" class="block">{{ company.email }}</span>
    </div>

  </div>

</template>

<style scoped>

</style>
