<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { Header } from "vue3-easy-data-table"

definePageMeta({
    layout: "admin",
});
const http = useHttpRequest()
const config = useRuntimeConfig()
const token = localStorage.getItem("token")
const search = ref("");
const lists = ref([]);
const mentorTypes = ref([]);
const itemToEdit = ref(null)
const showUserForm = ref(false)
const loading = ref(false)
const headers: Header[] = [
    { text: "Full names", value: "names", sortable: true },
    { text: "Phone", value: "phone", sortable: true },
    { text: "E-mail", value: "email", sortable: true },
    { text: "Issues", value: "issues", sortable: true },
    { text: "Appointments", value: "appointments", sortable: true },
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

const statusStr = (status: string) => {
    if (status == "1") {
        return "Active";
    } else if (status == "2") {
        return "Disabled";
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
    http.fetch("getActiveResidents", {
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
//change user status
function changeUserStatus(item: any, status: string) {
    loading.value = true
    http.fetch("changeUserStatus", {
        method: "post",
        body: {
            id: item.id,
            status: status
        }
    })  
        .then(res => {
            useToast().success(res.message);
            getAllUsers()
        })
        .catch(err => {
            loading.value = false
            useToast().error(err.data.message);
        })
}
onMounted(() => {
    getAllUsers()
    getMentorshipTypes()
})
const download = computed(() => {
    return config.public.apiUrl + "getActiveResidents/1/" + token
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
                        <form :action="download" method="post" target="_blank">
                            <input type="hidden" v-model="formattedStartDate">
                            <v-btn prepend-icon="mdi-microsoft-excel" color="success" class="mx-2" type="submit">
                                Export
                            </v-btn>
                        </form>
                    </v-col>
                    <!-- <v-col class="flex" cols="12" md="3">
                        <v-btn @click="showUserForm = true" prepend-icon="mdi-plus" color="primary" class="mx-2"
                            variant="tonal">
                            New User
                        </v-btn>
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
                        <template #item-issues="item">
                            <p>{{ item.resolved_issues + '/' + item.total_issues }}</p>
                        </template>
                        <template #item-appointments="item">
                            <p>{{ item.resolved_issues + '/' + item.total_issues }}</p>
                        </template>
                        <template #item-action="item">
                            <v-btn v-if="item.status !== '1'" color="success" @click="changeUserStatus(item, '1')">
                                Enable User
                            </v-btn>
                            <v-btn v-if="item.status === '1'" color="error" @click="changeUserStatus(item, '2')">
                                Disable User
                            </v-btn>
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
    </v-row>
</template>
