"use client";

import {
  EllipsisVertical,
} from "lucide-react";

import {
  useState,
} from "react";

import AssignmentMenu
from "./AssignmentMenu";

interface Assignment {

  _id: string;

  title: string;

  createdAt: string;

  status: string;

  dueDate: string;

}

const AssignmentCard = ({
  assignment,
}: {
  assignment: Assignment;
}) => {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="relative bg-white rounded-3xl p-5 lg:p-6 shadow-sm border border-black/5">

      {/* TOP */}
      <div className="flex items-start justify-between">

        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 leading-snug max-w-[80%]">

          {assignment.title}

        </h2>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="text-gray-500 hover:text-black transition"
        >

          <EllipsisVertical size={20} />

        </button>

      </div>

      {/* MENU */}
      {open && (

        <AssignmentMenu
          assignmentId={
            assignment._id
          }
          closeMenu={() =>
            setOpen(false)
          }
        />

      )}

      {/* STATUS */}
      <p className="text-sm mt-3">

        Status:

        <span className={`

          ml-2 font-semibold

          ${
            assignment.status ===
            "completed"

              ? "text-green-500"

              : assignment.status ===
                "processing"

              ? "text-yellow-500"

              : assignment.status ===
                "failed"

              ? "text-red-500"

              : "text-gray-500"

          }

        `}>

          {assignment.status}

        </span>

      </p>

      {/* DATES */}
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 text-sm">

        <p className="text-gray-700">

          <span className="font-semibold">

            Assigned on:

          </span>{" "}

          {
            new Date(
              assignment.createdAt
            ).toLocaleDateString()
          }

        </p>

        <p className="text-gray-700">

          <span className="font-semibold">

            Due:

          </span>{" "}

          {
            new Date(
              assignment.dueDate
            ).toLocaleDateString()
          }

        </p>

      </div>

    </div>

  );

};

export default AssignmentCard;