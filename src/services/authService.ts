interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const USER_STORAGE_KEY = 'pokedex_user';

export const authService = {
  getUser: (): User | null => {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
      return null;
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  // Simula requisição de login com delay de 800ms
  login: async (email: string, _password: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userJson = localStorage.getItem(USER_STORAGE_KEY);
        if (userJson) {
          const user = JSON.parse(userJson);
          if (user.email === email) {
            resolve(user);
            return;
          }
        }
        // Se usuário não existe, cria um novo para fins de demonstração
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        authService.setUser(newUser);
        resolve(newUser);
      }, 800);
    });
  },

  // Simula requisição de registro com delay de 800ms
  register: async (name: string, email: string, _password: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        authService.setUser(newUser);
        resolve(newUser);
      }, 800);
    });
  },

  logout: (): void => {
    authService.removeUser();
  },

  // Simula atualização de usuário com delay de 500ms
  updateUser: async (userData: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = authService.getUser();
        if (!currentUser) {
          reject(new Error('User not found'));
          return;
        }

        const updatedUser = { ...currentUser, ...userData };
        authService.setUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  }
};
