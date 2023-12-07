export type SearchQuery = {
  name: string;
  phoneNumber: string;
  limit: number;
};

export type SearchResponse = {
  vendors: string[];
};
