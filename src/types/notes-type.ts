import StatusEnum from "../enums/status-enum";

export type noteType = {
  id: number;
  title: string;
  details: string;
  tags?: string[];
};

export type noteSliceState = {
  notes?: noteType[];
  errorMessage?: string;
  status: "idle" | "loading" | "succeeded" | "failed";
};

export type resultType<Pagination> = {
  results: Pagination[];
  total: number;
};

export type noteParams = {
  limit: number;
  page: number;
};
