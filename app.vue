<template>
  <div>
    <NuxtLoadingIndicator/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script>
export default defineComponent({
  setup() {
    const route = useRoute();
    const title = route.meta.title === undefined ? '' : `- ${route.meta.title}`
    useHead({
      title: `Ecommerce ${title}`
    });
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },
});
</script>