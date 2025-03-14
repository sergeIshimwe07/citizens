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
const appointmentTypes = ref([]);
const residents = ref([])
const showForm = ref(false)
const loading = ref(false)
const dialog = ref(false)
const btnLoading = ref(false)
const menu = ref(false)
const isSending = ref(false)
const resident = ref<any>("")
const mentorType = ref<any>("")
const feedback = ref<any>("")
const time = ref("")
const itemToEdit = ref<any>(null)
const headers: Header[] = [
    { text: "Citizen", value: "citizen", sortable: true },
    { text: "Appointment Date", value: "date", sortable: true },
    { text: "Time", value: "time", sortable: true },
    { text: "Date created", value: "created_at", sortable: true },
    { text: "Type", value: "type", sortable: true },
    { text: "Feedback", value: "feedback", sortable: true },
    { text: "Status", value: "status", sortable: true },
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
const statusStr = (status: string) => {
    if (status == "1") {
        return "Active";
    } else if (status == "2") {
        return "Completed";
    } else if (status == "3") {
        return "Missed";
    } else if (status == "4") {
        return "Cancelled";
    } else {
        return "Pending";
    }
}
const statusClr = (status: string) => {
    if (status == "1") {
        return "success";
    } else if (status == "2") {
        return "info";
    } else if (status == "3") {
        return "error";
    } else if (status == "4") {
        return "warning";
    } else {
        return "primary";
    }
}

function getAllAppointments() {
    loading.value = true
    http.fetch("getAppointments", {
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
function requestAppointment() {
    btnLoading.value = true
    http.fetch("createAppointment", {
        method: "post",
        body: {
            type: mentorType.value
        }
    })
        .then(res => {
            useToast().success(res.message);
            isSending.value = false
            getAllAppointments()
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
        .finally(() => {
            btnLoading.value = false
        })
}

function setAppointmentMentor() {
    btnLoading.value = true
    http.fetch("createAppointment", {
        method: "post",
        body: {
            type: mentorType.value,
            residents: resident.value,
            date: formattedStartDate.value,
            time: time.value,
            status: 1,
            feedback: feedback.value
        }
    })
        .then(res => {
            useToast().success(res.message);
            isSending.value = false
            getAllAppointments()
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
        .finally(() => {
            btnLoading.value = false
        })
}

function approveAppointment(status = 1) {
    btnLoading.value = true
    console.log(itemToEdit.value);
    
    let temp = {
        date: "",
        time: "",
        citizen_id: itemToEdit.value.citizen_id,
        id: itemToEdit.value.id,
        status
    }
    if (status === 1) {
        temp.date = formattedStartDate.value
        temp.time = time.value
        temp.citizen_id = resident.value ? resident.value : itemToEdit.value.citizen_id
    } 
    http.fetch("updateAppointment", {
        method: "post",
        body: {
            ...temp
        }
    })
        .then(res => {
            useToast().success(res.message);
            showForm.value = false
            getAllAppointments()
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
        .finally(() => {
            btnLoading.value = false
        })
}
// get all residents
const getResidents = () => {
    http.fetch("getResidents", {
        method: "get",
    })
        .then(res => {
            residents.value = res
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
}
// get all appointment types
const getAppointmentTypes = () => {
    http.fetch("getMentorshipTypes", {
        method: "get",
    })
        .then(res => {
            appointmentTypes.value = res
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
}
//delete appointment
const deleteAppointment = (id: number) => {
    http.fetch("deleteAppointment", {
        method: "post",
        body: {
            id
        }
    })
        .then(res => {
            dialog.value = false
            useToast().success(res.message);
            getAllAppointments()
        })
        .catch(err => {
            useToast().error(err.data.message);
        })
}


onMounted(() => {
    getAllAppointments()
    getAppointmentTypes()
    getResidents()
})
const download = computed(() => {
    return config.public.apiUrl + "getAppointments/1/" + token
})

</script>
<template>
    <v-row>
        <v-dialog v-model="dialog" width="auto">
            <v-card max-width="400" prepend-icon="mdi-alert-outline"
                text="Are you sure you want to delete this appointment?" title="Delete Appointment">
                <template v-slot:actions>
                    <div class="flex gap-2">
                        <v-btn class="ms-auto" text="Cancel" @click="dialog = false"></v-btn>
                        <v-btn class="ms-auto" @click="deleteAppointment(itemToEdit.id)">Continue</v-btn>
                    </div>
                </template>
            </v-card>
        </v-dialog>
        <v-col>
            <UiParentCard parent-title="Dashboard" title="Appointment List">
                <v-row class="mb-4">
                    <v-col cols="12" md="6">
                        <v-text-field v-model="search" variant="outlined" density="compact" label="Search..."
                            prepend-inner-icon="mdi-magnify" single-line hide-details>
                        </v-text-field>
                    </v-col>
                    <v-col class="flex" cols="12" md="3">
                        <form :action="download" method="post" target="_blank">
                            <input type="hidden" v-model="formattedStartDate">
                            <v-btn prepend-icon="mdi-microsoft-excel" color="success" class="mx-2" type="submit">
                                Export
                            </v-btn>
                        </form>
                    </v-col>
                    <v-col v-if="!showForm && (user?.type == '4' || user?.type == '3')" class="flex" cols="12" md="3">
                        <v-btn @click="user?.type == '4' ? isSending = true : showForm = true" prepend-icon="mdi-plus"
                            color="primary" class="mx-2" variant="tonal">
                            Request Appointment
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
                            <v-icon color="green-darken-3" v-if="user?.type === '3'" size="30"
                                @click="itemToEdit = item; showForm = true" icon="mdi-eye-outline"></v-icon>
                            <v-icon color="red-darken-3" v-else-if="user?.type === '4'"
                                @click="itemToEdit = item; dialog = true" icon="mdi-delete-forever"
                                size="large"></v-icon>
                            <div>-</div>
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
        <v-col cols="12" md="4" v-if="showForm && user?.type === '3'">
            <UiParentCard parent-title="Dashboard" title="Appointment Details" class="relative">
                <div class="absolute top-4 right-4">
                    <v-icon color="red-darken-2" icon="mdi-close" size="large" @click="showForm = false"></v-icon>
                </div>
                <div class="bg-white md:overflow-hidden">
                    <div class="px-4">
                        <div class="md:text-left">
                            <div v-if="itemToEdit">
                                <p v-if="itemToEdit?.status === '0'" class="text-left text-sm text-gray-600 md:mb-5">
                                    This is appointment request from <strong>{{ itemToEdit?.citizen }}</strong>. Please
                                    select date
                                    and time
                                    for the appointment to approve it. If it is exprired or not available, please close
                                    it.
                                </p>
                                <p v-else-if="itemToEdit?.status === '1'"
                                    class="text-left text-sm text-gray-600 md:mb-5">
                                    This is appointment request from <strong>{{ itemToEdit?.citizen }}</strong>. You are
                                    now
                                    allowed
                                    to close it.
                                </p>
                                <p v-else class="text-left text-sm text-gray-600 md:mb-5">
                                    This is appointment request from <strong>{{ itemToEdit?.citizen }}</strong>
                                </p>
                            </div>
                            <div v-else>
                                <p class="text-left text-sm text-gray-600 md:mb-5">
                                    You are about to create a new appointment. Please select resident, date and time for
                                    the
                                    appointment.
                                </p>
                            </div>
                            <div v-if="!itemToEdit || itemToEdit?.status === '0'">
                                <form class="mx-auto mb-3">
                                    <!-- autocomplete to select resident -->
                                    <div v-if="!itemToEdit">
                                        <label for="resident">Resident</label>
                                        <v-autocomplete :items="residents" class="mt-2" v-model="resident"
                                            density="compact" variant="outlined" item-title="names" item-value="id"
                                            label="Select resident"></v-autocomplete>
                                    </div>
                                    <label for="time" class="block mb-2 text-sm font-medium text-gray-900">Select
                                        time:</label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path fill-rule="evenodd"
                                                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="time" v-model="time"
                                            class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700"
                                            min="09:00" max="18:00" value="00:00" required />
                                    </div>
                                    <div class="flex flex-col my-4 group">
                                        <label for="details" class="text-gray-700 text-sm">Feedback</label>
                                        <textarea id="details" v-model="feedback" rows="4"
                                            class="mt-1 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-warning-500 rounded text-sm text-gray-900"
                                            placeholder="Enter Feedback (Optional)"></textarea>
                                    </div>
                                </form>
                                <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn color="secondary" block v-bind="props">
                                            {{ `Date: ${formattedStartDate}` }}
                                        </v-btn>
                                    </template>
                                    <v-card min-width="300">
                                        <v-date-picker v-model="startDate" hide-header
                                            :min="new Date().toISOString().substr(0, 10)"
                                            show-adjacent-months></v-date-picker>
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
                                <v-menu v-if="itemToEdit?.status === '0' || itemToEdit?.status === '1'">
                                    <template v-slot:activator="{ props }">
                                        <v-btn :loading="btnLoading" elevation="10" v-bind="props" variant="outlined"
                                            color="success" class="mx-1" prepend-icon="mdi-delete">
                                            Change Issue status
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item @click="approveAppointment(1)" v-if="itemToEdit.status !== 0">
                                            <v-list-item-title>Approve</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="approveAppointment(2)">
                                            <v-list-item-title>Mark completed</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="approveAppointment(3)">
                                            <v-list-item-title>Appointment Missed</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item @click="approveAppointment(4)">
                                            <v-list-item-title>Cancel Appointment</v-list-item-title>
                                        </v-list-item>

                                    </v-list>
                                </v-menu>
                                <v-btn v-if="!itemToEdit" :loading="btnLoading" elevation="10" variant="outlined"
                                    color="success" class="mx-1" prepend-icon="mdi-delete"
                                    @click="setAppointmentMentor()">
                                    Create Appointment
                                </v-btn>
                            </v-card-actions>
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
                    <div>
                        <label for="mentorType" class="text-gray-700 text-sm">Mentorship Type</label>
                        <v-select density="compact" variant="outlined" v-model="mentorType" :items="appointmentTypes"
                            item-title="title" item-value="id" label="Select mentor type" single-line></v-select>
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
