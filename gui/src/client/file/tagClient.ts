import {appConstants} from "@/common/appConstants.ts";
import {Tag, TagCreation} from "@/client/file/types";
import axios from "axios";
import {getHeaderConfig} from "@/client/common/clientUtils.ts";

const baseUrl = `${appConstants.host}/api/tags`;

export const tagQueryKeys = {
  name: "tags/name"
};

export async function createTag(creation: TagCreation) {
  const res = await axios.post<Tag>(`${baseUrl}`, creation, getHeaderConfig());
  return res.data;
}

export async function findTagsByName(name: string) {
  const res = await axios.get<Tag>(`${baseUrl}/name/${name}`, getHeaderConfig());
  return res.data;
}

export async function deleteTag(id: number) {
  const res = await axios.delete<Tag>(`${baseUrl}/${id}`, getHeaderConfig());
  return res.data;
}
