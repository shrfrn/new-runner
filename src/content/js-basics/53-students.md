# Exercise 53: Students Management

## Instructions
1. Create a students array using a `createStudents()` function
2. It will read student names from the user until 'quit' is entered
3. It will then read 3 grades for each student (each student should have a grades array)
4. Implement the following functions:
   - `calcAverageGrade(student)`: calculates a student's average grade
   - `findWorstStudent(students)`: finds the student with lowest average grade
   - `factorGrades(student)`: adds 5% to all of a student's grades
   - `forEach(students, func)`: loops through students array and invokes a function on each student
   - Use `forEach()` to invoke `factorGrades()` on all students
   - Implement `findWorstStudent()` using `forEach()`

## Example
If we have a student:
```javascript
{
  name: 'John',
  grades: [85, 90, 88]
}
```

After factoring grades (adding 5%):
```javascript
{
  name: 'John',
  grades: [89.25, 94.5, 92.4]
}
```