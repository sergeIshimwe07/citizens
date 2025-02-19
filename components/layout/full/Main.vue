<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems, { menu } from '@/components/layout/full/vertical-sidebar/sidebarItem';
import {
  HelpIcon,
  BuildingStoreIcon,
  ShoppingCartIcon,
  TruckDeliveryIcon,
  PackageIcon,
  Map2Icon,
  SteeringWheelIcon,
  LayoutDashboardIcon,
  LogoutIcon,
  MoodHappyIcon,
  UserPlusIcon,
} from "vue-tabler-icons";
const sidebarMenu = ref([
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/dashboard",
  },
]);
const sidebarMenuAdmin = shallowRef(sidebarItems);
const sDrawer = ref(true);
let selectedMenu = ref('Dashboard')
let selectedSubMenu = ref('Faculity')
const openSubmenu = ref(false)

if (process.client) {
    let activeTab = localStorage.getItem("sidebar-active");
    let activeSubTab = localStorage.getItem("sidebar-sub-active");
    selectedMenu.value = activeTab;
    selectedSubMenu.value = activeSubTab;
    console.log(selectedMenu)
}

function activeLink(item: menu) {
    selectedMenu.value = item.title
    openSubmenu.value = item.expanded ? !openSubmenu.value : openSubmenu.value

    localStorage.setItem("sidebar-active", item.title);
}

function activeSubLink(title: any) {
    selectedSubMenu.value = title
    localStorage.setItem("sidebar-sub-active", title);
}
onMounted(() => {
    let user = JSON.parse(localStorage.getItem("logger") || '{}');
    console.log(user)
    if (user.type == '3') {
        sidebarMenu.value.push(...[{ title: "Issues", icon: HelpIcon, to: "/issues" },{ title: "Appointments", icon: MoodHappyIcon, to: "/appointments" }])
    }
})
</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0" app class="leftSidebar bg-gray-300" v-model="sDrawer">
        <!---Logo part -->
        <div class="pa-5">
            <LayoutFullLogo />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div>
                <ul v-auto-animate class="pt-2 m-1">
                    <li v-for="(item, i) in sidebarMenu" :key="i" @click="activeLink(item)"
                        v-bind:class="item.title == selectedMenu && !item.expanded ? 'bg-gray-500 hover:bg-gray-500  ' : 'hover:bg-gray-500'"
                        class="flex-col items-center text-white text-sm cursor-pointer py-3  
                 rounded-md mt-2  px-3 duration-300 ">

                        <nuxt-link :to="!item.header && item.children == null ? `${item.to}` : '#'"
                            :class="sDrawer ? ' ' : 'justify-center'" class="flex items-center  gap-x-4 ">
                            <component :is="item.icon" class="h-6 w-6 duration-200 block float-left cursor-pointer"
                                :class="item.title == selectedMenu ? 'text-white' : ''" />
                            <div class="flex-1 truncate duration-300 " :class="!sDrawer ? hidden : ``"
                                v-bind:class="item.title == selectedMenu ? 'text- font-medium' : 'font-medium'">{{
                                    item.title
                                }}
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
                <div class="pa-4">
                    <!-- <LayoutFullVerticalSidebarExtraBox/> -->
                </div>
        </div>

    </v-navigation-drawer>
    <!------Header-------->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted" @click="sDrawer = !sDrawer" icon
                    variant="flat" size="small">
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->

            </div>
            <div>
                <!-- Upgrade button -->
                <LayoutFullVerticalHeaderNotificationDD class="mx-3" />
                <!-- User Profile -->
                <LayoutFullVerticalHeaderProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
