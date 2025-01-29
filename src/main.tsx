import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store.tsx";
import FirstPage from "./pages/firstPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
