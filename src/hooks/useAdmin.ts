import { useUser } from '@clerk/nextjs';
import { isAdminEmail } from '@/lib/admin';

export const useAdmin = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  
  // Debug output to console to easily find the exact logged-in Google email address
  if (isLoaded && isSignedIn) {
    console.log("Clerk Current User Email:", email);
  }

  const isAdmin = !!isSignedIn && isAdminEmail(email);
  return { isAdmin, isLoaded, user, isSignedIn: !!isSignedIn, email };
};
