import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});
// publicRoutes: [
//   "/",
//   "/api/webhooks(.*)",
//   "/api/uploadthing",
//   "/search",
//   "/:username",
// ],
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
