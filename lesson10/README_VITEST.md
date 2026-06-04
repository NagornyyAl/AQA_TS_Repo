# Vitest

Vitest - це тестовий фреймворк для JavaScript і TypeScript, побудований навколо Vite. Він підтримує Jest-сумісний API, вбудовані Chai assertions, mocks через `vi`, snapshots, lifecycle hooks та швидкий запуск тестів.

Офіційна документація:

- Getting started: https://vitest.dev/guide/
- Writing tests: https://vitest.dev/guide/learn/writing-tests
- Expect API: https://vitest.dev/api/expect
- Features: https://vitest.dev/guide/features.html
- Setup and teardown: https://vitest.dev/guide/learn/setup-teardown

## Встановлення

```bash
npm install --save-dev vitest
```

Додати scripts у `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Одноразовий запуск тестів:

```bash
npm run test:run
```

У документації Vitest для версії v4.1.7 зазначено, що потрібен Node.js 20 або новіший.

## Базова структура тесту

У Vitest API зазвичай імпортується напряму з `vitest`.

```ts
import { describe, expect, it } from 'vitest';

describe('Calculator', () => {
  it('adds two numbers', () => {
    expect(2 + 3).toBe(5);
  });
});
```

Стандартні назви тестових файлів містять `.test.` або `.spec.`.

## Assertions

Vitest надає Jest-style matchers і Chai-style assertions через власний `expect`.

```ts
expect(value).toBe(10);
expect(user).toEqual({ name: 'Anna' });
expect(value).to.equal(10);
```

Також Vitest реекспортує Chai `assert`.

```ts
import { assert } from 'vitest';

assert.equal(total, 100);
```

Якщо за завданням потрібно використати зовнішній Chai, його можна імпортувати окремо.

```ts
import { expect as expectChai } from 'chai';

expectChai(total).to.equal(100);
```

## Setup та teardown

Lifecycle hooks допомагають готувати чистий стан перед кожним тестом.

```ts
import { beforeEach, describe, expect, it } from 'vitest';

describe('cart', () => {
  let items: string[];

  beforeEach(() => {
    items = [];
  });

  it('adds item', () => {
    items.push('book');

    expect(items).toHaveLength(1);
  });
});
```

## Mocks

Vitest має API `vi` для mock-функцій і spies.

```ts
import { expect, it, vi } from 'vitest';

it('calls logger', () => {
  const logger = vi.fn();

  logger('done');

  expect(logger).toHaveBeenCalledWith('done');
});
```

## Конфігурація

Файл `vitest.config.ts` потрібен, якщо треба змінити pattern тестових файлів, підключити setup files або налаштувати test environment.

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts']
  }
});
```

## Коли використовувати

Vitest варто використовувати, коли потрібні:

- швидкі TypeScript-friendly unit-тести;
- інтеграція з Vite;
- Jest-like синтаксис;
- сумісність із Chai;
- snapshots, mocks, coverage та browser/DOM environment options.

У цьому занятті Vitest використовується для перевірки функцій, які змінюють об'єкти, передані як параметри в `src/index.ts`.
