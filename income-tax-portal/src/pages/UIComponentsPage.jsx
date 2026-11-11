
import React, { useState } from "react";

import {
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import "./UIComponentsPage.scss";

/* =====================================================
   LOCAL ICONS
   No @mui/icons-material dependency required
===================================================== */

function LocalIcon({ symbol, color = "inherit", size = 22 }) {
  const colors = {
    primary: "#1976d2",
    secondary: "#9c27b0",
    success: "#2e7d32",
    error: "#d32f2f",
    warning: "#ed6c02",
    info: "#0288d1",
    inherit: "currentColor",
  };

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors[color] || color,
        fontSize: size,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {symbol}
    </span>
  );
}

const ExpandMoreIcon = () => <LocalIcon symbol="⌄" size={24} />;

const SearchIcon = () => <LocalIcon symbol="⌕" size={23} />;

const CheckCircleOutlineIcon = ({ color }) => (
  <LocalIcon symbol="✓" color={color} size={25} />
);

const ErrorOutlineIcon = ({ color }) => (
  <LocalIcon symbol="ⓧ" color={color} size={25} />
);

const InfoOutlinedIcon = ({ color }) => (
  <LocalIcon symbol="ⓘ" color={color} size={25} />
);

const AccountBalanceOutlinedIcon = () => (
  <LocalIcon symbol="▥" size={27} />
);

const RefreshIcon = () => <LocalIcon symbol="↻" size={21} />;

/* =====================================================
   DATA
===================================================== */

const themeOptions = [
  { label: "Individual", value: "individual" },
  { label: "HUF", value: "huf" },
  { label: "Partnership Firm", value: "firm" },
  { label: "LLP", value: "llp" },
  { label: "Domestic Company", value: "company" },
];

const componentLinks = [
  { id: "buttons", label: "Buttons", number: "01" },
  { id: "select", label: "Select & Dropdown", number: "02" },
  { id: "date-picker", label: "Date Picker", number: "03" },
  { id: "text-fields", label: "Text Fields", number: "04" },
  { id: "validation", label: "Form Validation", number: "05" },
  { id: "loaders", label: "Loading States", number: "06" },
  { id: "alerts", label: "Alerts & Toasts", number: "07" },
  { id: "checkbox", label: "Checkbox & Radio", number: "08" },
  { id: "switches", label: "Switches", number: "09" },
  { id: "chips", label: "Chips & Badges", number: "10" },
  { id: "accordion", label: "Accordion", number: "11" },
  { id: "tooltip", label: "Tooltip", number: "12" },
  { id: "pagination", label: "Pagination", number: "13" },
];

/* =====================================================
   REUSABLE SECTION
===================================================== */

function ComponentSection({
  id,
  number,
  title,
  description,
  children,
}) {
  return (
    <Paper
      id={id}
      elevation={0}
      className="component-section"
      sx={{ scrollMarginTop: "100px" }}
    >
      <Box className="component-section-heading">
        <Box className="section-number">{number}</Box>

        <Box>
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2.5, borderColor: "#E3FDFD" }} />

      <Box className="component-preview">
        {children}
      </Box>
    </Paper>
  );
}

/* =====================================================
   MAIN PAGE
===================================================== */

export default function UIComponentsPage() {
  const [activeSection, setActiveSection] = useState("buttons");

  // Select states
  const [taxpayer, setTaxpayer] = useState("individual");
  const [financialYear, setFinancialYear] = useState("2026-27");
  const [country, setCountry] = useState("India");

  // Date picker states
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [dateError, setDateError] = useState("");

  // Text field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Validation
  const [submitted, setSubmitted] = useState(false);

  // Loader states
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [progress, setProgress] = useState(65);

  // Toast
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Checkbox, radio and switches
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("new");
  const [switchValue, setSwitchValue] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const closeToast = (_, reason) => {
    if (reason === "clickaway") return;

    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  /* =====================================================
     FORM VALIDATION
  ===================================================== */

  const fieldError = (field) => {
    if (!submitted) return "";

    if (field === "name" && !name.trim()) {
      return "Full name is required.";
    }

    if (
      field === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return "Enter a valid email address.";
    }

    if (
      field === "mobile" &&
      !/^[6-9]\d{9}$/.test(mobile)
    ) {
      return "Enter a valid 10-digit mobile number.";
    }

    return "";
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const hasErrors =
      !name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^[6-9]\d{9}$/.test(mobile);

    if (hasErrors) {
      showToast("Please correct the form errors.", "error");
      return;
    }

    showToast("Form validated successfully!", "success");
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setSubmitted(false);

    showToast("Form has been reset.", "info");
  };

  /* =====================================================
     LOADING BUTTON
  ===================================================== */

  const handleLoading = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast("Operation completed successfully!");
    }, 2000);
  };

  /* =====================================================
     SKELETON LOADER
  ===================================================== */

  const handleSkeleton = () => {
    if (skeletonLoading) return;

    setSkeletonLoading(true);

    setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000);
  };

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleNavigation = (id) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =====================================================
     PAGE UI
  ===================================================== */

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="ui-playground">

        {/* SIDEBAR */}

        <aside className="ui-sidebar">

          <Box className="ui-sidebar-brand">
            <Box className="brand-icon">
              <AccountBalanceOutlinedIcon />
            </Box>

            <Box>
              <Typography fontWeight={800} fontSize={16}>
                Income Tax Portal
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Component Library
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography className="sidebar-label">
            COMPONENTS
          </Typography>

          <nav className="component-navigation">
            {componentLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`navigation-item ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="navigation-number">
                  {item.number}
                </span>

                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <Box className="sidebar-footer">
            <Chip
              label="Design System v1.0"
              size="small"
              className="version-chip"
            />

            <Typography variant="caption" color="text.secondary">
              Built with Material UI
            </Typography>
          </Box>
        </aside>

        {/* MAIN CONTENT */}

        <main className="ui-main">

          {/* TOPBAR */}

          <header className="ui-topbar">
            <Box>
              <Typography variant="body2" color="text.secondary">
                Dashboard / UI Components
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label="Preview Mode"
                color="success"
                variant="outlined"
                size="small"
              />

              <Avatar sx={{ bgcolor: "#71C9CE", color: "#173D43" }}>
                A
              </Avatar>
            </Stack>
          </header>

          {/* PAGE HEADER */}

          <Box className="ui-page-header">
            <Box>
              <Chip
                label="DESIGN SYSTEM"
                size="small"
                className="header-chip"
              />

              <Typography variant="h4" className="page-title">
                UI Components
              </Typography>

              <Typography color="text.secondary">
                A centralized collection of reusable components
                for your Income Tax Portal.
              </Typography>
            </Box>

            <Box className="header-decoration">
              <AccountBalanceOutlinedIcon />
            </Box>
          </Box>

          {/* 01 - BUTTONS */}

          <ComponentSection
            id="buttons"
            number="01"
            title="Buttons"
            description="Different button variants, sizes, colors and states."
          >
            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Button variant="contained">
                Primary Button
              </Button>

              <Button variant="outlined">
                Outlined Button
              </Button>

              <Button variant="text">
                Text Button
              </Button>

              <Button variant="contained" disabled>
                Disabled
              </Button>

              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleLoading}
                disabled={loading}
              >
                {loading ? "Processing..." : "Loading Button"}
              </Button>
            </Stack>
          </ComponentSection>

          {/* 02 - SELECT */}

          <ComponentSection
            id="select"
            number="02"
            title="Select & Dropdown"
            description="MUI Select fields for financial and tax-related forms."
          >
            <Box className="preview-grid">

              <FormControl fullWidth>
                <InputLabel>Taxpayer Category</InputLabel>

                <Select
                  value={taxpayer}
                  label="Taxpayer Category"
                  onChange={(e) => setTaxpayer(e.target.value)}
                >
                  {themeOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  Select your taxpayer category.
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Assessment Year</InputLabel>

                <Select
                  value={financialYear}
                  label="Assessment Year"
                  onChange={(e) => setFinancialYear(e.target.value)}
                >
                  <MenuItem value="2025-26">2025-26</MenuItem>
                  <MenuItem value="2026-27">2026-27</MenuItem>
                  <MenuItem value="2027-28">2027-28</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>

                <Select
                  value={country}
                  label="Country"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">United States</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                </Select>
              </FormControl>

              <Autocomplete
                options={themeOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search taxpayer category"
                    placeholder="Search..."
                  />
                )}
              />

            </Box>
          </ComponentSection>

          {/* 03 - DATE PICKER */}

          <ComponentSection
            id="date-picker"
            number="03"
            title="Date Picker"
            description="Date selection with calendar, validation and date restrictions."
          >
            <Box className="preview-grid">

              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue, context) => {
                  setSelectedDate(newValue);

                  if (context?.validationError) {
                    setDateError("Please select a valid date.");
                  } else {
                    setDateError("");
                  }
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    helperText: "Select your required date.",
                  },
                }}
              />

              <DatePicker
                label="Date of Birth"
                disableFuture
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />

              <DatePicker
                label="Future Date Only"
                minDate={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />

              <DatePicker
                label="Disabled Date Picker"
                disabled
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />

            </Box>

            {dateError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {dateError}
              </Alert>
            )}

            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected date:{" "}
              <strong>
                {selectedDate?.isValid()
                  ? selectedDate.format("DD MMM YYYY")
                  : "No date selected"}
              </strong>
            </Typography>
          </ComponentSection>

          {/* 04 - TEXT FIELDS */}

          <ComponentSection
            id="text-fields"
            number="04"
            title="Text Fields"
            description="Outlined, filled, standard and input adornment examples."
          >
            <Box className="preview-grid">

              <TextField
                fullWidth
                label="Outlined Field"
                placeholder="Enter text"
              />

              <TextField
                fullWidth
                variant="filled"
                label="Filled Field"
              />

              <TextField
                fullWidth
                variant="standard"
                label="Standard Field"
              />

              <TextField
                fullWidth
                label="Search"
                placeholder="Search here"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Income Amount"
                type="number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        ₹
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Disabled Field"
                disabled
                value="Disabled value"
              />

            </Box>
          </ComponentSection>

          {/* 05 - VALIDATION */}

          <ComponentSection
            id="validation"
            number="05"
            title="Form Validation"
            description="Required fields, email validation and mobile number validation."
          >
            <Box className="validation-form">

              <Typography fontWeight={700} mb={2}>
                Personal Information
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(fieldError("name"))}
                helperText={
                  fieldError("name") || "Enter your full name."
                }
              />

              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(fieldError("email"))}
                helperText={
                  fieldError("email") || "Enter your email address."
                }
              />

              <TextField
                fullWidth
                label="Mobile Number"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                error={Boolean(fieldError("mobile"))}
                helperText={
                  fieldError("mobile") ||
                  "Enter 10-digit mobile number."
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        +91
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                size="large"
              >
                Validate Form
              </Button>

              <Button
                variant="text"
                onClick={resetForm}
              >
                Reset Form
              </Button>

            </Box>
          </ComponentSection>

          {/* 06 - LOADERS */}

          <ComponentSection
            id="loaders"
            number="06"
            title="Loading States"
            description="Skeleton placeholders, circular spinners and linear progress."
          >
            <Typography fontWeight={700} mb={2}>
              Skeleton Loader
            </Typography>

            <Stack direction="row" gap={2} alignItems="center">

              <Avatar>
                {skeletonLoading ? (
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  "A"
                )}
              </Avatar>

              <Box flex={1}>
                {skeletonLoading ? (
                  <>
                    <Skeleton width="45%" height={22} />
                    <Skeleton width="75%" height={18} />
                  </>
                ) : (
                  <>
                    <Typography fontWeight={700}>
                      Income Tax Report
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Report data loaded successfully.
                    </Typography>
                  </>
                )}
              </Box>

            </Stack>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={handleSkeleton}
              disabled={skeletonLoading}
            >
              {skeletonLoading
                ? "Loading..."
                : "Show Skeleton Again"}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={700} mb={2}>
              Circular Progress
            </Typography>

            <Stack direction="row" gap={4} alignItems="center">
              <CircularProgress size={24} />
              <CircularProgress size={35} />
              <CircularProgress size={45} />
              <CircularProgress
                variant="determinate"
                value={75}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={700} mb={2}>
              Linear Progress
            </Typography>

            <LinearProgress />

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 3 }}
            />

            <Box sx={{ mt: 2, maxWidth: 350 }}>
              <Typography variant="body2">
                Progress: {progress}%
              </Typography>

              <Slider
                value={progress}
                min={0}
                max={100}
                onChange={(_, value) => setProgress(value)}
              />
            </Box>
          </ComponentSection>

          {/* 07 - ALERTS */}

          <ComponentSection
            id="alerts"
            number="07"
            title="Alerts & Toast Notifications"
            description="Success, error, warning and informational messages."
          >
            <Stack spacing={2}>

              <Alert severity="success">
                Your calculation has been completed successfully.
              </Alert>

              <Alert severity="error">
                Something went wrong. Please try again.
              </Alert>

              <Alert severity="warning">
                Please verify your financial information.
              </Alert>

              <Alert severity="info">
                Your tax return is ready for review.
              </Alert>

            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" flexWrap="wrap" gap={2}>

              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  showToast("Operation successful!", "success")
                }
              >
                Success Toast
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  showToast("An error occurred!", "error")
                }
              >
                Error Toast
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() =>
                  showToast("Please check your details.", "warning")
                }
              >
                Warning Toast
              </Button>

              <Button
                variant="contained"
                color="info"
                onClick={() =>
                  showToast("Here is some information.", "info")
                }
              >
                Info Toast
              </Button>

            </Stack>
          </ComponentSection>

          {/* 08 - CHECKBOX AND RADIO */}

          <ComponentSection
            id="checkbox"
            number="08"
            title="Checkbox & Radio"
            description="Selection controls for user preferences and tax declarations."
          >
            <Stack spacing={2}>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label="I agree to the terms and conditions."
              />

              <FormControl>
                <Typography fontWeight={700}>
                  Tax Regime
                </Typography>

                <RadioGroup
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                >
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="New Tax Regime"
                  />

                  <FormControlLabel
                    value="old"
                    control={<Radio />}
                    label="Old Tax Regime"
                  />
                </RadioGroup>
              </FormControl>

            </Stack>
          </ComponentSection>

          {/* 09 - SWITCHES */}

          <ComponentSection
            id="switches"
            number="09"
            title="Switches"
            description="Toggle settings and preferences."
          >
            <Stack spacing={1}>

              <FormControlLabel
                control={
                  <Switch
                    checked={switchValue}
                    onChange={(e) =>
                      setSwitchValue(e.target.checked)
                    }
                  />
                }
                label={`Notifications ${
                  switchValue ? "Enabled" : "Disabled"
                }`}
              />

              <FormControlLabel
                control={
                  <Switch defaultChecked color="success" />
                }
                label="Email Notifications"
              />

              <FormControlLabel
                control={
                  <Switch color="warning" />
                }
                label="SMS Notifications"
              />

              <FormControlLabel
                control={<Switch disabled />}
                label="Disabled Option"
              />

            </Stack>
          </ComponentSection>

          {/* 10 - CHIPS */}

          <ComponentSection
            id="chips"
            number="10"
            title="Chips & Badges"
            description="Labels, statuses and notification counters."
          >
            <Stack direction="row" gap={2} flexWrap="wrap">

              <Chip label="Individual" />

              <Chip label="Verified" color="success" />

              <Chip label="Pending" color="warning" />

              <Chip label="Rejected" color="error" />

              <Chip label="Information" color="info" />

              <Chip label="Outlined" variant="outlined" />

              <Badge badgeContent={4} color="error">
                <Chip label="Notifications" />
              </Badge>

            </Stack>
          </ComponentSection>

          {/* 11 - ACCORDION */}

          <ComponentSection
            id="accordion"
            number="11"
            title="Accordion"
            description="Expandable information panels."
          >
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>
                  What is an Assessment Year?
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                The Assessment Year is the year immediately following
                the financial year in which income is assessed for tax.
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>
                  What is a Financial Year?
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                The financial year is the period in which income is earned.
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>
                  What is Form 16?
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                Form 16 is a certificate issued by an employer
                containing salary and TDS information.
              </AccordionDetails>
            </Accordion>
          </ComponentSection>

          {/* 12 - TOOLTIP */}

          <ComponentSection
            id="tooltip"
            number="12"
            title="Tooltip"
            description="Contextual information on hover."
          >
            <Stack direction="row" gap={3} flexWrap="wrap">

              <Tooltip title="Your taxable income after deductions.">
                <Button variant="outlined">
                  Hover for information
                </Button>
              </Tooltip>

              <Tooltip title="This field is required." arrow>
                <span>
                  <InfoOutlinedIcon color="info" />
                </span>
              </Tooltip>

              <Tooltip
                title="Calculation completed!"
                placement="top"
              >
                <span>
                  <CheckCircleOutlineIcon color="success" />
                </span>
              </Tooltip>

              <Tooltip title="Invalid tax information." arrow>
                <span>
                  <ErrorOutlineIcon color="error" />
                </span>
              </Tooltip>

            </Stack>
          </ComponentSection>

          {/* 13 - PAGINATION */}

          <ComponentSection
            id="pagination"
            number="13"
            title="Pagination"
            description="Page navigation for tables and data lists."
          >
            <Stack spacing={3}>

              <Pagination
                count={10}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />

              <Typography variant="body2" color="text.secondary">
                Currently selected page: {page}
              </Typography>

              <Pagination
                count={5}
                variant="outlined"
                shape="rounded"
              />

              <Pagination
                count={5}
                variant="outlined"
                color="secondary"
              />

            </Stack>
          </ComponentSection>

          {/* FOOTER */}

          <footer className="ui-footer">
            <Typography variant="body2" color="text.secondary">
              © 2026 Income Tax Portal. Component Library.
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Designed with Material UI
            </Typography>
          </footer>

        </main>

        {/* TOAST */}

        <Snackbar
          open={toast.open}
          autoHideDuration={3500}
          onClose={closeToast}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={closeToast}
            severity={toast.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>

      </Box>
    </LocalizationProvider>
  );
}
