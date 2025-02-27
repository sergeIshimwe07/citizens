<script setup lang="ts">

definePageMeta({
  layout: "default",
});
let user: any;
const http = useHttpRequest()
const state = ref(1)
const dataLoading = ref(false)
const email = ref("")
// handle success event
const show = ref(false)
function toggle(value: boolean) {
  show.value = value
}

function createAccount() {
  dataLoading.value = true
  http.fetch("createAccount", {
    method: "post",
    body: {
      value: email.value,
    }
  })
    .then(res => {
      useToast().success(res.message)
      state.value = 3
    })
    .catch(err => {
      useToast().error(err.data.message)
    })
    .finally(() => {
      dataLoading.value = false
    })
}
import { Field, useValidation } from "vue3-form-validation";
import { rules } from "~/utils/rules";
import { useAuth } from '~~/composables/useAuth';
const { login, loading } = useAuth();
const api = useApi();

// const toast = useToast();

interface FormData {
  email: Field<string>;
  password: Field<string>;
  isDistrict: Field<boolean>;
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
  email: {
    $value: "",
    $rules: [rules.required("Please enter email or phone number")],
  },
  password: {
    $value: "",
    $rules: [rules.min(6)("Password has to be longer than 6 characters")],
  },
  isDistrict: {
    $value: false
  },
});
async function handleSubmit() {
  try {
    const formData = await validateFields();
    login(form.email.$value, form.password.$value, form.isDistrict.$value);
  } catch (e) {

  }
}
</script>

<template>
  <div>
    <div class="bg-white md:overflow-hidden">
      <div class="px-4 py-20 md:py-4">
        <div class="md:max-w-6xl md:mx-auto">
          <div class="md:flex md:flex-wrap">
            <div class="md:w-1/2  md:text-left md:pt-28">
              <h1 class="font-bold text-primary text-3xl md:text-5xl leading-tight mb-4">
                Login
              </h1>
              <p class="text-left md:text-xl text-gray-600 md:mb-12 mt-2">Welcome back, login to your account
              </p>
              <form @submit.prevent="handleSubmit" class="  md:text-sm md:pr-48">
                <div class="flex flex-col my-4 group">
                  <label for="email" class="text-gray-700 text-sm  group-focus:text-orange-400">E-mail/Phone Number
                  </label>
                  <input type="email" name="email" id="email" v-model="form.email.$value" @blur="form.email.$validate()"
                    class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                    placeholder="Enter your email or phone number">
                  <FormErrors :errors="form.email.$errors" class="p-error" />

                </div>
                <div class="flex flex-col my-4">
                  <label for="password" class="text-gray-700 text-sm">Password</label>
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
                  <v-btn @click.prevent="handleSubmit" :disabled="loading" :loading="loading" color="primary" rounded="xl"
                    size="large" block flat>
                    Login</v-btn>
                </div>
                <v-row justify="center">
                  <p class="mt-10 text-gray-700">Click <nuxt-link to="/register"><strong class="cursor-pointer text-black">here</strong></nuxt-link> to register as Resident</p>
                  <!-- <v-btn color="primary" size="large" flat variant="text">Forgot Password?</v-btn> -->
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
