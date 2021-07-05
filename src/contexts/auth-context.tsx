import React from "react";
import { IAuthContext } from "./auth-context-interface";

export const AuthContext = React.createContext<IAuthContext | null>(null);
