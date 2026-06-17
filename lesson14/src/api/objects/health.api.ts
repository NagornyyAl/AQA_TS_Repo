import type { ApiResponse } from '../../framework/api-response';
import type { ApiService } from '../../framework/api-service';

export class HealthApi {
  public constructor(private readonly http: ApiService) {}

  public ping(): Promise<ApiResponse<string>> {
    return this.http.get<string>('/ping');
  }
}
