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
                                    info?.names
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
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const http = useHttpRequest();
const info = ref({});
const password = ref("")
const oldPassword = ref("")
const confirmPassword = ref("")
const dataLoading = ref(false)
const show = ref(false)

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

</script>