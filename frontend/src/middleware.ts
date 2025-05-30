export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/browse-jobs",
    "/my-applications/:path*",
    "/saved-jobs",
    "/settings",
    "/profile",
    "/hr/:path*",
  ],
};
