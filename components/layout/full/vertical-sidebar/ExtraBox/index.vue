<script setup lang="ts">
</script>
<template>
    <v-sheet rounded="md" class="ExtraBox hide-menu mx-3 px-3 pb-3 pt-2">
        <div class="d-flex align-center">
            <div class="pr-1">
                <h6 class="text-sm text-2 mb-2 font-bold">Premium Plan</h6>
                <h6 class="text-[10px] text-2  text-muted">You can Upgrade you plan to premium features and resources</h6>
                <div class="d-flex flex-row mt-2 justify-space-between align-center">
                    <h6 class="text-xs text-muted"> Price: </h6>
                    <div class=" d-flex text-xs text-muted flex">
                        <h6 class="text-xs text-white">$18.49</h6>
                        <h6 class="text-xs text-muted">/Month</h6>
                    </div>
                </div>
                <div class="d-flex flex-row mt-2 justify-space-between align-center">
                    <h6 class="text-xs text-muted"> Expired: </h6>
                    <div class=" d-flex text-xs text-muted flex">
                        <h6 class="text-xs text-white">Nov 15, 2023</h6>
                     </div>
                </div>
                <v-divider class="my-3 bg-muted"></v-divider>
                <v-btn block variant="tonal" to="/" size="small" color="mute" flat>Change plan</v-btn>
            </div>
             
        </div>
    </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
    position: relative;
     background:rgba(166, 203, 221, 0.171) !important;
  color:  rgb(var(--v-theme-white))  !important;
}
.line-height-none {
    line-height: normal;
}
</style>
