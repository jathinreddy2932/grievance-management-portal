import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useRouter, usePathname } from 'next/navigation';
import { isCapacitorPlatform } from '@/utils/platform';

/**
 * Custom hook to manage the Android hardware back button inside the Capacitor container.
 * - If the user is on the main Dashboard (/), pressing back exits the application.
 * - Otherwise, it navigates back one step in the browser history.
 */
export function useHardwareBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only register the hardware listener if executing inside the Android Capacitor container
    if (!isCapacitorPlatform()) return;

    let activeListener: any = null;

    const registerBackButton = async () => {
      try {
        activeListener = await App.addListener('backButton', () => {
          if (pathname === '/' || pathname === '' || pathname === '/dashboard') {
            // Gracefully close native app at root dashboard
            App.exitApp();
          } else {
            // Standard back navigation
            router.back();
          }
        });
      } catch (err) {
        console.error('Failed to attach Capacitor backButton listener:', err);
      }
    };

    registerBackButton();

    return () => {
      if (activeListener) {
        activeListener.remove();
      }
    };
  }, [pathname, router]);
}
export default useHardwareBackButton;
