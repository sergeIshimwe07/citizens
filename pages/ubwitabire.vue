<script setup lang="ts">
import useGeolocation from '~/composables/useGeolocation';
definePageMeta({
    layout: "default",
});
const route = useRoute()

const loading = ref(false)
const district = ref(route.query.di ? route.query.di : '')
const attendance = ref(route.query.at ? route.query.at : '')


import { Field, useValidation } from "vue3-form-validation";
import { rules } from "~/utils/rules";

const http = useHttpRequest()
const latitude = ref("")
const longitude = ref("")
interface FormData {
    name: Field<string>;
    sfid: Field<string>;
    site: Field<string>;
}
const {
    form,
    validateFields,
} = useValidation<FormData>({
    name: {
        $value: "",
        $rules: [rules.min(3)("Amazina ya nyayo ni ngombwa")],
    },
    sfid: {
        $value: "",
        $rules: [rules.min(3)("Nimero uhemberwaho igombwa kugira byibuze imibare 3")],
    },
    site: {
        $value: "",
        $rules: [rules.min(1)("Site ni ngombwa")],
    },
});
function test() {
    const expiryTime = new Date().getTime() + 15 * 1000; // 15 seconds in milliseconds
    localStorage.setItem("isFilled", JSON.stringify({ data: "done", expiryTime: expiryTime }));
    isFilled.value = "done";
}
async function handleSubmit() {

    try {
        const formData = await validateFields();

        if (longitude.value === '' || latitude.value === '') {
            longitude.value === ''
            latitude.value === ''
            // useToast().error("Your location is not captured, check if you enabled location and refresh the page")
            // return
        }
        loading.value = true
        http.fetch("saveAttendance", {
            method: "post",
            body: {
                "formData": formData,
                "latitude": latitude.value,
                "longitude": longitude.value,
                "attendance_id": attendance.value,
                "district": district.value
            }
        })
            .then(res => {
                const expiryTime = new Date().getTime() + 5 * 60 * 60 * 1000;
                localStorage.setItem("isFilled", JSON.stringify({ data: "done", expiryTime: expiryTime }));
                isFilled.value = "done"
                useToast().success(res.message)
            })
            .catch(err => {
                useToast().error(err.data.message)
            })
            .finally(() => {
                loading.value = false
            })
    } catch (e) {

    }
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            handleSuccess,
            handleError
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function handleSuccess(position: any) {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;
}

function handleError(error: any) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
        default:
            console.error("An unknown error occurred while getting location.");
            break;
    }
}
const isFilled: any = ref("")
const checkExpiryAndReadData = () => {
    const storedData = localStorage.getItem("isFilled");
    if (storedData) {
        const { data, expiryTime } = JSON.parse(storedData);
        if (expiryTime && new Date().getTime() < expiryTime) {
            // Data is not expired
            isFilled.value = data;
        } else {
            // Data is expired, clear it
            localStorage.removeItem("isFilled");
        }
    }
};
onMounted(() => {
    getLocation()
    checkExpiryAndReadData()
})
</script>
<template>
    <div>
        <div class="bg-white md:overflow-hidden">
            <div class="px-4 py-20 md:py-4">
                <div class="md:max-w-6xl md:mx-auto">
                    <div class="md:flex md:flex-wrap">
                        <div v-if="isFilled === 'done'" class="md:w-2/3 md:text-left md:pt-28 relative rounded-xl">
                            <img src="~assets/done.gif" alt="" srcset="" class="rounded-lg">
                            <h1 class="absolute bottom-10 left-0 right-0 text-2xl font-medium text-center text-white">
                                Ubwitabire bwabitswe neza</h1>
                        </div>
                        <div v-else class="md:w-2/3  md:text-left md:pt-28">
                            <h1 class="font-bold text-primary text-3xl md:text-3xl leading-tight mb-4">
                                UBWITABIRE
                            </h1>
                            <p class="text-left md:text-xl text-gray-600 md:mb-12 mt-2">Iyi paji ifata aho uherereye</p>
                            <form @submit.prevent="handleSubmit" class="  md:text-sm md:pr-48">
                                <div class="flex flex-col my-7 group">
                                    <label for="name" class="text-gray-700 text-sm  group-focus:text-orange-400">Amazina
                                    </label>
                                    <input type="name" name="name" id="name" v-model="form.name.$value"
                                        @blur="form.name.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Amazina yawe hano...">
                                    <FormErrors :errors="form.name.$errors" class="p-error" />
                                </div>
                                <div class="flex flex-col my-7 group">
                                    <label for="SFID" class="text-gray-700 text-sm  group-focus:text-orange-400">SFID
                                    </label>
                                    <input type="SFID" name="SFID" id="SFID" v-model="form.sfid.$value"
                                        @blur="form.sfid.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Nimero uhemberwaho...">
                                    <FormErrors :errors="form.sfid.$errors" class="p-error" />
                                </div>
                                <div class="flex flex-col my-7 group">
                                    <label for="site" class="text-gray-700 text-sm  group-focus:text-orange-400">SITE cg
                                        Zone
                                    </label>
                                    <input type="site" name="site" id="site" v-model="form.site.$value"
                                        @blur="form.site.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Zone yawe...">
                                    <FormErrors :errors="form.site.$errors" class="p-error" />
                                </div>

                                <div class="my-4 flex items-center justify-end space-x-4">
                                    <v-btn @click.prevent="handleSubmit" :disabled="loading" :loading="loading"
                                        color="success" size="large" block flat>
                                        Register</v-btn>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <svg class="fill-current text-white hidden md:block" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 160">
                <path fill-opacity="1" d="M0,224L1440,32L1440,320L0,320Z"></path>
            </svg>
        </div>
    </div>
</template>
