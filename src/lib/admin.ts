const ADMIN_EMAIL =
  "jathinreddy2020@gmail.com"
    .toLowerCase()
    .trim();

export const isAdminEmail = (
  email?: string | null
) => {
  if (!email) return false;

  return (
    email.toLowerCase().trim() ===
    ADMIN_EMAIL
  );
};
