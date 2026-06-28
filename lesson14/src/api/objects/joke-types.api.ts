import type { JokeType } from '../dto/joke.dto';
import type { ApiResponse } from '../../framework/api-response';
import type { ApiService } from '../../framework/api-service';

export class JokeTypesApi {
    public constructor(private readonly http: ApiService) {}

    public getTypes(): Promise<ApiResponse<JokeType[]>> {
        return this.http.get<JokeType[]>('/types');
    }
}
