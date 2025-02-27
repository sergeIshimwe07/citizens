<script setup lang="ts">

definePageMeta({
  layout: "default",
});
const http = useHttpRequest()
const dataLoading = ref(false)
const show = ref(false)
function toggle(value: boolean) {
  show.value = value
}
// handle success event
function createAccount() {
  dataLoading.value = true
  validateFields()
    .then(() => {
      http.fetch("createAccount", {
        method: "post",
        body: {
          names: form.names.$value,
          phone: form.phone.$value,
          email: form.email.$value,
          isibo: form.isibo.$value,
          password: form.password.$value,
        }
      })
        .then(res => {
          resetFields()
          localStorage.setItem("token", res.token);
          localStorage.setItem("logger", JSON.stringify(res));
          navigateTo(res.redirect);
        })
        .catch(err => {
          useToast().error(err.data.message)
        })
        .finally(() => {
          dataLoading.value = false
        })
    })
    .catch(() => {
      dataLoading.value = false
    })
}
import { Field, useValidation } from "vue3-form-validation";
import { rules } from "~/utils/rules";
// const toast = useToast();

interface FormData {
  phone: Field<string>;
  email: Field<string>;
  isibo: Field<string>;
  names: Field<string>;
  password: Field<string>;
}
const {
  form,
  submitting,
  validating,
  errors,
  hasError,
  validateFields,
  resetFields,
} = useValidation<FormData>({
  phone: {
    $value: "",
    $rules: [
      rules.required("Please enter phone number"),
      rules.min(10)("Phone number has to be 10 characters"),
      rules.max(10)("Phone number has to be 10 characters"),
    ],
  },
  email: {
    $value: "",
    $rules: [
      rules.required("Please enter email address"),
      rules.email("Please enter a valid email address")
    ],
  },
  isibo: {
    $value: "",
    $rules: [rules.required("Please enter isibo")],
  },
  names: {
    $value: "",
    $rules: [rules.required("Please enter your full names")],
  },
  password: {
    $value: "",
    $rules: [rules.min(6)("Password has to be longer than 6 characters")],
  },
});
</script>
<template>
  <div>
    <div class="bg-white md:overflow-hidden">
      <div class="px-4 py-20 md:py-4">
        <div class="md:max-w-6xl md:mx-auto">
          <div class="md:flex md:flex-wrap">
            <div class="md:w-1/2  md:text-left md:pt-28">
              <h1 class="font-bold text-primary text-3xl md:text-5xl leading-tight mb-4">
                Sign Up
              </h1>
              <p class="text-left md:text-xl text-gray-600 md:mb-12 mt-2">Fill this form to create resident account
              </p>
              <form @submit.prevent="createAccount" class="md:text-sm md:pr-48">
                <div class="flex flex-col my-4 group">
                  <input type="text" name="names" id="names" v-model="form.names.$value"
                    class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                    placeholder="Enter your full names ">
                  <FormErrors :errors="form.names.$errors" class="p-error" />
                </div>
                <div class="flex flex-col my-4 group">
                  <input type="text" name="phone" id="phone" v-model="form.phone.$value"
                    class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                    placeholder="Enter phone number">
                  <FormErrors :errors="form.phone.$errors" class="p-error" />
                </div>
                <div class="flex flex-col my-4 group">
                  <input type="text" name="email" id="email" v-model="form.email.$value"
                    class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                    placeholder="Enter your email address">
                  <FormErrors :errors="form.email.$errors" class="p-error" />
                </div>
                <div class="flex flex-col my-4 group">
                  <input type="text" name="isibo" id="isibo" v-model="form.isibo.$value"
                    class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                    placeholder="Enter your isibo">
                  <FormErrors :errors="form.isibo.$errors" class="p-error" />
                </div>
                <div class="flex flex-col my-4">
                  <div x-data="{ show: true }" class="relative flex items-center mt-2">
                    <input :type="show ? 'text' : 'password'" name="password" id="password"
                      v-model="form.password.$value" @blur="form.password.$validate()"
                      class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                      placeholder="Enter your password">
                    <div
                      class="absolute right-2 bg-transparent cursor-pointer flex items-center justify-center text-gray-700">
                      <EyeIcon @click="toggle(true)" size="18" class="text-gray-400" :class="show ? 'hidden' : ''" />
                      <EyeOffIcon @click="toggle(false)" size="18" class="text-gray-400"
                        :class="!show ? 'hidden' : ''" />
                    </div>

                  </div>
                  <FormErrors :errors="form.password.$errors" class="p-error" />

                </div>
                <div class="my-4 flex items-center justify-end space-x-4">
                  <v-btn @click.prevent="createAccount" :disabled="dataLoading" :loading="dataLoading" rounded="xl"
                    color="primary" size="large" block flat>
                    Create account
                  </v-btn>
                </div>
                <v-row justify="center">
                  <v-btn to="/" color="primary" size="large" variant="text">
                    Back to Login
                  </v-btn>
                </v-row>
              </form>
            </div>
          </div>
        </div>
      </div>
      <svg class="fill-current text-white hidden md:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
        <path fill-opacity="1" d="M0,224L1440,32L1440,320L0,320Z"></path>
      </svg>
    </div>
  </div>
</template>
