# Lesson 3. JavaScript Coding Standards

## ESLint Configuration

This project follows ESLint standards to ensure consistent code quality and style across the codebase.

### ESLint Rules

- **no-unused-vars**: Variables must be used after declaration
- **semi**: Statements must end with semicolons
- **quotes**: Use single quotes for strings (unless escaping is needed)
- **indent**: Use 2 spaces for indentation
- **comma-dangle**: No trailing commas
- **no-console**: Avoid console statements in production code
- **eqeqeq**: Use strict equality (=== and !==) instead of loose equality

---

## JavaScript Types

### Primitive Types

- **string**: Text data
  ```javascript
  const name: string = "John";
  ```

- **number**: Numeric values
  ```javascript
  const age: number = 30;
  ```

- **boolean**: True or false
  ```javascript
  const isActive: boolean = true;
  ```

- **null**: Intentional absence of value
- **undefined**: Uninitialized variable

---

## Control Flow Structures

### If/Else Statements

```javascript
if (condition === true) {
  // code block
} else if (condition === false) {
  // code block
} else {
  // code block
}
```

**Standards:**
- Always use curly braces, even for single statements
- Use strict equality (`===`) instead of loose equality (`==`)
- Avoid nested conditions; use early returns when possible

### Switch Statements

```javascript
switch (value) {
  case "A":
    // code
    break;
  case "B":
    // code
    break;
  default:
    // code
}
```

**Standards:**
- Always include a `break` statement to prevent fall-through
- Include a `default` case
- Use `default` for unexpected values
- Cases should be aligned consistently

---

## Operators

### Comparison Operators

| Operator | Usage | Example |
|----------|-------|---------|
| `===` | Strict equality | `x === 5` |
| `!==` | Strict inequality | `x !== 5` |
| `>` | Greater than | `x > 5` |
| `<` | Less than | `x < 5` |
| `>=` | Greater than or equal | `x >= 5` |
| `<=` | Less than or equal | `x <= 5` |

### Logical Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `&&` | AND | `x > 5 && x < 10` |
| `\|\|` | OR | `x < 5 \|\| x > 10` |
| `!` | NOT | `!isActive` |

### Arithmetic Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `+` | Addition | `5 + 3` |
| `-` | Subtraction | `5 - 3` |
| `*` | Multiplication | `5 * 3` |
| `/` | Division | `5 / 3` |
| `%` | Modulo | `5 % 3` |
| `++` | Increment | `x++` |
| `--` | Decrement | `x--` |

### Assignment Operators

| Operator | Usage | Example |
|----------|-------|---------|
| `=` | Assign | `x = 10` |
| `+=` | Add and assign | `x += 5` |
| `-=` | Subtract and assign | `x -= 5` |
| `*=` | Multiply and assign | `x *= 5` |
| `/=` | Divide and assign | `x /= 5` |

---

## Best Practices

1. **Use `const` by default**, `let` when necessary, avoid `var`
2. **Always use strict equality** (`===`) over loose equality (`==`)
3. **Use meaningful variable and function names**
4. **Keep functions small and focused**
5. **Avoid deeply nested conditions**
6. **Document complex logic with comments**
7. **Follow the ESLint configuration** for code consistency