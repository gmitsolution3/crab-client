"use client";
import { useEffect } from "react";

export function LocationTracker() {
  useEffect(() => {
    if (!navigator.geolocation) {
     
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/user-location`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat: latitude,
              lng: longitude,
              accuracy,
              success: true,
            }),
          },
        );
      },
      (error) => {
        
        fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/user-location`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              success: false
            }),
          },
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }, []);

  return null;
}
