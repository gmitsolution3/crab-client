// Store OTP attempts in localStorage
export const storeOTPAttempt = (orderId: string) => {
  const attemptsKey = `otp_attempts_${orderId}`;
  const attempts = JSON.parse(localStorage.getItem(attemptsKey) || "[]");
  attempts.push(Date.now());
  localStorage.setItem(attemptsKey, JSON.stringify(attempts));

  // Check if blocked (3 attempts in last 2 hours)
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
  const recentAttempts = attempts.filter((time: number) => time > twoHoursAgo);

  if (recentAttempts.length >= 3) {
    const blockKey = `otp_blocked_${orderId}`;
    localStorage.setItem(blockKey, Date.now().toString());
    return true;
  }

  return false;
};

export const isBlocked = (
  orderId: string,
): { blocked: boolean; timeRemaining?: number } => {
  const blockKey = `otp_blocked_${orderId}`;
  const blockTime = localStorage.getItem(blockKey);

  if (!blockTime) {
    return { blocked: false };
  }

  const blockTimestamp = parseInt(blockTime);
  const currentTime = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;
  const timeElapsed = currentTime - blockTimestamp;

  if (timeElapsed < twoHours) {
    const timeRemaining = Math.floor((twoHours - timeElapsed) / 1000);
    return { blocked: true, timeRemaining };
  }

  // Clear block if 2 hours have passed
  localStorage.removeItem(blockKey);
  return { blocked: false };
};
