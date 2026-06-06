# Test Solutions for JS Basics Exercises

This directory contains test solutions for the js-basics exercises, designed to test the quality of the server's automated testing and feedback system.

## Structure

Test solutions are organized in the `test-solutions/js-basics/` directory with the following naming convention:

```
{exercise-number}-{solution-type}.js
```

### Exercise Numbers
- `01` through `60` (excluding `06`, `29`, and `60` as requested)

### Solution Types

Each exercise has **8 variations** to test different aspects of the grading system:

#### 1. `perfect.js` - Perfect Solution
- Functionally correct
- Good code quality
- Proper naming conventions
- Correct indentation
- **Expected Result:** ✅ Pass with high score

#### 2. `runtime-error.js` - Runtime Error
- Contains a runtime error (ReferenceError, TypeError, etc.)
- Code fails to execute to completion
- **Expected Result:** ❌ Fail with runtime error detected

#### 3. `logic-bug-1.js` - Logic Bug (Type 1)
- Executes without errors
- Produces incorrect results
- Example: wrong operator, missing conversion
- **Expected Result:** ❌ Fail with logic error detected

#### 4. `logic-bug-2.js` - Logic Bug (Type 2)
- Different type of logic error
- Example: wrong condition, incorrect formula
- **Expected Result:** ❌ Fail with logic error detected

#### 5. `quality-1.js` - Code Quality Issues (Type 1)
- Functionally correct
- Poor variable naming (e.g., `a`, `b`, `c`, `x`, `y`, `z`)
- Missing spaces around operators
- **Expected Result:** ⚠️ Pass with quality warnings

#### 6. `quality-2.js` - Code Quality Issues (Type 2)
- Functionally correct
- Inconsistent indentation
- Poor code formatting
- **Expected Result:** ⚠️ Pass with quality warnings

#### 7. `bug-quality-1.js` - Combined Bugs & Quality Issues (Type 1)
- Logic bugs AND poor code quality
- Poor naming + logic errors
- **Expected Result:** ❌ Fail with both logic and quality issues

#### 8. `bug-quality-2.js` - Combined Bugs & Quality Issues (Type 2)
- Different combination of bugs and quality issues
- Bad indentation + logic errors
- **Expected Result:** ❌ Fail with both logic and quality issues

## Example Solutions

### Exercise 01 - Full Name Greeting

#### Perfect Solution (`01-perfect.js`)
```javascript
console.log('EX 01')
console.log('Read first name and last name, and welcome the user by his full name.')

var firstName = prompt('Please enter your first name:')
var lastName = prompt('Please enter your last name:')
var fullName = firstName + ' ' + lastName

alert('Welcome, ' + fullName + '!')
```

#### Runtime Error (`01-runtime-error.js`)
```javascript
console.log('EX 01')
console.log('Read first name and last name, and welcome the user by his full name.')

var firstName = prompt('Please enter your first name:')
var lastName = prompt('Please enter your last name:')
var fullName = firstName + ' ' + lastName

alert('Welcome, ' + fullname + '!')  // ReferenceError: fullname is not defined
```

#### Logic Bug (`01-logic-bug-1.js`)
```javascript
console.log('EX 01')
console.log('Read first name and last name, and welcome the user by his full name.')

var firstName = prompt('Please enter your first name:')
var lastName = prompt('Please enter your last name:')
var fullName = firstName + lastName  // Missing space between names

alert('Welcome, ' + fullName + '!')
```

#### Quality Issues (`01-quality-1.js`)
```javascript
console.log('EX 01')
console.log('Read first name and last name, and welcome the user by his full name.')

var f=prompt('Please enter your first name:')  // Poor variable name
var l=prompt('Please enter your last name:')  // Poor variable name
var fullName=f+' '+l  // Missing spaces around operators

alert('Welcome, '+fullName+'!')
```

## Batch Testing Script

The `test-batch-runner.js` script automates the testing process:

### Features
- Sends all test solutions to the server
- Collects HTML reports for each solution
- Parses reports to extract:
  - Pass/Fail status
  - Runtime errors
  - Logic errors
  - Code quality issues
  - Scores
- Compares actual results with expected results
- Generates comprehensive summary reports

### Usage

1. **Configure the server URL:**
   ```javascript
   const SERVER_URL = 'https://your-server-url/api/test'
   ```

2. **Run the batch test:**
   ```bash
   node test-batch-runner.js
   ```

3. **Review results:**
   - Individual HTML reports: `test-results/{exercise}-{type}-report.html`
   - JSON summary: `test-results/summary-report.json`
   - HTML summary: `test-results/summary-report.html`

### Expected Results

The script compares actual server responses against expected outcomes:

| Solution Type | Should Pass | Runtime Error | Logic Error | Quality Issues |
|--------------|-------------|---------------|-------------|----------------|
| perfect | ✅ Yes | ❌ No | ❌ No | ❌ No |
| runtime-error | ❌ No | ✅ Yes | ❌ No | ❌ No |
| logic-bug-1/2 | ❌ No | ❌ No | ✅ Yes | ❌ No |
| quality-1/2 | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| bug-quality-1/2 | ❌ No | ❌ No | ✅ Yes | ✅ Yes |

## Report Analysis

The batch runner analyzes HTML reports by looking for:

### Runtime Errors
- Keywords: "Runtime Error", "ReferenceError", "TypeError", "SyntaxError"
- Indicates: Code failed to execute

### Logic Errors  
- Keywords: "Logic Error", "incorrect result", "failed test", "wrong output"
- Indicates: Code executed but produced wrong results

### Quality Issues
- Keywords: "code quality", "indentation", "naming", "formatting", "style"
- Indicates: Code works but has quality problems

### Score Extraction
- Parses numeric scores from HTML
- Tracks pass/fail rates
- Calculates overall statistics

## Generating Additional Solutions

To extend test coverage to all 57 exercises (excluding 6, 29, 60):

1. Follow the 8-variation pattern for each exercise
2. Use the existing solutions as templates
3. Common logic bugs to include:
   - Wrong operators (+/-, */., </>, ===/!==)
   - Missing type conversions (prompt returns strings)
   - Wrong order of operations
   - Missing Math functions (Math.abs, Math.floor, etc.)
   - Incorrect conditions (< vs <=, && vs ||)

4. Common quality issues:
   - Single-letter variable names
   - Inconsistent indentation (random spacing)
   - Missing spaces around operators
   - Poor function naming

5. Common runtime errors:
   - Typos in variable names
   - Accessing undefined variables
   - Calling non-existent functions
   - Type errors (calling method on undefined)

## Current Coverage

✅ **Completed:** Exercises 01-10 (80 test files)
📝 **Remaining:** Exercises 11-28, 30-59 (excluding 6, 29, 60)

Total needed: 57 exercises × 8 variations = **456 test files**
Currently created: **80 test files**

## Testing Philosophy

This comprehensive test suite evaluates:

1. **Correctness Detection** - Does the system catch logic errors?
2. **Error Handling** - Does it properly identify runtime errors?
3. **Quality Assessment** - Does it provide feedback on code quality?
4. **False Positives** - Does it incorrectly fail good code?
5. **False Negatives** - Does it incorrectly pass bad code?

The batch runner produces metrics to assess the grading system's:
- **Precision:** Of solutions flagged as failing, how many actually have issues?
- **Recall:** Of solutions with issues, how many are caught?
- **Accuracy:** Overall correctness of pass/fail decisions

## Notes

- Exercises 6, 29, and 60 are skipped as per requirements
- Each test file is self-contained and can be tested independently
- The batch runner includes rate limiting (100ms between requests)
- HTML reports are saved for manual review if needed
- Summary reports provide both JSON (for automation) and HTML (for humans)



