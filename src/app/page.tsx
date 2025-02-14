"use client";
import React, { useState, useEffect } from "react";
import Form from "@/app/components/Form";
import StepTwo from "@/app/components/StepTwo";
import TicketPage from "@/app/components/TicketPage";

export default function MultiStepForm() {

  const [mounted, setMounted] = useState(false);

  const [step, setStep] = useState(1);

  
  useEffect(() => {
    setMounted(true);
    const savedStep = localStorage.getItem("currentStep");
    if (savedStep) {
      setStep(Number(savedStep));
    }
  }, []);

  
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("currentStep", step.toString());
    }
  }, [step, mounted]);

  
  if (!mounted) return null;

  return (
    <div>
      {step === 1 && <Form onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepTwo onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && <TicketPage onBack={() => setStep(1)} />}
    </div>
  );
}
