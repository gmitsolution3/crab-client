import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL ||
  "http://localhost:5000/api";

export interface OTPResponse {
  success: boolean;
  message?: string;
  blocked?: boolean;
  timeRemaining?: number;
}

export const verifyOTP = async (
  orderId: string,
  otp: string,
): Promise<OTPResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/otp/verify-otp`, {
      orderId,
      otp,
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        success: false,
        message: "Verification failed",
      }
    );
  }
};

export const resendOTP = async (orderId: string): Promise<OTPResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/otp/resend-otp`, {
      orderId,
    });
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to resend OTP",
      }
    );
  }
};

export const checkAttempts = async (orderId: string): Promise<OTPResponse> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/check-attempts/${orderId}`,
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to check attempts",
      }
    );
  }
};
