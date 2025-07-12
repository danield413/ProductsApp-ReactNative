import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { create } from "zustand";

export type Status = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
    status: Status;
    token?: string;
    user?: User;

    changeStatus: (token: string, user: User) => boolean;

    login(email: string, password: string): Promise<boolean>;
    checkStatus: () => Promise<boolean>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Initial state
    status: "checking",
    token: undefined,
    user: undefined,

    changeStatus: (token: string, user?: User): boolean => {
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

    // Zustand Actions
    login: async (email: string, password: string) => {
        const response = await authLogin(email, password);

        if (response) {
            return get().changeStatus(response?.token, response?.user);
        } 
        
        return false;
    },

    

    checkStatus: async () => {
        const response = await authCheckStatus();

        if (response) {
            return get().changeStatus(response?.token, response?.user);
        }
        
        return false;
    },

    logout: async () => {
        set({
            status: "unauthenticated",
            token: undefined,
            user: undefined,
        });
    },
}));
