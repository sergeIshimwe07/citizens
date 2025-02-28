<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';

const user: any = JSON.parse(localStorage.getItem("logger") || '{}');
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="true" class="mr-10">
        <template v-slot:activator="{ props }">
            <div class="flex items-center gap-x-4 ml-2 bg-gray-100 px-4 shadow-md py-1 rounded custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="/images/users/avatar-1.jpg" height="35" alt="user" />
                </v-avatar>
                <div>
                    <span class="text-body-1 font-weight-bold">{{ user?.name }}</span>
                    <div class="text-caption">
                        <template v-if="user?.type == '4'">Village Resident</template>
                        <template v-else-if="user?.type == '3'">Village Mentor</template>
                        <template v-else-if="user?.type == '2'">Village Leader</template>
                        <template v-else-if="user?.type == '1'">System Admin</template>
                    </div>
                </div>
            </div>
        </template>
        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
                <NuxtLink  to="/profile">
                    <v-list-item value="item1" active-color="primary" >
                        <template v-slot:prepend>
                            <UserIcon stroke-width="1.5" size="20"/>
                        </template>
                        <v-list-item-title class="pl-4 text-body-1">My Profile</v-list-item-title>
                    </v-list-item>
                </NuxtLink>
                <!-- <v-list-item value="item2" active-color="primary">
                    <template v-slot:prepend>
                        <MailIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title  class="pl-4 text-body-1">My Account</v-list-item-title>
                </v-list-item>
                <v-list-item value="item3" active-color="primary"> 
                    <template v-slot:prepend>
                        <ListCheckIcon stroke-width="1.5"  size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">My Task</v-list-item-title>
                </v-list-item> -->
            </v-list>
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn to="/" color="error" variant="outlined" block>Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
