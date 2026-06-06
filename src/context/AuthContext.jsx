import { createContext, useState, useCallback } from 'react';

const USERS_KEY = 'users';
const DEMO_USER = {
  id: 1,
  name: 'Ikram Madyaning',
  username: 'emu',
  email: 'ikram@example.com',
  password: '123456',
  joinDate: new Date().toISOString()
};

const getUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) {
      localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
      return [DEMO_USER];
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error('invalid');
    return parsed;
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasUser = localStorage.getItem('currentUser') !== null;
    if (loggedIn && !hasUser) {
      localStorage.removeItem('isLoggedIn');
      return false;
    }
    return loggedIn;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const register = useCallback(({ name, username, email, password }) => {
    const users = getUsers();
    const exists = users.find((u) => u.username === username);
    if (exists) return { success: false, error: 'Username already taken' };

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      username,
      email,
      password,
      joinDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  }, []);

  const login = useCallback((username, password) => {
    if (!username || !password) return false;

    try {
      const users = getUsers();
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        const userData = { id: user.id, name: user.name, username: user.username, email: user.email, joinDate: user.joinDate };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const updateProfile = useCallback(({ name, username, email }) => {
    try {
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === currentUser?.id);
      if (idx === -1) return { success: false, error: 'User not found' };

      const duplicate = users.find((u) => u.username === username && u.id !== currentUser?.id);
      if (duplicate) return { success: false, error: 'Username already taken' };

      users[idx] = { ...users[idx], name, username, email };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const updated = { id: users[idx].id, name, username, email, joinDate: users[idx].joinDate };
      localStorage.setItem('currentUser', JSON.stringify(updated));
      setCurrentUser(updated);
      return { success: true };
    } catch {
      return { success: false, error: 'Something went wrong' };
    }
  }, [currentUser]);

  const logout = useCallback(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
