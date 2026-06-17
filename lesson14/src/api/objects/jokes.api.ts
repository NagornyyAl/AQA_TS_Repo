import type { ApiErrorDto } from '../dto/error.dto';
import type { JokeDto, JokeType } from '../dto/joke.dto';
import type { ApiResponse } from '../../framework/api-response';
import type { ApiService } from '../../framework/api-service';

export class JokesApi {
  public constructor(private readonly http: ApiService) {}

  public getRandomJoke(): Promise<ApiResponse<JokeDto>> {
    return this.http.get<JokeDto>('/jokes/random');
  }

  public getRandomJokes(count: number): Promise<ApiResponse<JokeDto[] | string>> {
    return this.http.get<JokeDto[] | string>(`/jokes/random/${count}`);
  }

  public getTenRandomJokes(): Promise<ApiResponse<JokeDto[]>> {
    return this.http.get<JokeDto[]>('/jokes/ten');
  }

  public getRandomJokeByType(type: JokeType): Promise<ApiResponse<JokeDto[]>> {
    return this.http.get<JokeDto[]>(`/jokes/${type}/random`);
  }

  public getTenJokesByType(type: JokeType): Promise<ApiResponse<JokeDto[]>> {
    return this.http.get<JokeDto[]>(`/jokes/${type}/ten`);
  }

  public getJokeById(id: number): Promise<ApiResponse<JokeDto | ApiErrorDto>> {
    return this.http.get<JokeDto | ApiErrorDto>(`/jokes/${id}`);
  }
}
