export interface ApiResponse<TBody> {
  status: number;
  headers: Record<string, string | string[] | undefined>;
  body: TBody;
}
