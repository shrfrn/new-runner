# Test Solutions Usage Guide

## Quick Start

### 1. Review Test Solutions

Test solutions are in `test-solutions/js-basics/` with format: `{number}-{type}.js`

**Current Coverage:** Exercises 01-05, 07-11, 14-15 (120 files)

Each exercise has 8 variants:
- `perfect.js` - Should pass ✅
- `runtime-error.js` - Should fail with runtime error ❌
- `logic-bug-1.js` & `logic-bug-2.js` - Should fail with logic errors ❌
- `quality-1.js` & `quality-2.js` - Should pass but with quality warnings ⚠️
- `bug-quality-1.js` & `bug-quality-2.js` - Should fail with both issues ❌

### 2. Configure Batch Testing Script

Edit `test-batch-runner.js`:

```javascript
const SERVER_URL = 'YOUR_SERVER_URL_HERE'  // Update this!
```

### 3. Run Tests

```bash
node test-batch-runner.js
```

### 4. Review Results

Results are saved in `test-results/`:
- `summary-report.html` - Human-readable summary
- `summary-report.json` - Machine-readable data
- Individual HTML reports for each test

### 5. Analyze Results

The summary shows:
- Total tests run
- Pass/fail rates
- Which test expectations were met/unmet
- Detailed issues for each failing test

## Extending Coverage

To create test solutions for remaining exercises (16-59, excluding 6, 29, 60):

### Step 1: Read Exercise Description
```bash
cat src/content/js-basics/{number}-*.md
```

### Step 2: Check Existing Solution
```bash
cat submissions/js-basics/{number}.js
```

### Step 3: Create 8 Variations

Follow the pattern from existing test solutions:

**Perfect Solution:**
- Correct logic
- Good naming (descriptive variable names)
- Proper spacing
- Consistent indentation

**Runtime Error:**
- Introduce typo in variable name
- Call undefined function
- Access undefined property
- Type error (e.g., calling method on undefined)

**Logic Bugs:**
- Wrong operators (+/-, */., </>, ===/!==)
- Missing type conversions
- Wrong order of operations
- Incorrect conditions
- Missing function parameters or wrong return

**Quality Issues:**
- Single-letter variables (a, b, c, x, y, z)
- No spaces around operators
- Inconsistent indentation (random spacing)
- Poor function names (f, func, doStuff)

**Combined:**
- Mix logic bugs with quality issues

### Example Template

```javascript
// {number}-perfect.js
console.log('EX {number}')
console.log('{Description}')

// Perfect implementation here

// {number}-runtime-error.js  
// Same as perfect but with intentional typo/error

// {number}-logic-bug-1.js
// Same as perfect but with wrong operator/logic

// {number}-quality-1.js
// Same as perfect but with poor naming/formatting

// etc...
```

## Testing Strategy

### What We're Testing

1. **Correctness Detection**
   - Can the server identify wrong logic?
   - Does it catch incorrect outputs?

2. **Error Detection**
   - Does it properly flag runtime errors?
   - Are error messages helpful?

3. **Quality Assessment**
   - Does it identify code quality issues?
   - Does it differentiate bugs from style?

4. **False Positives/Negatives**
   - Perfect solutions should pass
   - Bad solutions should fail
   - Quality issues shouldn't cause failure (just warnings)

### Success Metrics

A good testing system should:
- ✅ Pass all `perfect` solutions
- ❌ Fail all `runtime-error` solutions
- ❌ Fail all `logic-bug` solutions
- ⚠️ Pass `quality` solutions with warnings
- ❌ Fail `bug-quality` solutions

## Common Bug Patterns by Exercise Type

### Prompt/Alert Exercises (1-5, 7-10)
- Not converting prompt input to number
- Wrong operators in calculations
- Missing spaces in string concatenation
- Wrong variable names (typos)

### Conditional Logic (7-13)
- Wrong comparison operators (< vs <=)
- Wrong logical operators (&& vs ||)
- Inverted conditions (!== vs ===)
- Missing else branches

### Functions (14-27)
- Missing return statements
- Wrong parameters
- Missing parameters
- Returning vs logging

### Arrays (38-49)
- Wrong array methods
- Off-by-one errors in loops
- Not returning new arrays
- Mutating vs non-mutating operations

### Advanced (50-59)
- Complex logic errors
- Missing edge case handling
- Algorithm mistakes
- Data structure issues

## Batch Testing Best Practices

1. **Start Small**
   - Test with 1-2 exercises first
   - Verify server response format
   - Adjust parser if needed

2. **Rate Limiting**
   - Current: 100ms between requests
   - Adjust based on server capacity
   - Consider batching strategy

3. **Result Analysis**
   - Review failed expectations manually
   - Update expectations if needed
   - Look for patterns in failures

4. **Iterative Improvement**
   - Fix parsing logic based on actual HTML
   - Refine expectations
   - Add more test cases

## Troubleshooting

### Issue: All tests failing
- Check SERVER_URL configuration
- Verify server is accessible
- Check auth requirements

### Issue: Parser not working
- Review actual HTML reports in test-results/
- Update parseHTMLReport() function
- Add more keywords to look for

### Issue: Wrong expectations
- Some solutions might be edge cases
- Server might be stricter/looser than expected
- Update expectations.json accordingly

### Issue: Tests too slow
- Reduce wait time between requests
- Consider parallel execution
- Batch requests if server supports it

## Next Steps

1. **Generate remaining solutions** for exercises 12-13, 16-59
2. **Run initial batch** to test server
3. **Analyze patterns** in server responses
4. **Refine parser** based on actual HTML
5. **Update expectations** based on results
6. **Generate reports** showing testing quality
7. **Iterate and improve** both tests and parser

## Files Structure

```
/NewRunner/
├── test-solutions/
│   └── js-basics/
│       ├── 01-perfect.js
│       ├── 01-runtime-error.js
│       ├── 01-logic-bug-1.js
│       ├── 01-logic-bug-2.js
│       ├── 01-quality-1.js
│       ├── 01-quality-2.js
│       ├── 01-bug-quality-1.js
│       ├── 01-bug-quality-2.js
│       └── ... (more exercises)
├── test-results/
│   ├── summary-report.html
│   ├── summary-report.json
│   └── {number}-{type}-report.html
├── test-batch-runner.js
├── TEST-SOLUTIONS-README.md
└── USAGE-GUIDE.md (this file)
```



