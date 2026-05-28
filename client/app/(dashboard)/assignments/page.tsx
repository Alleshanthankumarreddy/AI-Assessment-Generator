"use client";

import {
  useEffect,
  useState,
} from "react";

import socket from "../../../lib/socket";

import {
  Search,
  ArrowLeft,
  Plus,
} from "lucide-react";

import { useRouter }
from "next/navigation";

import AssignmentCard
from "../../components/assignment/AssignmentCard";

import useAssignmentStore
from "../../../store/assignmentStore";

import {
  getAllAssignments,
} from "../../../lib/assignment";

export default function AssignmentsPage() {

  const router =
    useRouter();

  const {

    assignments,

    setAssignments,

    loading,

    setLoading,

    updateAssignmentStatus,

  } = useAssignmentStore();

  const [search,
    setSearch] = useState("");

  // ================= FETCH =================

  useEffect(() => {

    const fetchAssignments =
      async () => {

        try {

          setLoading(true);

          const data =
            await getAllAssignments();

          if (data.success) {

            setAssignments(
              data.assignments
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchAssignments();

  }, []);

  // ================= SOCKET =================

  useEffect(() => {

    const handleStatusUpdate =
      (data: any) => {

        updateAssignmentStatus(
          data.assignmentId,
          data.status
        );

      };

    socket.on(
      "assignment-status",
      handleStatusUpdate
    );

    return () => {

      socket.off(
        "assignment-status",
        handleStatusUpdate
      );

    };

  }, []);

  // ================= SEARCH =================

  const filteredAssignments =
    assignments.filter(
      (assignment) =>

        assignment.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="pb-28">

      {/* MOBILE HEADER */}
      <div className="flex items-center justify-between mb-6 lg:hidden">

        <button className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center">

          <ArrowLeft size={20} />

        </button>

        <h1 className="font-bold text-lg">

          Assignments

        </h1>

        <div className="w-11"></div>

      </div>


      {/* DESKTOP HEADER */}
      <div className="hidden lg:block mb-6">

        <div className="flex items-center gap-3">

          <div className="w-3 h-3 rounded-full bg-green-500"></div>

          <h1 className="text-3xl font-bold text-gray-900">

            Assignments

          </h1>

        </div>

        <p className="text-gray-500 mt-2">

          Manage and create assignments for your classes.

        </p>

      </div>


      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-sm border border-black/5 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between mb-6">

        {/* FILTER */}
        <button className="text-gray-400 text-sm font-medium flex items-center gap-2">

          Filter

        </button>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-3 bg-[#f5f5f5] px-4 py-3 rounded-full w-full lg:w-[320px]">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Name"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-transparent outline-none text-sm w-full"
          />

        </div>

      </div>


      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {loading ? (

          <div className="text-center py-20">

            Loading assignments...

          </div>

        ) : filteredAssignments.length > 0 ? (

          filteredAssignments.map(
            (assignment) => (

              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
              />

            )
          )

        ) : (

          <div className="text-center py-20">

            No assignments found

          </div>

        )}

      </div>


      {/* FLOATING BUTTON */}
      <button
        onClick={() =>
          router.push(
            "/generate-assignment"
          )
        }
        className="fixed bottom-6 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto bg-white lg:bg-black text-black lg:text-white w-14 h-14 lg:w-auto lg:h-auto lg:px-8 lg:py-4 rounded-full shadow-2xl font-medium hover:scale-105 transition flex items-center justify-center gap-2"
      >

        <Plus size={24} />

        <span className="hidden lg:block">

          Create Assignment

        </span>

      </button>

    </div>

  );

}