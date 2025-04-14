'use client'

import useCustomSearchParams from "@/lib/hooks/use-custom-search.hook";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const ToastHandler = () => {
  const { modalValue, paramValues, handleSetParams } = useCustomSearchParams('TOASTER_TYPE', ['TOASTER_MSG']);
  console.log(paramValues);
  const message = useMemo(() => paramValues.TOASTER_MSG, [paramValues]);
  console.log(message);

  useEffect(() => {
    if (modalValue && message) {
      switch (modalValue as ToasterType) {
        case "success":
          toast.success(message, {
            style: {
              borderRadius: "10px",
              background: "#4BB543",
              color: "#fff",
              fontSize: "14px",
            },
            iconTheme: {
              primary: "white",
              secondary: "#4BB543",
            },
            duration: 3000,
          });
          handleSetParams(false);
          break;
        case "error":
          toast.error(message, {
            style: {
              borderRadius: "10px",
              background: "#E74C3C",
              color: "#fff",
              fontSize: "14px",
            },
            iconTheme: {
              primary: "white",
              secondary: "#E74C3C",
            },
            duration: 3000,
          });
          handleSetParams(false);
          break;
        // case "warning":
        //   toast("Warning: Please be careful!", {
        //     style: {
        //       borderRadius: "10px",
        //       background: "#F39C12",
        //       color: "#fff",
        //       fontSize: "14px",
        //     },
        //     iconTheme: {
        //       primary: "white",
        //       secondary: "#F39C12",
        //     },
        //     duration: 3000,
        //   });
        //   break;
        default:
          break;
      }
    }
  }, [handleSetParams, message, modalValue]);

  return null;
};
