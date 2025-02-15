"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../components/Component.module.css";



interface FormProps {
  onNext: () => void;
}
const Form:React.FC<FormProps> = ({ onNext }) => {

  

  const { register, handleSubmit, watch, reset, formState: { errors }} = useForm();


const [ , setFormLoaded] = useState(false);

useEffect(() => {
  const savedData = localStorage.getItem("step1Data");
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
      setFormLoaded(true); 
    } catch (error) {
      console.error("Error parsing local storage data:", error);
    }
  }
}, [reset]);


const selectedTicket = watch("ticketType");



  const onSubmitStep1 = (data: Record<string, unknown>) => {
    console.log("Step 1 data:", data);
    localStorage.setItem("step1Data", JSON.stringify(data));

    onNext();
  };
  return (
    <div className="bg-[#02191D] w-full max-w-[90%] sm:max-w-[700px] h-auto md:h-[902px] p-6 sm:p-12 rounded-[40px] border border-[#0e464f] flex flex-col justify-center items-center gap-8 mt-16 mb-8 mx-auto">
      <>
        <div className="w-full md:w-[604px] ">
          <div className="flex justify-between items-center ">
            <div className="text-white text-[32px] font-normal font-['JejuMyeongjo']">
              Ticket Selection
            </div>
            <div className="text-neutral-50 text-base font-normal font-['Roboto'] leading-normal">
              Step 1/3
            </div>
          </div>
          <div data-svg-wrapper>
            <svg
              width="604"
              height="4"
              viewBox="0 0 604 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <path
                d="M0 2C0 0.895431 0.895431 0 2 0H602C603.105 0 604 0.895431 604 2C604 3.10457 603.105 4 602 4H2.00001C0.895441 4 0 3.10457 0 2Z"
                fill="#0E464F"
              />
              <path
                d="M0 2C0 0.895431 0.895431 0 2 0H230C231.105 0 232 0.895431 232 2C232 3.10457 231.105 4 230 4H2C0.895428 4 0 3.10457 0 2Z"
                fill="#24A0B5"
              />
            </svg>
          </div>
        </div>

        <div className="bg-[#08252B] p-4 rounded-[40px] my-6 w-full md:w-[604px]  md:h-[726px] border border-[#0e464f] mx-auto">
          <div className="text-center rounded-[40px] flex flex-col justify-center border border-[#0e464f] h-auto md:h-[200px] shadow bg-gradient-to-tl from-[#08242A] to-[#0D353E] p-6 md:p-8">
            <h2
              className={`${styles.customFont} text-center text-neutral-50 backdrop-blur-[14px] text-[36px] md:text-[62px] font-normal leading-[42px] md:leading-[62px]`}
            >
              Techember Fest &quot;25
            </h2>

            <p className="text-white text-sm md:text-base">
              Join us for an unforgettable experience at
            </p>
            <p className="text-white text-sm md:text-base">
              [Event Name]! Secure your spot now.
            </p>
            <p className="text-white text-sm md:text-base">
              📍[Event Location] | March 15, 2025 | 7:00 PM
            </p>
          </div>

          <hr className="border-t-4 border-[#0e464f] w-full my-4" />

          <h1 className="text-white mb-2 mt-4 text-neutral-50 text-base">
            Select Ticket Type:
          </h1>
          <form onSubmit={handleSubmit(onSubmitStep1)}>
            <div className="flex flex-col items-center p-4 bg-[#042127] rounded-3xl border border-[#07363e] w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                {[
                  { type: "regular", price: "Free", access: "REGULAR ACCESS" },
                  { type: "vip", price: "$50", access: "VIP ACCESS" },
                  { type: "vvip", price: "$150", access: "VVIP ACCESS" },
                ].map((ticket) => (
                  <label
                    key={ticket.type}
                    className={`${
                      selectedTicket === ticket.type
                        ? "bg-[#197686] rounded-lg"
                        : "bg-[#042127] rounded-md"
                    } border border-[#07363e] p-3 flex flex-col justify-center cursor-pointer w-full sm:w-[158px] h-[110px]`}
                  >
                    <input
                      type="radio"
                      value={ticket.type}
                      {...register("ticketType", {
                        required: "Please select a ticket type.",
                      })}
                      className="hidden"
                    />
                    <div>
                      <h1 className="text-white text-2xl">{ticket.price}</h1>
                      <h3 className="text-white">{ticket.access}</h3>
                      <p className="text-sm text-white">20/52</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.ticketType && (
                <p className="text-red-500 text-sm mt-2">
                  {typeof errors.ticketType?.message === "string" &&
                    errors.ticketType.message}
                </p>
              )}
            </div>

            <div className="my-6">
              <label className="block text-white mb-2">Number of Tickets</label>
              <select
                {...register("ticketCount", { required: true })}
                className="w-full bg-[#042127] border border-[#07363e] text-gray-200 p-2 rounded-md"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Buttons */}

            <div className="w-full p-4 md:p-6 bg-[#041e22] rounded-3xl border border-[#0e464f] flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 mb-2">
              <button
                
                type="button"
                className="w-full sm:grow sm:shrink sm:basis-0 h-12 px-6 py-3 rounded-lg border border-[#23a0b5] flex justify-center items-center"
              >
                <span className="text-[#23a0b5] text-base font-normal font-['JejuMyeongjo']">
                  Cancel
                </span>
              </button>
              <button
                type="submit"
                className="w-full sm:grow sm:shrink sm:basis-0 h-12 px-6 py-3 bg-[#23a0b5] rounded-lg flex justify-center items-center"
                
              >
                <span className="text-white text-base font-normal font-['JejuMyeongjo']">
                  Next
                </span>
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}

export default Form;