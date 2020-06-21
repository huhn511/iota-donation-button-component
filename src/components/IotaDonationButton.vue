<template>
   <span id="iota-donation-button">
    <DonateButton @donate="donate"  v-if="!qrCodeData" />
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
import DonateButton from "./DonateButton";

export default {
    name: "IotaDonationButton",
  directives: { clipboard },
  components: { DonateButton },
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
</style>