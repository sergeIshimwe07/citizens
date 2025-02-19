<script setup>
import Icon from '../Icon.vue';
const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <ul v-auto-animate class="pt-2 m-1">
    <li v-for="(item, i) in sidebarMenu" :key="i" @click="activeLink(item.title)"
      v-bind:class="item.title == selectedMenu && !item.expanded ? 'bg-green-400/10 hover:bg-green-400/20  ' : 'hover:bg-gray-400/20'"
      class="flex-col items-center text-sm cursor-pointer py-3  
                 rounded-md mt-2  px-3 duration-300 ">

      <nuxt-link :to="!item.isHeader && item.children == null ? `${item.to}` : '#'"
        :class="sDrawer ? ' ' : 'justify-center'" class="flex items-center  gap-x-4 ">
        <UIcon :name="item.icon"
          class="h-6 w-6 text-gray-700 dark:text-gray-300 duration-200 block float-left cursor-pointer"
          :class="item.title == selectedMenu ? 'text-green-600' : ''" />
        <div class="flex-1 truncate duration-300 " :class="!sDrawer ? hidden : ``"
          v-bind:class="item.title == selectedMenu ? 'text-green-500 font-medium' : 'font-medium'">{{ item.title
          }}
        </div>
        <div class="flex" :class="!sDrawer ? hidden : ``">
          <UIcon name="i-heroicons-chevron-right-solid" @click="openSubmenu = !openSubmenu" v-if="item.expanded"
            class="duration-400 h-5 w-5" v-bind:class="item.title == selectedMenu ? 'text-green-600' : ''"
            :class="openSubmenu ? 'rotate-90' : ''" />
          <div v-if="item.title == selectedMenu && sDrawer && !item.expanded"
            class="flex bg-green-500 duration-300  h-5 rounded-xl w-1"></div>
        </div>

      </nuxt-link>

      <ul v-if="item.expanded && openSubmenu && sDrawer" class="dropdown">
        <li v-for="(sub, i) in item.children" :key="i" class="flex group justify-between duration-300    items-center text-sm gap-x-4 cursor-pointer py-3  
                 hover:bg-gray-400/10 rounded-md mt-3"> <span class="pl-4 duration-200">&#x2022; {{ sub.title }}</span>
          <div class="group-hover:bg-green-500 p-1 rounded-full duration-300 mx-4 "></div>
        </li>

      </ul>
    </li>
    </ul>
</template>
<style scoped>
.scrollnavbar .v-list>.v-list-item.v-list-item--active,
.scrollnavbar .v-list .v-list-item--active>.v-list-item__overlay {
  background: rgba(166, 203, 221, 0.171) !important;
  color: rgb(var(--v-theme-white)) !important;
  font-weight: 800 !important;
}

.scrollnavbar .v-list-group__items .v-list-item,
.scrollnavbar .v-list-item {

  color: rgb(224, 231, 231);
}
</style>
