import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../API/AuthService";


export const authUser = createAsyncThunk(
    'auth/authUser',
    async ({ username, password } : { username: string, password: string }) => {
        try {
            await AuthService.login(username, password)
        } catch (error) {
            console.log(error);
        }
    }
)

export const checkToken = createAsyncThunk(
    'auth/checkToken',
    async () => {
        try {
            await AuthService.checkToken()
        } catch (error) {
            console.log(error);
        }
    }
)