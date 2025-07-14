import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { create } from "zustand";



export type Status = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: Status;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;

  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({

    // Initial state
    status: "checking",
    token: undefined,
    user: undefined,

    // Zustand Actions

    changeStatus: async (token?: string, user?: User): Promise<boolean> => {
        if (!token || !user) {
            set({
                status: "unauthenticated",
                token: undefined,
                user: undefined,
            });
            // LLamar al logout
            return false;
        }

        set({
            status: "authenticated",
            token,
            user,
        });
        // Guardar el token en AsyncStorage o SecureStore si es necesario
        return true;
    },

    login: async (email: string, password: string) => {
        const response = await authLogin(email, password);

        if (response) {
            return get().changeStatus(response?.token, response?.user);
        } 
        
        return false;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        get().changeStatus(resp?.token, resp?.user);
    },

    logout: async () => {
        set({
            status: "unauthenticated",
            token: undefined,
            user: undefined,
        });
    },

}));
