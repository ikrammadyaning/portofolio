export const validateName = (name) => {
  if (!name || name.trim().length < 2) return "Name must be at least 2 characters";
  return "";
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Invalid email format";
  return "";
};

export const validateMessage = (message) => {
  if (!message || message.trim().length < 10) return "Message must be at least 10 characters";
  return "";
};

export const validateLogin = (username, password) => {
  if (!username || !password) return "All fields are required";
  if (username !== "emu" || password !== "123456") return "Invalid credentials";
  return "";
};
