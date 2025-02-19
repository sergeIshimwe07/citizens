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
const showForm = ref(false)
const showIssueForm = ref(false)
const loading = ref(false)
const btnLoading = ref(false)
const menu = ref(false)
const isSending = ref(false)
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
            console.log(err.data.message);
        })
        .finally(() => {
            loading.value = false
            menu.value = false
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
function requestAppointment() {
    btnLoading.value = true
    http.fetch("createAppointment", {
        method: "get",
    })
        .then(res => {
            useToast().success(res.message);
            isSending.value = false
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
        .finally(() => {
            btnLoading.value = false
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
                    <v-col class="flex" cols="12" md="2">
                        <v-menu v-model="menu" :close-on-content-click="true" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" prepend-icon="mdi-plus" color="primary" class="mx-2"
                                    variant="tonal">
                                    New Action
                                </v-btn>
                            </template>

                            <v-card min-width="300">

                                <v-list>
                                    <v-list-item link @click="showIssueForm = true">
                                        New Issue
                                    </v-list-item>

                                    <v-list-item link @click="isSending = true">
                                        New Appointment
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </v-col>
                    <!-- <v-col class="flex" cols="12" md="2">
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
                                    <v-btn color="success" variant="outline" :loading="loading" @click="getAllIssues()">
                                        filter
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-col> -->
                </v-row>
                <ClientOnly>
                    <EasyDataTable empty-message="No Order found" :search-value="search" theme-color="#5d87ff"
                        table-class-name="eztable" :headers="headers" buttons-pagination :loading="loading"
                        :items="lists">
                        <template #item-status="item">
                            <v-chip size="small" :color="statusClr(item.status)"> {{ statusStr(item.status) }}
                            </v-chip>
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
        <v-dialog v-model="isSending" persistent width="400">
            <v-card>
                <v-card-title class="text-h5">Appointment request </v-card-title>
                <v-card-text>
                    <div class="text-lg text-start justify-start">
                        Note that appointment date and will be set as confirmation. You'll need to check here
                    </div>
                </v-card-text>
                <v-card-actions class="mt-5">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" variant="outlined" class="mx-1" prepend-icon="mdi-close"
                        @click="isSending = false">
                        Cancel
                    </v-btn>
                    <v-btn :loading="btnLoading" elevation="10" variant="outlined" color="success" class="mx-1"
                        prepend-icon="mdi-delete" @click="requestAppointment()">
                        Request
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
