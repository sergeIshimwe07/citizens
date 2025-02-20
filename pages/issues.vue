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
const categories = ref([]);
const itemToEdit = ref(null)
const showIssueForm = ref(false)
const loading = ref(false)
const headers: Header[] = [
    { text: "Citizen", value: "citizen", sortable: true },
    { text: "Category", value: "category", sortable: true },
    { text: "Title", value: "title", sortable: true },
    { text: "Status", value: "status", sortable: true },
    { text: "Date", value: "created_at", sortable: true },
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

const allowedDates = ref([])
const dataLoading = ref(false);
interface FormData {
    title: Field<string>;
    details: Field<string>;
    category_id: Field<number>;
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
    title: {
        $value: "",
        $rules: [rules.required("Please enter issue title")],
    },
    details: {
        $value: "",
        $rules: [rules.required("Please provide issue details")],
    },
    category_id: {
        $value: 0,
        $rules: [rules.required("Please select a category")],
    },
});

async function handleSubmit() {
    try {
        dataLoading.value = true;
        const formData = await validateFields();

        await http.fetch("createIssue", {
            method: "post",
            body: {
                title: form.title.$value,
                details: form.details.$value,
                category_id: form.category_id.$value,
            }
        })
            .then(res => {
                useToast().success(res.message);
                resetFields();
                showIssueForm.value = false
                getAllIssues()
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

function getAllIssues() {
    loading.value = true
    http.fetch("getIssues/0", {
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
function getIssueCategories() {
    http.fetch("getIssueCategories")
        .then(res => {
            categories.value = res
        })
        .catch(err => {
            console.log(err.data.message);
        })
}
onMounted(() => {
    getAllIssues()
    getIssueCategories()
})
const download = computed(() => {
    return config.public.apiUrl + "getAttendance/1/0/" + token
})

</script>
<template>
    <v-row>
        <v-col>
            <UiParentCard parent-title="Dashboard" title="Issues List">
                <v-row class="mb-4">
                    <v-col cols="12" md="6">
                        <v-text-field v-model="search" variant="outlined" density="compact" label="Search..."
                            prepend-inner-icon="mdi-magnify" single-line hide-details>
                        </v-text-field>
                    </v-col>
                    <v-col class="flex" cols="12" md="2">
                        <form :action="download" method="post" target="_blank">
                            <input type="hidden" v-model="formattedStartDate">
                            <v-btn prepend-icon="mdi-microsoft-excel" color="success" class="mx-2" type="submit">
                                Export
                            </v-btn>
                        </form>
                    </v-col>
                    <v-col class="flex" cols="12" md="3">
                        <v-btn @click="showIssueForm = true" prepend-icon="mdi-plus" color="primary" class="mx-2"
                            variant="tonal">
                            New Issue
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
                            <v-icon color="green-darken-3" size="30" @click="itemToEdit = item; showForm = true"
                                icon="mdi-eye-outline"></v-icon>
                            <v-icon color="red-darken-3" @click="showForm = true" icon="mdi-delete-forever"
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
        <v-col cols="12" md="4" v-if="showForm">
            <UiParentCard parent-title="Dashboard" title="Appointment Details" class="relative">
                <div class="absolute top-4 right-4">
                    <v-icon color="red-darken-2" icon="mdi-close" size="large" @click="showForm = false"></v-icon>
                </div>
                <div class="bg-white md:overflow-hidden">
                    <div class="px-4">
                        <div class="md:text-left">
                            <p v-if="itemToEdit?.status === '0'" class="text-left text-sm text-gray-600 md:mb-5">
                                This is appointment request from <strong>{{ itemToEdit?.citizen }}</strong>. Please select date and time
                                for the appointment to approve it. If it is exprired or not available, please close it.
                            </p>
                            <p v-if="itemToEdit?.status === '1'" class="text-left text-sm text-gray-600 md:mb-5">
                                This is appointment request from <strong>{{ itemToEdit?.citizen }}</strong>. You are now allowed to close it.
                            </p>
                            <p v-else class="text-left text-sm text-gray-600 md:mb-5">
                                This is appointment request from <strong>{{ itemToEdit?.citizen }}</strong>
                            </p>
                            <div  v-if="itemToEdit?.status === '0'">
                                <form class="mx-auto mb-3">
                                    <label for="time" class="block mb-2 text-sm font-medium text-gray-900">Select
                                        time:</label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd"
                                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="time" v-model="time"
                                            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700"
                                            min="09:00" max="18:00" value="00:00" required />
                                    </div>
                                </form>
                                <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn color="secondary" block v-bind="props">
                                            {{ `Date: ${formattedStartDate}` }}
                                        </v-btn>
                                    </template>
                                    <v-card min-width="300">
                                        <v-date-picker v-model="startDate" hide-header show-adjacent-months></v-date-picker>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" variant="text" @click="menu = false">
                                                Close
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                            </div>
                            <v-card-actions class="mt-5">
                                <v-spacer></v-spacer>
                                <v-btn color="primary" variant="outlined" class="mx-1" prepend-icon="mdi-close"
                                    @click="showForm = false">
                                    Cancel
                                </v-btn>
                                <v-btn v-if="itemToEdit?.status === '0'" :loading="btnLoading" elevation="10"
                                    variant="outlined" color="success" class="mx-1" prepend-icon="mdi-delete"
                                    @click="approveAppointment()">
                                    Approve Request
                                </v-btn>
                                <v-btn v-if="itemToEdit?.status === '1'" :loading="btnLoading" elevation="10"
                                    variant="outlined" color="success" class="mx-1" prepend-icon="mdi-delete"
                                    @click="requestAppointment()">
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </div>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="4" v-if="showIssueForm">
            <UiParentCard parent-title="Dashboard" title="Create Issue" class="relative">
                <div class="absolute top-4 right-4">
                    <v-icon color="red-darken-2" icon="mdi-close" size="large" @click="showIssueForm = false"></v-icon>
                </div>
                <div class="bg-white md:overflow-hidden">
                    <div class="px-4">
                        <div class="md:text-left">
                            <p class="text-left text-sm text-gray-600 md:mb-12 ">
                                Submit a new issue for review
                            </p>

                            <form @submit.prevent="handleSubmit" class="md:text-sm">
                                <div class="flex flex-col my-4 group">
                                    <label for="title" class="text-gray-700 text-sm">Title</label>
                                    <input type="text" id="title" v-model="form.title.$value"
                                        @blur="form.title.$validate()"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Enter issue title">
                                    <FormErrors :errors="form.title.$errors" class="p-error" />
                                </div>

                                <div class="flex flex-col my-4 group">
                                    <label for="category" class="text-gray-700 text-sm">Category</label>
                                    <v-select @blur="form.category_id.$validate()" density="compact" variant="outlined"
                                        v-model="form.category_id.$value" :items="categories" item-title="title"
                                        item-value="id" label="category" single-line hint="Select Category"></v-select>
                                    <FormErrors :errors="form.category_id.$errors" class="p-error" />
                                </div>

                                <div class="flex flex-col my-4 group">
                                    <label for="details" class="text-gray-700 text-sm">Details</label>
                                    <textarea id="details" v-model="form.details.$value"
                                        @blur="form.details.$validate()" rows="4"
                                        class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                        placeholder="Enter issue details"></textarea>
                                    <FormErrors :errors="form.details.$errors" class="p-error" />
                                </div>

                                <div class="my-4 flex items-center justify-end space-x-4">
                                    <v-btn @click.prevent="handleSubmit" :disabled="dataLoading" :loading="dataLoading"
                                        color="success" size="large" block flat>
                                        Submit Issue
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
