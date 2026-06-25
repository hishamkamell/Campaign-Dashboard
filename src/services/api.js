import axios from "axios";
const API_URL = "https://6a3c14abe4a07f202e1669b0.mockapi.io/campaigns";
export async function getCampaigns() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function addCamp(camp) {
  const { data } = await axios.post(API_URL, camp);
  return data;
}

export async function deleteCamp(id) {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
}

export async function updateCamp(id, camp) {
  const { data } = await axios.put(`${API_URL}/${id}`, camp);
  return data;
}
