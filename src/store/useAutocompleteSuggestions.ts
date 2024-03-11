import { useQuery } from "react-query";

interface AutocompleteResponse {
  id: string;
  name: string;
  category: string;
  value: string;
}

const fetchSuggestions = async (
  key: string
): Promise<AutocompleteResponse[]> => {
  const ignoreSymbolsRegex = /^[+\-*/^()]+$/;

  if (key.length === 0 || ignoreSymbolsRegex.test(key)) return [];

  const response = await fetch(
    `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useAutocompleteSuggestions = (key: string) => {
  return useQuery(["autocomplete", key], () => fetchSuggestions(key), {
    enabled: !!key.trim() && !/^[+\-*/^()]+$/.test(key),
  });
};
