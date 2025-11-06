# Exercise 6: Quadratic Equation Solver

## Instructions
In this exercise, you will:
1. Use `prompt()` to read three coefficients (a, b, c) of a quadratic equation
2. Print the values of the following calculations:
   - `-b` (negative of coefficient b)
   - `2 * a` (twice coefficient a)
   - `b*b - 4*a*c` (the discriminant)

### Part I (Basic)
Calculate and display the values requested above.

#### Example
If the user enters:
- a = 2
- b = -5
- c = 2

the expected output is:
$$-b = 5 $$
$$ 2a = 4 $$
$$ b^2 - 4ac = 9 $$

#### Tips

- Remember to convert user inputs to numbers

---
### Part II (Bonus)
 Display the quadratic equation with the coefficients entered by the user in the console

#### Example
For the above input the console should show the equation like this:

$$ 2x^2 - 5x + 2 = 0 $$

#### Tips
- The symbol for the squared term (x²) can be written in code as 'x\u00B2'
- Consider what happens with different combinations of positive, negative and zero coefficients.
---
### Part III (Bonus)
Solve the quadratic equation using the formula:
$$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

#### Example

For the above input the solutions are:
$$ x1 = 2 $$
$$ x2 = 0.5 $$

#### Tips

- If the discriminant is 0, the equation has only one solution
- If the discriminant is negative, the equation has no real solutions (display an appropriate message)