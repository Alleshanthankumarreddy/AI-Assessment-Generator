"use client";

import {
  useEffect,
  useState,
} from "react";
import socket from "../../../lib/socket";
import { Search }
from "lucide-react";

import AssignmentCard
from "../../components/assignment/AssignmentCard";

import useAssignmentStore
from "../../../store/assignmentStore";

import {
  getAllAssignments,
} from "../../../lib/assignment";

export default function AssignmentsPage() {

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

      console.log(
        "Socket Update:",
        data
      );

      if (
        data.generatedPaper
      ) {

        console.log(
          "Generated Paper:",
          data.generatedPaper
        );

        console.log(
          "Sections:",
          data.generatedPaper.sections
        );

      }

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

    <div>

      {/* HEADER */}
      <div className="mb-6">

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
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 flex items-center justify-between mb-6">

        <button className="text-gray-500 text-sm font-medium">

          Filter By

        </button>

        <div className="flex items-center gap-3 bg-[#f5f5f5] px-4 py-3 rounded-xl w-[320px]">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Assignment"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {loading ? (

          <p>
            Loading assignments...
          </p>

        ) : filteredAssignments.length > 0 ? (

          filteredAssignments.map(
            (assignment) => (

            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
            />

          ))

        ) : (

          <p>
            No assignments found
          </p>

        )}

      </div>


      {/* FLOATING BUTTON */}
      <button className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-full shadow-2xl font-medium hover:scale-105 transition">

        + Create Assignment

      </button>

    </div>
  );
}