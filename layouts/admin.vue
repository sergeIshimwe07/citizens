<script setup lang="ts">
import { RouterView } from 'vue-router';
const title = ref("VIMMS");
useHead({
    meta: [{ content: title }],
    titleTemplate: () => {
        return "VIMMS";
    },
});
</script>

<template>
    <v-locale-provider>
        <v-app>
            <LayoutFullMain />
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
                <v-col class="text-center mt-2">
                    <p class="text-muted">2025 <a flat variant="text" href="#"
                            target="_blank" class="pl-1 text-success"></a></p>
                </v-col>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
