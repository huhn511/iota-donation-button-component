<template>
  <button class="iota-donation-button" @click="click">donate</button>
</template>

<script>
export default {
    created() {
        console.log("iota donation button")
    },
    methods: {
      click() {
        console.log("iota donation button clicked")
      } 
    }
}
</script>

<style scoped>
.iota-donation-button {
  position: absolute;
  bottom: 10%;
  right: 10%;
}
</style>