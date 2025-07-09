import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

export const isNativeMobile = () => {
  return Capacitor.isNativePlatform();
};

export const openURL = async (url) => {
  if (isNativeMobile()) {
    await Browser.open({ url });
  } else {
    window.open(url, '_blank');
  }
};