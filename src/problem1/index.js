/* ## Assumptions
- n is always an integer ≥ 0
- result < Number.MAX_SAFE_INTEGER
- Prioritize performance, creativity, and clean code.
- Should follow modern ES6+ standards, production-grade.
- Should not use `var` — switch to `const` or `let`.
*/

// 1. Math formula - o(1): best performance, no side-effect
const sum_to_n_a = (n) => (n * (n + 1)) / 2;

// 2. For loop - o(n): good performance
const sum_to_n_c = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// 3. Functional array style (reduce) - o(n): good performance
const sum_to_n_b = (n) => Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);

// Should NOT use `tail-recursive pattern`, which may lead to stack overflow for large `n` input.
// It is only safe for moderate `n` due to the lack of guaranteed TCO in most JavaScript engines.

console.log(sum_to_n_a(5)); //15
console.log(sum_to_n_a(0)); //0
