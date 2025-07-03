import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation added
import moment from "moment";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

import DashboardLayout from "../components/layouts/DashboardLayout";
import SummaryCard from "../components/Cards/SummaryCard";
import Modal from "../components/Modal";
import CreateSessionForm from "./Home/CreateSessionForm";
import DeleteAlertContent from "../components/DeleteAlertContent";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";
import { CARD_BG } from "../utils/data";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ detects route changes

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
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
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    }
  };

  // ✅ Re-fetch sessions when route changes (back to dashboard)
  useEffect(() => {
    fetchAllSessions();
  }, [location.key]);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-4 max-w-6xl relative">
        {/* Animated background for dashboard */}
        <div className="absolute -top-16 -left-16 w-60 h-60 bg-gradient-to-br from-cyan-300/30 to-blue-400/10 rounded-full blur-2xl z-0 animate-pulse" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-gradient-to-tr from-blue-300/30 to-cyan-400/10 rounded-full blur-2xl z-0 animate-pulse" />
        <div className="relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <svg width="80" height="80" fill="none" viewBox="0 0 80 80" className="mb-4 opacity-80">
              <rect width="80" height="80" rx="20" fill="url(#paint0_linear)"/>
              <path d="M24 56V32a8 8 0 018-8h16a8 8 0 018 8v24" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="40" cy="44" r="6" stroke="#0ea5e9" strokeWidth="2.5"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#e0f2fe"/>
                  <stop offset="1" stopColor="#bae6fd"/>
                </linearGradient>
              </defs>
            </svg>
            <h2 className="text-2xl font-bold text-blue-800 mb-2 drop-shadow-sm">
              No sessions yet
            </h2>
            <p className="text-gray-600 mb-4 max-w-xs mx-auto">
              Get started by creating your first interview session. Your progress and notes will appear here!
            </p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
            >
              Create Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
            {sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>
        )}

        {/* Floating Add Button */}
        <button
          className="h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition fixed bottom-10 right-10 shadow-lg"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-xl" />
          Add New
        </button>
        </div>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions();
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
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
