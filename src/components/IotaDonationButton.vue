<template>
   <span id="iota-donation-button">
    <button class="btn btn-animated" v-if="!qrCodeData" @click="donate">
     <img class="icon" src="@/assets/iota.svg" >
    </button>
    <div v-else >
      <img v-if="qrCodeData" :src="qrCodeData.src" alt="QR CODE" />
      <br />
      <a
        class="btn"
        :href="`iota://${address}/?amount=${1}`"
        >Pay with Trinity</a
      >
      <button v-clipboard="address">Copy address</button>
    </div>
  </span>
</template>

<script>
import * as IotaQR from "@tangle-frost/iota-qr-lib/pkg/iota-qr-lib.js";
import { clipboard } from "vue-clipboards";

export default {
    name: "IotaDonationButton",
  directives: { clipboard },

  props: {
    address: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      qrCodeData: null,
    };
  },
    created() {
        console.log("iota donation button")
    },
    methods: {
      donate() {
        console.log("iota donation button clicked")
        console.log(this.address)
        console.log(this.qrCodeData)
        let self = this
        const paymentData = IotaQR.TrinityPaymentQR.generatePaymentData(
            this.address,
            1,
            "EINFACHIOTA",
            ""
          );
          IotaQR.TrinityPaymentQR.renderHtml(paymentData, "png", 8).then(
            qrCodeData => {
              self.qrCodeData = qrCodeData;
              console.log("qr_code_data", qrCodeData);
              console.log("qr_code_data", qrCodeData.src);
            }
          );
      } 
    }
}
</script>

<style scoped>
#iota-donation-button {
  position: absolute;
  bottom: 10%;
  right: 10%;
}

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