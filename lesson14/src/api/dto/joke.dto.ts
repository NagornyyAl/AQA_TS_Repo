export type JokeType = 'general' | 'knock-knock' | 'programming' | 'dad';

export interface JokeDto {
  id: number;
  type: JokeType;
  setup: string;
  punchline: string;
}
