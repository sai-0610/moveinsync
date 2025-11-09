export function isEmpty(value) {
  return !value || value.trim() === "";
}

export function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export function isPositiveNumber(num) {
  return !isNaN(num) && Number(num) > 0;
}

export function validateSeatData(seat) {
  if (!seat.seatId || !seat.room) return false;
  if (isNaN(seat.x) || isNaN(seat.y)) return false;
  return true;
}
