<script setup lang="ts">
import { ArrowNarrowRightIcon } from 'vue-tabler-icons';

const props = defineProps({
    parentTitle: String,
    title: String
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
    <div class="px-2">

        <v-card elevation="10" class="withbg">
            <v-card-title>
                <div class="d-flex align-center">

                    <h5 class="text-h5 mb-3 text-primary pt-2">{{ title }}</h5>
                </div>

            </v-card-title>
            <v-card-item class="pa-2">
                <div class="d-sm-flex align-center justify-space-between">

                    <!-- <template v-slot:append> -->
                    <slot name="action"></slot>
                    <!-- </template> -->
                </div>

                <slot />
            </v-card-item>

        </v-card>
    </div>
</template>
