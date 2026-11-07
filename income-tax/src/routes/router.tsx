
import { createBrowserRouter } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Pages
import HomePage from "../pages/Home/home";
import AboutPage from "../pages/About/about";
import ActsLawsPage from "../pages/ActsLaws/acts-laws";
import TaxCalculatorPage from "../pages/TaxCalculator/TaxCalculatorPage";
import AdvanceTaxCalculator from "../pages/TaxCalculator/AdvanceTaxCalculator";

// Centralized route paths
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  ACTS_LAWS: "/acts-laws",
  TAX_CALCULATOR: "/tax-calculator",
  ADVANCE_TAX_CALCULATOR: "/tax-calculator/AdvanceTaxCalculator",
} as const;

// Application Router
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT.slice(1),
        element: <AboutPage />,
      },
      {
        path: ROUTES.ACTS_LAWS.slice(1),
        element: <ActsLawsPage />,
      },
      {
        path: ROUTES.TAX_CALCULATOR.slice(1),
        element: <TaxCalculatorPage />,
      },
      {
        path: ROUTES.ADVANCE_TAX_CALCULATOR.slice(1),
        element: <AdvanceTaxCalculator />,
      },
    ],
  },
]);
