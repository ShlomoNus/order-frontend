import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store.tsx";
import SecondPage from "./pages/secondPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SecondPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
