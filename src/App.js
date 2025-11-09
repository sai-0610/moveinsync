import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import FloorPlanPage from "./pages/FloorPlanPage";
import RoomBookingPage from "./pages/RoomBookingPage";

// Hooks
import useOfflineSync from "./hooks/useOfflineSync";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // enable offline-sync globally
  useOfflineSync();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/floor-plan"
          element={
            <ProtectedRoute>
              <FloorPlanPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-room"
          element={
            <ProtectedRoute>
              <RoomBookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
