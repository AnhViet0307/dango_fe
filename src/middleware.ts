import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";



const isAdminRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

const isStaffRoute = createRouteMatcher([
    '/processing(.*)',
])


export default clerkMiddleware((auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (isAdminRoute(req)) {
    auth().protect(has => {
      return (
        has({ permission: 'org:admin' }) 
       
      )
    })
  }
 
    if (isStaffRoute(req)) {
        auth().protect(has => {
            return (
                has({ permission: 'org:admin' }) ||
                has({ permission: 'org:staff' })
            )
        })
    }
});

export const config = {
    matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};