import axios from "axios";
import {appConstants} from "@/config/appConstants.ts";

export interface Account {
  id: number;
  email: string;
  certified: boolean;
}

interface Creation {
  email: string;
  password: string;
  certified: boolean;
}

export class AccountClient {

  private baseUrl = `${appConstants.host}/api/accounts`

  async findByAll() {
    const res = await axios.get<Account[]>(this.baseUrl);
    return res.data;
  }

  async create(creation: Creation) {
    const res = await axios.post<Account>(this.baseUrl, creation);
    return res.data;
  }

  async certificate(id: number) {
    const res = await axios.patch<Account>(this.baseUrl + `/${id}`);
    return res.data;
  }
}