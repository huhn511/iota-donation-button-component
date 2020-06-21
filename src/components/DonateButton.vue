<template>
  <button class="btn btn-animated" @click="donate">
    <img class="icon" src="@/assets/iota.svg" />
  </button>
</template>

<script>
export default {
    methods: {
        donate() {
            this.$emit('donate');
        }
    }
};
</script>

<style scoped>

.icon {
  width: 42px;
  height: 42px;
}

.btn {
  background-color: #0fc1b7;
  border: none;
  border-radius: 100%;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
}

.btn:link,
.btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    position: absolute;
}

.btn:hover {
    cursor: pointer;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
}

.btn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

.btn-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}

@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>