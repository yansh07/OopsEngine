"use client";

import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_API_BASE_URL}` 
  : "http://localhost:8000";

export default function ClerkUserSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const syncStartedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || syncStartedRef.current) {
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return;
    }

    syncStartedRef.current = true;

    const syncUser = async () => {
      try {
        const token = await getToken();

        if (!token) {
          return;
        }

        await fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            auth_provider_id: user.id,
          }),
        });
      } catch (error) {
        console.error("Failed to sync Clerk user", error);
      }
    };

    syncUser();
  }, [getToken, isLoaded, isSignedIn, user]);

  return null;
}