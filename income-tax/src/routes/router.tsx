
import { createBrowserRouter } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Pages
import HomePage from "../pages/Home/home";
import AboutPage from "../pages/About/about";
import ActsLawsPage from "../pages/ActsLaws/acts-laws";
import TaxCalculatorPage from "../pages/TaxCalculator/TaxCalculatorPage";
import AdvanceTaxCalculator from "../pages/TaxCalculator/AdvanceTaxCalculator";
import HRA_Calculator from "../pages/TaxCalculator/HRA_Calculator";

// Centralized route paths
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  ACTS_LAWS: "/acts-laws",
  TAX_CALCULATOR: "/tax-calculator",
  ADVANCE_TAX_CALCULATOR: "/tax-calculator/AdvanceTaxCalculator",
  HRA_CALCULATOR: "/HRA_Calculator",
  HRA_CALCULATOR_NESTED: "/tax-calculator/HRA_Calculator",
} as const;

// Application Router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "acts-laws",
        element: <ActsLawsPage />,
      },
      {
        path: "tax-calculator",
        element: <TaxCalculatorPage />,
      },
      {
        path: "tax-calculator/AdvanceTaxCalculator",
        element: <AdvanceTaxCalculator />,
      },
      {
        path: "tax-calculator/HRA_Calculator",
        element: <HRA_Calculator />,
      },
      {
        path: "HRA_Calculator",
        element: <HRA_Calculator />,
      },
    ],
  },
]);
