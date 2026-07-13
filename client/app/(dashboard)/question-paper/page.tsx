"use client";

import useAssignmentStore
from "../../../store/assignmentStore";

import { useRef }
from "react";

import { useReactToPrint } from "react-to-print";

import { jsPDF }
from "jspdf";

export default function QuestionPaperPage() {

  const {

    generatedPaper,

    selectedAssignment,

  } = useAssignmentStore();

    const paperRef =
  useRef<HTMLDivElement>(null);

  // ================= DOWNLOAD PDF =================

  const handlePrint =
  useReactToPrint({
    contentRef: paperRef,
    documentTitle:
      "question-paper",
  });

  // ================= TOTAL MARKS =================

  const totalMarks =
    generatedPaper?.sections.reduce(

      (sectionTotal, section) =>

        sectionTotal +

        section.questions.reduce(

          (questionTotal, question) =>

            questionTotal +
            question.marks,
          0
        ),
      0
    ) || 0;

 

  // ================= EMPTY =================
 if (!generatedPaper) {
    return (
      <div className="p-10 lg:p-20 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-black">
          No Question Paper Found
        </h1>
      </div>
    );
  }

  
  return (

    <div className="space-y-4 lg:space-y-6 px-3 lg:px-0 pb-10">

      {/* ================= TOP BANNER ================= */}

      <div className="bg-[#1f1f1f] rounded-[24px] lg:rounded-[32px] p-4 lg:p-8 text-white shadow-2xl">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* LEFT */}
          <div>

            <h1 className="text-2xl lg:text-4xl font-bold text-white leading-tight">

              {
                selectedAssignment?.institution ||

                "VedaAI Assessment System"
              }

            </h1>

            <p className="text-sm lg:text-2xl font-semibold leading-relaxed mt-3 max-w-3xl">

              Carefully designed AI generated
              question paper for your class.

            </p>

          </div>

          {/* BUTTON */}
          <button
            onClick={handlePrint}
            className="bg-white text-black px-5 py-3 lg:px-6 lg:py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg w-full lg:w-fit text-sm lg:text-base"
          >

            📄 Download PDF

          </button>

        </div>

      </div>

      {/* ================= QUESTION PAPER ================= */}

      <div
        ref={paperRef}
        className="paper-container bg-white shadow-xl border border-gray-300 mx-auto"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm",
          boxSizing: "border-box",
        }}
      >

        {/* HEADER */}

        <div className="text-center border-b-2 border-gray-400 pb-6">

          <h1 className="text-4xl font-bold text-black">

            {
              selectedAssignment?.institution ||
              "Assessment System"
            }

          </h1>

          <p className="text-xl mt-3 font-medium">

            Question Paper

          </p>

          <p className="text-lg mt-2">

            Subject:
            {" "}
            {selectedAssignment?.subject}

          </p>

        </div>

        {/* PAPER INFO */}

        <div className="flex justify-between mt-8 text-black font-medium">

          <p>

            Due Date:
            {" "}

            {
              selectedAssignment?.dueDate
                ? new Date(
                    selectedAssignment.dueDate
                  ).toLocaleDateString()
                : "N/A"
            }

          </p>

          <p>

            Maximum Marks:
            {" "}
            {totalMarks}

          </p>

        </div>

        {/* INSTRUCTIONS */}

        <div className="mt-8">

          <h3 className="font-bold text-lg">

            Instructions

          </h3>

          <ul className="list-disc ml-6 mt-2">

            <li>
              All questions are compulsory.
            </li>

            <li>
              Read all questions carefully.
            </li>

            <li>
              Write neat and legible answers.
            </li>

          </ul>

        </div>

        {/* STUDENT DETAILS */}

        <div className="grid grid-cols-2 gap-8 mt-10">

          <p>
            Name:
            _______________________
          </p>

          <p>
            Roll No:
            _______________________
          </p>

          <p>
            Class:
            _______________________
          </p>

          <p>
            Section:
            _______________________
          </p>

        </div>

        {/* SECTIONS */}

        {
          generatedPaper.sections.map(
            (
              section,
              sectionIndex
            ) => (

              <div
                key={sectionIndex}
                className="mt-12"
              >

                <div className="text-center">

                  <h2 className="text-2xl font-bold">

                    Section
                    {" "}
                    {
                      String.fromCharCode(
                        65 + sectionIndex
                      )
                    }

                  </h2>

                </div>

                <div className="mt-6">

                  <h3 className="font-semibold text-xl">

                    {section.title}

                  </h3>

                  <p className="italic mt-2">

                    {section.instruction}

                  </p>

                </div>

                <div className="mt-8 space-y-6">

                  {
                    section.questions.map(
                      (
                        question,
                        questionIndex
                      ) => {

                        const parts =
                          question.questionText.split(
                            "<<<OPTIONS>>>"
                          );

                        const questionText =
                          parts[0].trim();

                        const options =
                          parts.length > 1
                            ? parts[1]
                                .match(/[A-D]\.\s.*(?:\n|$)/g)
                                ?.map(option => option.trim()) || []
                            : [];

                        return (

                          <div
                            key={questionIndex}
                            className="question-block flex gap-4"
                          >

                            <div>
                              {questionIndex + 1}.
                            </div>

                            <div className="flex-1">

                              <p className="leading-8 whitespace-pre-line">

                                {questionText}

                                <span className="font-semibold">
                                  {" "}
                                  [{question.marks} Marks]
                                </span>

                              </p>

                              {options.length > 0 && (

                                <div className="ml-6 mt-3 space-y-2">

                                  {options.map(
                                    (
                                      option,
                                      index
                                    ) => (

                                      <div key={index}>
                                        {option}
                                      </div>

                                    )
                                  )}

                                </div>

                              )}

                            </div>

                          </div>

                        );

                    })
                  }

                </div>

              </div>

            )
          )
        }

        {/* FOOTER */}

        <div className="mt-16 border-t pt-6 text-center">

          <p className="font-semibold">

            ***** End of Question Paper *****

          </p>

        </div>

      </div>

    </div>

  );

}