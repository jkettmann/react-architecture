import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/components/layout";
import { Feed } from "@/pages/feed";
import { UserProfile } from "@/pages/user-profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "/user/:handle",
        element: <UserProfile />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
