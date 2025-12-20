import { Capacitor } from '@capacitor/core';

export type AppPlatform = 'web' | 'android' | 'ios';

export interface AppRuntimeConfig {
  apiBaseUrl: string;
}

const CONFIG: Record<AppPlatform, AppRuntimeConfig> = {
  web: {
    apiBaseUrl: 'http://localhost:3000',
  },
  android: {
    // Android Emulator: localhost del PC se accede como 10.0.2.2
    apiBaseUrl: 'http://10.0.2.2:3000',
  },
  ios: {
    apiBaseUrl: 'http://localhost:3000',
  },
};

export function getRuntimeConfig(): AppRuntimeConfig {
  const platform = (Capacitor.getPlatform() as AppPlatform) || 'web';
  return CONFIG[platform] ?? CONFIG.web;
}
