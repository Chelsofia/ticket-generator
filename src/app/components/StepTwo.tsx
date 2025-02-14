"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

interface FormProps {
  onNext: () => void;
  onBack: () => void;
}


interface FileWithPreview extends File {
  preview: string;
}


const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/chelsofia/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const StepTwo: React.FC<FormProps> = ({ onNext, onBack }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [, setNextMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  useEffect(() => {
    const savedData = localStorage.getItem("ticketDetails");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach((key) => {
          setValue(key, parsedData[key]); 
        });
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, [setValue]); 

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem("ticketDetails", JSON.stringify(data)); 
    });
    return () => subscription.unsubscribe(); // Cleanup
  }, [watch]);

  const [loading, setLoading] = useState(false); // Loading state

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setFileError("");
    setNextMessage("Uploading...");
    setLoading(true); 

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      const imageUrl = data.secure_url;

      localStorage.setItem("uploadedImage", imageUrl);

      const fileWithPreview = Object.assign(file, {
        preview: imageUrl,
      }) as FileWithPreview;
      setFiles([fileWithPreview]);

      setUploadedImageUrl(imageUrl);
      setUploadMessage("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      setFileError("Upload failed. Please try again.");
    } finally {
      setLoading(false); 
      setNextMessage("");
    }
  }, []);


  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  
  const onSubmitStep2 = async (data: Record<string, unknown>) => {
    if (files.length === 0) {
      setFileError("Avatar is required.");
      return;
    }
    setNextMessage("Processing your submission...");
    console.log("Step 2 data submitted", data);

    const step1Data = localStorage.getItem("step1Data");
    const parsedStep1Data = step1Data ? JSON.parse(step1Data) : {};

    const completeData = {
      ...parsedStep1Data,
      ...data,
    };

    localStorage.setItem("ticketDetails", JSON.stringify(completeData));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setNextMessage("");
    onNext();
  };

  
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div className="bg-[#02191D] w-full max-w-[90%] sm:max-w-[700px] h-auto md:h-[980px] p-6 sm:p-12 rounded-[40px] border border-[#0e464f] flex flex-col justify-center items-center gap-8 mt-16 mb-8 mx-auto">
      <div className="w-full md:w-[604px] mx-auto">
        <div className="w-full md:w-[604px]">
          <div className="flex justify-between items-center">
            <div className="text-white text-[32px] font-normal font-['JejuMyeongjo']">
              Attendee Details
            </div>
            <div className="text-neutral-50 text-base font-normal font-['Roboto'] leading-normal">
              Step 2/3
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

        <div className="bg-[#08252B] p-4 rounded-[40px] my-6 w-full md:w-[604px]  min-h-screen border border-[#0e464f] mx-auto">
          <div className="bg-[#08252B] p-4 rounded-md my-4 w-auto mx-auto">
            <h3 className="text-neutral-50 mb-4">Upload Profile Photo</h3>
            <div className="h-[200px] bg-black/20 flex justify-center items-center">
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin h-10 w-10 border-4 border-[#23a0b5] border-t-transparent rounded-full"></div>
                  <p className="text-neutral-50 mt-2">Uploading...</p>
                </div>
              ) : files.length === 0 ? (
                <div
                  {...getRootProps()}
                  className="w-60 h-60 bg-[#0e464e] cursor-pointer rounded-[32px] border-4 border-[#23a0b5]/50 flex flex-col justify-center items-center"
                >
                  <input {...getInputProps()} />
                  <div data-svg-wrapper className="relative">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.2639 14.816C24.6812 10.2267 20.7505 6.66669 16.0052 6.66669C12.3305 6.66669 9.13854 8.81469 7.68121 12.2C4.81721 13.056 2.67188 15.76 2.67188 18.6667C2.67188 22.3427 5.66254 25.3334 9.33854 25.3334H10.6719V22.6667H9.33854C7.13321 22.6667 5.33854 20.872 5.33854 18.6667C5.33854 16.7947 6.93721 14.9907 8.90254 14.6454L9.67721 14.5094L9.93321 13.7654C10.8705 11.0307 13.1972 9.33335 16.0052 9.33335C19.6812 9.33335 22.6719 12.324 22.6719 16V17.3334H24.0052C25.4759 17.3334 26.6719 18.5294 26.6719 20C26.6719 21.4707 25.4759 22.6667 24.0052 22.6667H21.3385V25.3334H24.0052C26.9465 25.3334 29.3385 22.9414 29.3385 20C29.337 18.8047 28.9347 17.6444 28.196 16.7047C27.4574 15.7649 26.425 15.0999 25.2639 14.816Z"
                        fill="#FAFAFA"
                      />
                      <path
                        d="M17.3385 18.6667V13.3334H14.6719V18.6667H10.6719L16.0052 25.3334L21.3385 18.6667H17.3385Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                  <p className="text-neutral-50 text-base mt-2 p-2 text-center">
                    Drag & drop or click to upload
                  </p>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="group w-60 h-60 bg-[#0e464e] rounded-[32px] border-4 border-[#23a0b5]/50 relative cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <img
                    src={files[0].preview}
                    alt={files[0].name}
                    className="object-cover w-full h-full rounded-[28px]"
                  />

                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[28px]">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M25.2639 14.816C24.6812 10.2267 20.7505 6.66669 16.0052 6.66669C12.3305 6.66669 9.13854 8.81469 7.68121 12.2C4.81721 13.056 2.67188 15.76 2.67188 18.6667C2.67188 22.3427 5.66254 25.3334 9.33854 25.3334H10.6719V22.6667H9.33854C7.13321 22.6667 5.33854 20.872 5.33854 18.6667C5.33854 16.7947 6.93721 14.9907 8.90254 14.6454L9.67721 14.5094L9.93321 13.7654C10.8705 11.0307 13.1972 9.33335 16.0052 9.33335C19.6812 9.33335 22.6719 12.324 22.6719 16V17.3334H24.0052C25.4759 17.3334 26.6719 18.5294 26.6719 20C26.6719 21.4707 25.4759 22.6667 24.0052 22.6667H21.3385V25.3334H24.0052C26.9465 25.3334 29.3385 22.9414 29.3385 20C29.337 18.8047 28.9347 17.6444 28.196 16.7047C27.4574 15.7649 26.425 15.0999 25.2639 14.816Z"
                        fill="#FAFAFA"
                      />
                      <path
                        d="M17.3385 18.6667V13.3334H14.6719V18.6667H10.6719L16.0052 25.3334L21.3385 18.6667H17.3385Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                    <p className="text-neutral-50 text-base mt-2 p-2 text-center">
                      Drag & drop or click to upload
                    </p>
                  </div>
                </div>
              )}
            </div>

            {uploadMessage && (
              <p className="text-white text-center mt-4">
                {uploadMessage}
                {uploadedImageUrl && (
                  <>
                    {" - "}
                    <Link
                      href={uploadedImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#23a0b5] font-bold"
                    >
                      View Image
                    </Link>
                  </>
                )}
              </p>
            )}

            {fileError && (
              <p className="text-red-500 text-xs mt-1 text-center">
                {fileError}
              </p>
            )}
          </div>
          <hr className="border-t-4 border-[#0e464f] w-full my-4" />

          <form onSubmit={handleSubmit(onSubmitStep2)} className="mt-6">
            <label className="block text-white mb-2">Enter your name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full bg-[#042127] text-white border border-[#07363e] p-2 rounded-md"
              required
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.name.message)}
              </p>
            )}

            <label className="block text-white mt-4 mb-2">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-[#042127] border border-[#07363e] text-white p-2 rounded-md"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.email.message)}
              </p>
            )}

            <label className="block text-white mt-4 mb-2">
              Special request?
            </label>
            <textarea
              {...register("specialRequest")}
              rows={4}
              className="w-full bg-[#042127] border border-[#07363e] text-white p-2 rounded-md"
            />
            <div className="w-full p-4 md:p-6 bg-[#041e22] rounded-3xl border border-[#0e464f] flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 mb-2">
              <button
                onClick={onBack}
                type="button"
                className="w-full sm:grow sm:shrink sm:basis-0 h-12 px-6 py-3 rounded-lg border border-[#23a0b5] flex justify-center items-center"
              >
                <span className="text-[#23a0b5] text-base font-normal font-['JejuMyeongjo']">
                  Back
                </span>
              </button>
              <button
                type="submit"
                className="w-full sm:grow sm:shrink sm:basis-0 h-12 px-6 py-3 bg-[#23a0b5] rounded-lg flex justify-center items-center"
                disabled={isSubmitting}
              >
                <span className="text-white text-base font-normal font-['JejuMyeongjo']">
                  Get my Free Ticket
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
