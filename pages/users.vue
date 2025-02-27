<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { Header } from "vue3-easy-data-table"
import { Field, useValidation } from "vue3-form-validation";
import { rules } from "~/utils/rules";

definePageMeta({
    layout: "admin",
});
const http = useHttpRequest()
const config = useRuntimeConfig()
const token = localStorage.getItem("token")
const search = ref("");
const lists = ref([]);
const mentorTypes = ref([]);
const types = computed(() => {
    if (user.type == '1') {
        return [{ id: 1, name: "Admin" },
        { id: 2, name: "Leader" },
        { id: 3, name: "Mentor" },]
    }
    if (user.type == '2') {
        return [{ id: 3, name: "Mentor" },]
    }
    return []
})
const itemToEdit = ref(null)
const showUserForm = ref(false)
const loading = ref(false)
const headers: Header[] = [
    { text: "Full names", value: "names", sortable: true },
    { text: "Phone", value: "phone", sortable: true },
    { text: "E-mail", value: "email", sortable: true },
    { text: "User Type", value: "type", sortable: true },
    { text: "Status", value: "Status", sortable: true },
    { text: "Action", value: "action", sortable: false },
]
const user: any = JSON.parse(localStorage.getItem("logger"))

const startDate = ref(new Date());
const formattedStartDate = ref(
    `${startDate.value.getFullYear()}-${(startDate.value.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate.value
            .getDate()
            .toString()
            .padStart(2, "0")}`
);

watch(startDate, () => {
    formattedStartDate.value = `${startDate.value.getFullYear()}-${(
        startDate.value.getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}-${startDate.value.getDate().toString().padStart(2, "0")}`;
});

const dataLoading = ref(false);
interface FormData {
    names: Field<string>;
    phone: Field<string>;
    email: Field<string>;
    idNumber: Field<number | string>;
    type: Field<number>;
    mentorType: Field<number>;
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
        $rules: [rules.required("Please enter phone number")],
    },
    email: {
        $value: "",
        $rules: [rules.required("Please enter email address")],
    },
    idNumber: {
        $value: "",
        $rules: [rules.required("Please enter ID number")],
    },
    type: {
        $value: 1,
        $rules: [rules.required("Please select user type")],
    },
    mentorType: {
        $value: 1,
    }
});

async function handleSubmit() {
    try {
        dataLoading.value = true;
        const formData = await validateFields();

        await http.fetch("createUser", {
            method: "post",
            body: {
                names: form.names.$value,
                phone: form.phone.$value,
                email: form.email.$value,
                idNumber: form.idNumber.$value,
                type: form.type.$value,
                mentorType: form.mentorType.$value
            }
        })
            .then(res => {
                useToast().success(res.message);
                resetFields();
                showUserForm.value = false
                getAllUsers()
            })
            .catch(err => {
                useToast().error(err.data.message);
            })
            .finally(() => {
                dataLoading.value = false;

            });
    } catch (e) {
        dataLoading.value = false;
    }
}
const statusStr = (status: string) => {
    if (status == "1") {
        return "Active";
    } else if (status == "2") {
        return "Closed";
    } else {
        return "Pending";
    }
}

const statusClr = (status: string) => {
    if (status == "1") {
        return "success";
    } else if (status == "2") {
        return "error";
    } else {
        return "warning";
    }
}

function getAllUsers() {
    loading.value = true
    http.fetch("getUsers/0", {
        method: "get",
    })
        .then(res => {
            lists.value = res
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
        .finally(() => {
            loading.value = false
        })
}
function getMentorshipTypes() {
    http.fetch("getMentorshipTypes")
        .then(res => {
            mentorTypes.value = res
        })
        .catch(err => {
            console.log(err.data.message);
        })
}
onMounted(() => {
    getAllUsers()
    getMentorshipTypes()
})
const download = computed(() => {
    return config.public.apiUrl + "getAttendance/1/0/" + token
})

</script>
<template>
    <v-row>
        <v-col>
            <UiParentCard parent-title="Dashboard" title="Users List">
                <v-row class="mb-4">
                    <v-col cols="12" md="6">
                        <v-text-field v-model="search" variant="outlined" density="compact" label="Search..."
                            prepend-inner-icon="mdi-magnify" single-line hide-details>
                        </v-text-field>
                    </v-col>
                    <v-col class="flex" cols="12" md="5">
                        <v-btn @click="showUserForm = true" prepend-icon="mdi-plus" color="primary" class="mx-2"
                            variant="tonal">
                            New User
                        </v-btn>
                    </v-col>
                </v-row>
                <ClientOnly>
                    <EasyDataTable empty-message="No Order found" :search-value="search" theme-color="#5d87ff"
                        table-class-name="eztable" :headers="headers" buttons-pagination :loading="loading"
                        :items="lists">
                        <template #item-status="item">
                            <v-chip size="small" :color="statusClr(item.status)"> {{ statusStr(item.status) }}
                            </v-chip>
                        </template>
                        <template #item-action="item">
                            <v-icon color="green-darken-3" size="30" @click="itemToEdit = item; showUserForm = true"
                                icon="mdi-eye-outline"></v-icon>
                            <v-icon color="red-darken-3" @click="showUserForm = true" icon="mdi-delete-forever"
                                size="large"></v-icon>
                        </template>
                        <template #empty-message>
                            <div class="d-flex justify-center align-center py-3">
                                <v-img src="/images/products/not_found.png" height="150"></v-img>
                            </div>
                            <p class="text-muted font-weight-light"> No Found</p>
                        </template>
                    </EasyDataTable>
                </ClientOnly>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="4" v-if="showUserForm">
            <UiParentCard parent-title="Dashboard" title="Create User" class="relative">
                <div class="absolute top-4 right-4">
                    <v-icon color="red-darken-2" icon="mdi-close" size="large" @click="showUserForm = false"></v-icon>
                </div>
                <div class="bg-white md:overflow-hidden">
                    <div class="px-4">
                        <div class="md:text-left">
                            <p class="text-left text-sm text-gray-600 md:mb-12 ">
                                Create new User
                            </p>
                            <form @submit.prevent="handleSubmit" class="md:text-sm">
                                <div class="flex flex-col my-4 group">
                                    <label for="names" class="text-gray-700 text-sm">Full Names</label>
                                    <input type="text" id="names" v-model="form.names.$value"
                                        @blur="form.names.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Enter full names">
                                    <FormErrors :errors="form.names.$errors" class="p-error" />
                                </div>

                                <div class="flex flex-col my-4 group">
                                    <label for="phone" class="text-gray-700 text-sm">Phone</label>
                                    <input type="text" id="phone" v-model="form.phone.$value"
                                        @blur="form.phone.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Enter phone number">
                                    <FormErrors :errors="form.phone.$errors" class="p-error" />
                                </div>

                                <div class="flex flex-col my-4 group">
                                    <label for="email" class="text-gray-700 text-sm">Email</label>
                                    <input type="email" id="email" v-model="form.email.$value"
                                        @blur="form.email.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Enter email address">
                                    <FormErrors :errors="form.email.$errors" class="p-error" />
                                </div>
                                <div class="flex flex-col my-4 group">
                                    <label for="idNumber" class="text-gray-700 text-sm">ID Number</label>
                                    <input type="number" id="idNumber" v-model="form.idNumber.$value"
                                        @blur="form.idNumber.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Enter ID number">
                                    <FormErrors :errors="form.idNumber.$errors" class="p-error" />
                                </div>

                                <div class="flex flex-col my-4 group">
                                    <label for="type" class="text-gray-700 text-sm">User Type</label>
                                    <v-select @blur="form.type.$validate()" density="compact" variant="outlined"
                                        v-model="form.type.$value" :items="types" item-title="name" item-value="id"
                                        label="Select user type" single-line></v-select>
                                    <FormErrors :errors="form.type.$errors" class="p-error" />
                                </div>

                                <div v-if="form.type.$value === 3" class="flex flex-col my-4 group">
                                    <label for="mentorType" class="text-gray-700 text-sm">Mentor Type</label>
                                    <v-select @blur="form.mentorType.$validate()" density="compact" variant="outlined"
                                        v-model="form.mentorType.$value" :items="mentorTypes" item-title="title"
                                        item-value="id" label="Select mentor type" single-line></v-select>
                                    <FormErrors :errors="form.mentorType.$errors" class="p-error" />
                                </div>

                                <div class="my-4 flex items-center justify-end space-x-4">
                                    <v-btn @click.prevent="handleSubmit" :disabled="dataLoading" :loading="dataLoading"
                                        color="success" size="large" block flat>
                                        Submit User
                                    </v-btn>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
