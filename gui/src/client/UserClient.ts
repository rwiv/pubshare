import axios from "axios";
import {appConstants} from "@/config/appConstants.ts";

export interface UserResponse {
  id: number;
  email: string;
  certified: boolean;
}

interface UserCreation {
  email: string;
  password: string;
  certified: boolean;
}

export class UserClient {

  private baseUrl = `${appConstants.host}/api/users`

  async getUsersAll() {
    const res = await axios.get<UserResponse[]>(this.baseUrl);
    return res.data;
  }

  async createUser(userCreation: UserCreation) {
    const res = await axios.post<UserResponse>(this.baseUrl, userCreation);
    return res.data;
  }

  async certificate(id: number) {
    const res = await axios.patch<UserResponse>(this.baseUrl + `/${id}`);
    return res.data;
  }
}