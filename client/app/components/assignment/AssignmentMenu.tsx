"use client";

import {
  Trash2,
  Eye,
} from "lucide-react";

import {
  deleteAssignment,
  getQuestionPaper,
} from "../../../lib/assignment";

import useAssignmentStore
from "../../../store/assignmentStore";

import { useRouter }
from "next/navigation";

interface Props {

  assignmentId: string;

  closeMenu: () => void;

}

const AssignmentMenu = ({
  assignmentId,
  closeMenu,
}: Props) => {

  const router =
    useRouter();

  const {

    removeAssignment,

    setGeneratedPaper,

    setSelectedAssignment,

  } = useAssignmentStore();


  // ================= VIEW =================

  const handleView =
    async () => {

      try {

        const data =
          await getQuestionPaper(
            assignmentId
          );

        if (data.success) {

          setGeneratedPaper(
            data.generatedPaper
          );

          setSelectedAssignment(
            data.assignment
          );

          router.push(
            "/question-paper"
          );

        }

      } catch (error) {

        console.log(error);

      }

    };


  // ================= DELETE =================

  const handleDelete =
    async () => {

      try {

        const data =
          await deleteAssignment(
            assignmentId
          );

        if (data.success) {

          removeAssignment(
            assignmentId
          );

          closeMenu();

        }

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div className="absolute top-16 right-6 bg-white shadow-xl rounded-2xl border border-gray-200 py-2 w-[180px] z-50">

      {/* VIEW */}
      <button
        onClick={handleView}
        className="w-full px-4 text-black py-3 flex items-center gap-3 hover:bg-gray-50 transition text-sm"
      >

        <Eye size={16} />

        View Assignment

      </button>


      {/* DELETE */}
      <button
        onClick={handleDelete}
        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition text-sm text-red-500"
      >

        <Trash2 size={16} />

        Delete Assignment

      </button>

    </div>

  );

};

export default AssignmentMenu;
