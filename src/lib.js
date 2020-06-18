import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import IotaDonationButton from './components/IotaDonationButton';

const CustomElement = wrap(Vue, IotaDonationButton);

window.customElements.define('iota-donation-button', CustomElement);