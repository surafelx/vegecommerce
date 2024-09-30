import type { FC } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ProfileLockPage from "./pages/authentication/profile-lock";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import EcommerceBillingPage from "./pages/e-commerce/billing";
import EcommerceInvoicePage from "./pages/e-commerce/invoice";
import EcommerceProductsPage from "./pages/e-commerce/products";
import KanbanPage from "./pages/kanban";
import MailingComposePage from "./pages/mailing/compose";
import MailingInboxPage from "./pages/mailing/inbox";
import MailingReadPage from "./pages/mailing/read";
import MailingReplyPage from "./pages/mailing/reply";
import NotFoundPage from "./pages/pages/404";
import ServerErrorPage from "./pages/pages/500";
import MaintenancePage from "./pages/pages/maintenance";
import PricingPage from "./pages/pages/pricing";
import UserFeedPage from "./pages/users/feed";
import UserListPage from "./pages/users/list";
import MachineListPage from "./pages/machines/list";
import MachineProfilePage from "./pages/machines/profile";
import ProductsListPage from "./pages/products/list";
import OrdersListPage from "./pages/orders/list";
import CategoriesListPage from "./pages/categories/list";
import AccountsListPage from "./pages/accounts/list";
import UserProfilePage from "./pages/users/profile";
import UserSettingsPage from "./pages/users/settings";
import FlowbiteWrapper from "./components/flowbite-wrapper";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App: FC = function () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FlowbiteWrapper />}>


            <Route path="/authentication/sign-in" element={<SignInPage />} />
            <Route path="/authentication/sign-up" element={<SignUpPage />} />
            <Route
              path="/authentication/forgot-password"
              element={<ForgotPasswordPage />}
            />
            <Route
              path="/authentication/reset-password"
              element={<ResetPasswordPage />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} index />
              <Route path="/products/list" element={<ProductsListPage />} />
              <Route path="/categories/list" element={<CategoriesListPage />} />
              <Route path="/accounts/list" element={<AccountsListPage />} />
              <Route path="/orders/list" element={<OrdersListPage />} />
            </Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
