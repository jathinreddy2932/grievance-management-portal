/**
 * Utility to identify whether the app is executing inside a native Capacitor shell
 * (e.g. Android APK) or standard web browser environment.
 */
export const isCapacitorPlatform = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Capacitor injects a global Capacitor object into the webview window
  const win = window as any;
  return !!(win.Capacitor && win.Capacitor.isNativePlatform && win.Capacitor.isNativePlatform());
};
