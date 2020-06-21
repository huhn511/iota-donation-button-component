<template>
  <div id="iota-donation-button">
    <div v-if="donateOptions" class="qr-wrapper">
      <img v-if="qrCodeData" :src="qrCodeData.src" alt="QR CODE" />
      <a @click="showQrCode" class="btn">Show QR Code</a>
      <a class="btn" v-clipboard="address">Copy address</a>
      <a class="btn" :href="`iota://${address}/?amount=${1}`">Open Trinity</a>
    </div>
    <div class="button-wrapper">
      <DonateButton @donate="toggleDonateOptions" />
    </div>
  </div>
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
      donateOptions: false
    };
  },
  methods: {
    toggleDonateOptions() {
      this.donateOptions = !this.donateOptions;
    },
    showQrCode() {
      console.log("iota donation button clicked");
      console.log(this.address);
      console.log(this.qrCodeData);
      let self = this;
      const paymentData = IotaQR.TrinityPaymentQR.generatePaymentData(
        this.address,
        1,
        "EINFACHIOTA",
        ""
      );
      IotaQR.TrinityPaymentQR.renderHtml(paymentData, "png", 7).then(
        qrCodeData => {
          self.qrCodeData = qrCodeData;
          console.log("qr_code_data", qrCodeData);
          console.log("qr_code_data", qrCodeData.src);
        }
      );
    }
  }
};
</script>

<style scoped>
#iota-donation-button {
  position: absolute;
  bottom: 10%;
  right: 10%;
  display: flex;
  flex-direction: column;
}

.qr-wrapper {
  width: 100%;
  min-width: 245px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.btn {
  background-color: #0fc1b7;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 10px;
}
.btn:hover {
  cursor: pointer;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>