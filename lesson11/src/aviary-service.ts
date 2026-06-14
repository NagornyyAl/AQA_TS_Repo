import { IBird } from './i-bird.js';

export interface BirdRepository {
  findByName(name: string): Promise<IBird | undefined>;
  save(bird: IBird): Promise<IBird>;
}

export interface BirdNotifier {
  notify(message: string): Promise<boolean>;
}

export class AviaryService {
  public constructor(
    private readonly repository: BirdRepository,
    private readonly notifier: BirdNotifier
  ) {}

  public async register(bird: IBird): Promise<IBird> {
    const savedBird = await this.repository.save(bird);
    await this.notifier.notify(`${savedBird.getInfo()} registered`);

    return savedBird;
  }

  public async describeByName(name: string): Promise<string> {
    const bird = await this.repository.findByName(name);

    if (!bird) {
      return `Bird ${name} was not found`;
    }

    return `${bird.getInfo()} | ${bird.move()}`;
  }
}
