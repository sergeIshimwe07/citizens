<template>
    <div>
        <v-row>
            <v-col cols="12" md="4">
                <v-card elevation="10" class="rounded-lg">
                    <v-card-text>
                        <div class="pa-1 border-b-2 mb-4 py-2 border-gray-200">
                            <div class="d-flex justify-between pb-2">
                                <div class="h4 font-bold">Profile Info</div>
                                <!-- <v-btn icon="mdi-pencil" variant="text" size="small"></v-btn> -->
                            </div>

                            <v-list-item class="w-100 my-4">
                                <template v-slot:prepend>
                                    <v-avatar color="grey-darken-3"
                                        image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
                                </template>

                                <v-list-item-title>{{
                                    info?.name
                                }}</v-list-item-title>

                                <v-list-item-subtitle class="text-13">Email:
                                    {{
                                        info?.email
                                    }}</v-list-item-subtitle>
                                <v-list-item-subtitle class="text-13">Phone:
                                    {{
                                        info?.phone
                                    }}</v-list-item-subtitle>
                            </v-list-item>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="8"><v-card elevation="10" class="withbg rounded-lg">
                    <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
                        <v-tab :value="0">Change Password</v-tab>
                        <v-tab  @click="setFormValuesForEdit" :value="1">Edit Info</v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="0">
                            <v-card-text>
                                <div class="bg-borderColor rounded-lg pa-2">
                                    <div class="d-flex justify-between pb-2">
                                        <div class="h4 px-4 font-bold">Change password</div>
                                        <!-- <v-btn icon="mdi-pencil" variant="text" size="small"></v-btn> -->
                                    </div>
                                </div>

                                <v-col cols="12" md="12">
                                    <div class="flex flex-col my-4">
                                        <label for="password" class="text-gray-700 text-sm">Current Password</label>
                                        <div x-data="{ show: true }" class="relative flex items-center mt-2">
                                            <input :type="show ? 'text' : 'password'" name="password" id="password"
                                                v-model="oldPassword"
                                                class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                                placeholder="Enter your password">
                                            <div
                                                class="absolute right-2 bg-transparent cursor-pointer flex items-center justify-center text-gray-700">
                                                <EyeIcon @click="toggle(true)" size="18" class="text-gray-400"
                                                    :class="show ? 'hidden' : ''" />
                                                <EyeOffIcon @click="toggle(false)" size="18" class="text-gray-400"
                                                    :class="!show ? 'hidden' : ''" />
                                            </div>

                                        </div>

                                    </div>
                                    <div class="flex flex-col my-4">
                                        <label for="password" class="text-gray-700 text-sm">New Password</label>
                                        <div x-data="{ show: true }" class="relative flex items-center mt-2">
                                            <input :type="show ? 'text' : 'password'" name="password" id="password"
                                                v-model="password"
                                                class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                                placeholder="Enter your password">
                                            <div
                                                class="absolute right-2 bg-transparent cursor-pointer flex items-center justify-center text-gray-700">
                                                <EyeIcon @click="toggle(true)" size="18" class="text-gray-400"
                                                    :class="show ? 'hidden' : ''" />
                                                <EyeOffIcon @click="toggle(false)" size="18" class="text-gray-400"
                                                    :class="!show ? 'hidden' : ''" />
                                            </div>

                                        </div>

                                    </div>
                                    <div class="flex flex-col my-4">
                                        <label for="password" class="text-gray-700 text-sm">Confirm Password</label>
                                        <div x-data="{ show: true }" class="relative flex items-center mt-2">
                                            <input :type="show ? 'text' : 'password'" name="password" id="password"
                                                v-model="confirmPassword"
                                                class="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                                placeholder="Enter your password">
                                            <div
                                                class="absolute right-2 bg-transparent cursor-pointer flex items-center justify-center text-gray-700">
                                                <EyeIcon @click="toggle(true)" size="18" class="text-gray-400"
                                                    :class="show ? 'hidden' : ''" />
                                                <EyeOffIcon @click="toggle(false)" size="18" class="text-gray-400"
                                                    :class="!show ? 'hidden' : ''" />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="my-4 flex items-center justify-end space-x-4">
                                        <v-btn @click="changePassword" :disabled="dataLoading" :loading="dataLoading"
                                            color="success" size="large" block flat>
                                            Save New Password</v-btn>
                                    </div>
                                </v-col>
                            </v-card-text>
                        </v-tabs-window-item>
                        <v-tabs-window-item value="1">
                            <v-card-text>
                                <div class="pa-1 border-b-2 mb-4 py-2 border-gray-200">
                                    <div class="d-flex justify-between pb-2">
                                        <div class="h4 font-bold">Edit Profile</div>
                                        <!-- <v-btn icon="mdi-pencil" variant="text" size="small"></v-btn> -->
                                    </div>
                                    <v-list-item class="w-100 my-4">
                                        <v-list-item-title class="py-2">
                                            <v-text-field v-model="form.names.$value" label="Name" variant="outlined" density="compact"
                                                @blur="form.names.$validate()" dense></v-text-field>
                                            <FormErrors :errors="form.names.$errors" class="p-error" />
                                        </v-list-item-title>
                                        <v-list-item-subtitle class="py-2">
                                            <v-text-field v-model="form.email.$value" label="Email" variant="outlined" density="compact"
                                                @blur="form.email.$validate()" dense></v-text-field>
                                            <FormErrors :errors="form.email.$errors" class="p-error" />
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle class="py-2">
                                            <v-text-field v-model="form.phone.$value" label="Phone" variant="outlined" density="compact"
                                                @blur="form.phone.$validate()" dense></v-text-field>
                                            <FormErrors :errors="form.phone.$errors" class="p-error" />
                                        </v-list-item-subtitle>
                                    </v-list-item>
                                    <div class="my-4 flex items-center justify-end space-x-4">
                                        <v-btn @click="updateProfile" :disabled="dataLoading" :loading="dataLoading"
                                            color="success" size="large" block flat>
                                            Save Changes</v-btn>
                                    </div>
                                </div>
                            </v-card-text>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Field, useValidation } from "vue3-form-validation";

const http = useHttpRequest();
const info = ref({
    uid: "",
    name: "",
    email: "",
    phone: "",
});
const password = ref("")
const oldPassword = ref("")
const confirmPassword = ref("")
const dataLoading = ref(false)
const show = ref(false)
const tab = ref(null)

definePageMeta({
    layout: "admin",
});

onMounted(() => {
    // Retrieve data from local storage
    const loggerData = localStorage.getItem("logger");

    // Parse the logger data into JSON
    info.value = loggerData ? JSON.parse(loggerData) : null;

});

function toggle(value: boolean) {
    show.value = value
}

interface FormData {
    names: Field<string>;
    phone: Field<string>;
    email: Field<string>;
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
    names: {
        $value: "",
        $rules: [rules.required("Please enter your full names")],
    },
    phone: {
        $value: "",
        $rules: [
            rules.required("Please enter phone number"),
            rules.min(10)("Phone number has to be 10 characters"),
            rules.max(10)("Phone number has to be 10 characters"),
            (value: string) => /^\d+$/.test(value) || "Phone number must contain only digits",
        ],
    },
    email: {
        $value: "",
        $rules: [rules.required("Please enter email address")],
    },
});

function changePassword() {
    dataLoading.value = true
    http.fetch("changePassword", {
        method: "post",
        body: {
            current: oldPassword.value,
            newPassword: password.value,
            confirm: confirmPassword.value
        }
    })
        .then(res => {
            oldPassword.value = ''
            password.value = ''
            confirmPassword.value = ''
            useToast().success(res.message)
        })
        .catch(err => {
            useToast().error(err.data.message)
        })
        .finally(() => {
            dataLoading.value = false
        })
}

function updateProfile() {
    dataLoading.value = true
    validateFields()
        .then(() => {
            http.fetch("editUserInfo", {
                method: "post",
                body: {
                    id: info.value?.uid,
                    names: form.names.$value,
                    phone: form.phone.$value,
                    email: form.email.$value
                }
            })
                .then(res => {
                    localStorage.clear()
                    navigateTo("/")
                    useToast().success(res.message)
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

function setFormValuesForEdit() {
    console.log(info.value);
    
    form.names.$value = info.value?.name
    form.phone.$value = info.value?.phone
    form.email.$value = info.value?.email
}

</script>