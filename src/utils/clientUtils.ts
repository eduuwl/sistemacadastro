import { Client } from "../types/client";

export const formatPhone = (value: string): string => {
  let cleanedValue = value.replace(/\D/g, "");
  if (cleanedValue.length <= 11) {
    return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  }
  return cleanedValue;
};

export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

export const addNewClient = (
  formData: FormData,
  clients: Client[],
  phone: string
): Client[] => {
  const newClient: Client = {
    name: formData.get("name") as string,
    birthDate: formData.get("birthDate") as string,
    phone,
  };
  return [...clients, newClient];
};
