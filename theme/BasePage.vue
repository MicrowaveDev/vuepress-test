<template>
  <div id="base-page"><Content /></div>
</template>

<script>
import {usePageData} from "@vuepress/client";
const page = usePageData();

export default {
  components: {},
  computed: {
    page() {
      return page;
    },
  },
  mounted() {

  },
}
</script>

<style lang="scss" src="./styles.scss"></style>