import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

import DashboardLayout from "../components/layouts/DashboardLayout";
import SummaryCard from "../components/Cards/SummaryCard";
import Modal from "../components/Modal";
import CreateSessionForm from "./Home/CreateSessionForm";
import DeleteAlertContent from "../components/DeleteAlertContent";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";
import SpinnerLoader from "../components/loader/SpinnerLoader";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      // --- THIS IS THE CORRECTED LINE ---
      setSessions(response.data || []);
    } catch (error) {
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions(); // Refresh list after delete
    } catch (error) {
      toast.error("Failed to delete session");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, [location.key]);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 md:p-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Sessions</h1>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <LuPlus size={18} />
            Create Session
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center mt-16"><SpinnerLoader /></div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700">You have no sessions yet.</h3>
            <p className="text-gray-500 mt-2">Get started by creating your first interview prep session!</p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="mt-6 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <SummaryCard
                key={session._id}
                session={session}
                onSelect={() => navigate(`/interview-prep/${session._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data: session })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals remain the same */}
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateSessionForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions();
          }}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this session? This cannot be undone."
          onDelete={() => deleteSession(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;