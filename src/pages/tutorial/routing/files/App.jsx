import { Router, Route } from "kaioken/router"
import { Navigation } from "./Navigation"
import { HomePage } from "./HomePage"
import { AboutPage } from "./AboutPage"
import { UsersPage } from "./UsersPage"
import { UserDetailPage } from "./UserDetailPage"
import { DashboardPage } from "./DashboardPage"

export function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navigation />
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Router>
      
      <style>{`
        .nav-link {
          text-decoration: none;
          color: #007bff;
          font-weight: 500;
        }
        .nav-link:hover {
          text-decoration: underline;
        }
        .nav-button {
          background: #007bff;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          display: inline-block;
        }
        .nav-button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  )
} 