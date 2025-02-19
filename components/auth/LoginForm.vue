
<script lang='ts' setup>
import { ref } from 'vue';

// import { useToast } from "primevue/usetoast";
import { Field, useValidation } from "vue3-form-validation";
import { rules } from "~/utils/rules";
import { useAuth } from '~~/composables/useAuth';
const { login, loading } = useAuth();
// const toast = useToast();
const checkbox = ref(true);

interface FormData {
  email: Field<string>;
  password: Field<File[]>;
  remember: Field<boolean>;
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
    $rules: [rules.email("Please enter a valid email address")],
  },
  password: {
    $value: [],
    $rules: [rules.min(6)("Password has to be longer than 6 characters")],
  },
  remember: {
    $value: false
  },
});
async function handleSubmit() {
  try {
    const formData = await validateFields();
    login(form.email.$value, form.password.$value,form.remember.$value);
    // testlogin(form.email.$value, form.password.$value,form.remember.$value);

  } catch (e) {
    // toast.add({
    //   severity: "error",
    //   summary: "Login error",
    //   detail: e,
    //   life: 3000,
    //   group: "login",
    // });
  }
}

</script>

<template>
    <form role="form" @submit.prevent="handleSubmit">
        <v-row class="d-flex mb-3">
       
       <v-col cols="12">
           <v-label class="font-weight-bold mb-1">Username</v-label>
           <v-text-field variant="outlined" v-model="form.email.$value" @blur="form.email.$validate()" hide-details color="primary"></v-text-field>
           <FormErrors :errors="form.email.$errors" class="p-error" />
       </v-col>
       <v-col cols="12">
           <v-label class="font-weight-bold mb-1">Password</v-label>
           <v-text-field variant="outlined" type="password" v-model="form.password.$value" @blur="form.password.$validate()" hide-details color="primary"></v-text-field>
           <FormErrors :errors="form.password.$errors" class="p-error" />
       </v-col>
       <v-col cols="12" class="pt-0">
           <div class="d-flex flex-wrap align-center ml-n2">
               <!-- <v-checkbox v-model="checkbox"  color="primary" hide-details> -->
                   <!-- <template v-slot:label class="text-body-1">Remeber this Device</template> -->
               </v-checkbox>
               <div class="ml-sm-auto">
                   <NuxtLink to="/"
                       class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot
                       Password ?</NuxtLink>
               </div>
           </div>
       </v-col>
       <v-col cols="12" class="pt-0">
           
           <v-btn @click.prevent="handleSubmit" :disabled="loading" color="primary" size="large" block   flat>{{loading ? 'Loading...' : 'Sign iin'}}</v-btn>
       </v-col>
     
   </v-row>
    </form>
   
</template>
