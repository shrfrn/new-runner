const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

//  Configuration
const SERVER_BASE_URL = 'http://localhost:3000'
const SERVER_ENDPOINT = '/api/test'
const SERVER_URL = SERVER_BASE_URL + SERVER_ENDPOINT
const AUTH_URL = SERVER_BASE_URL + '/api/auth/login'
const TEST_SOLUTIONS_DIR = path.join(__dirname, 'test-solutions', 'js-basics')
const RESULTS_DIR = path.join(__dirname, 'test-results')
const EXPECTATIONS_FILE = path.join(__dirname, 'test-expectations.json')

// Authentication credentials - from environment variables or defaults
const AUTH_CREDENTIALS = {
  username: process.env.TEST_USER || process.argv[2] || 'test',
  password: process.env.TEST_PASSWORD || process.argv[3] || 'test',
}

// Store cookies for authenticated requests
let sessionCookie = null

// Create results directory if it doesn't exist
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true })
}

// Expected test results for each solution type
const expectations = {
  perfect: {
    shouldPass: true,
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: false,
    shouldHaveQualityIssues: false,
  },
  'runtime-error': {
    shouldPass: false,
    shouldHaveRuntimeError: true,
    shouldHaveLogicError: false,
    shouldHaveQualityIssues: false,
  },
  'logic-bug-1': {
    shouldPass: false,
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: true,
    shouldHaveQualityIssues: false,
  },
  'logic-bug-2': {
    shouldPass: false,
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: true,
    shouldHaveQualityIssues: false,
  },
  'quality-1': {
    shouldPass: true,  // Might pass functionally
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: false,
    shouldHaveQualityIssues: true,
  },
  'quality-2': {
    shouldPass: true,  // Might pass functionally
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: false,
    shouldHaveQualityIssues: true,
  },
  'bug-quality-1': {
    shouldPass: false,
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: true,
    shouldHaveQualityIssues: true,
  },
  'bug-quality-2': {
    shouldPass: false,
    shouldHaveRuntimeError: false,
    shouldHaveLogicError: true,
    shouldHaveQualityIssues: true,
  },
}

// Function to authenticate with the server
async function authenticate() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(AUTH_CREDENTIALS)
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    }

    const protocol = AUTH_URL.startsWith('https') ? https : http
    const req = protocol.request(AUTH_URL, options, res => {
      let responseData = ''
      
      // Capture Set-Cookie header
      const cookies = res.headers['set-cookie']
      if (cookies) {
        sessionCookie = cookies.map(c => c.split(';')[0]).join('; ')
      }

      res.on('data', chunk => {
        responseData += chunk
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, cookie: sessionCookie })
        } else {
          reject(new Error(`Authentication failed: ${res.statusCode}`))
        }
      })
    })

    req.on('error', error => {
      reject(error)
    })

    req.write(postData)
    req.end()
  })
}

// Function to send a solution to the server for testing
async function testSolution(exerciseNum, solutionType, code, filename) {
  return new Promise((resolve, reject) => {
    // Create multipart form data manually
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2)
    
    // Build form data body
    let body = ''
    
    // Add file field
    body += `--${boundary}\r\n`
    body += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`
    body += 'Content-Type: text/javascript\r\n\r\n'
    body += code + '\r\n'
    
    // Add exerciseId field
    body += `--${boundary}\r\n`
    body += 'Content-Disposition: form-data; name="exerciseId"\r\n\r\n'
    body += exerciseNum + '\r\n'
    
    // Close boundary
    body += `--${boundary}--\r\n`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }

    // Add authentication cookie if available
    if (sessionCookie) {
      options.headers['Cookie'] = sessionCookie
    }

    // Choose http or https based on URL
    const protocol = SERVER_URL.startsWith('https') ? https : http
    const req = protocol.request(SERVER_URL, options, res => {
      let responseData = ''

      res.on('data', chunk => {
        responseData += chunk
      })

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: responseData,
          headers: res.headers,
        })
      })
    })

    req.on('error', error => {
      reject(error)
    })

    req.write(body)
    req.end()
  })
}

// Function to parse HTML report and extract test results
function parseHTMLReport(html) {
  const results = {
    passed: false,
    hasRuntimeError: false,
    hasLogicError: false,
    hasQualityIssues: false,
    score: 0,
    feedback: [],
  }

  // Look for common patterns in HTML report
  if (html.includes('Runtime Error') || html.includes('ReferenceError') || html.includes('TypeError')) {
    results.hasRuntimeError = true
  }

  if (html.includes('Logic Error') || html.includes('incorrect result') || html.includes('failed test')) {
    results.hasLogicError = true
  }

  if (html.includes('code quality') || html.includes('indentation') || html.includes('naming') || html.includes('formatting')) {
    results.hasQualityIssues = true
  }

  if (html.includes('All tests passed') || html.includes('Success') || html.includes('100%')) {
    results.passed = true
  }

  // Extract score if present
  const scoreMatch = html.match(/score[:\\s]+([0-9]+)/i)
  if (scoreMatch) {
    results.score = parseInt(scoreMatch[1])
  }

  return results
}

// Function to compare actual results with expectations
function compareResults(actual, expected, exerciseNum, solutionType) {
  const issues = []

  if (actual.passed !== expected.shouldPass) {
    issues.push(`Expected pass: ${expected.shouldPass}, got: ${actual.passed}`)
  }

  if (actual.hasRuntimeError !== expected.shouldHaveRuntimeError) {
    issues.push(`Expected runtime error: ${expected.shouldHaveRuntimeError}, got: ${actual.hasRuntimeError}`)
  }

  if (actual.hasLogicError !== expected.shouldHaveLogicError) {
    issues.push(`Expected logic error: ${expected.shouldHaveLogicError}, got: ${actual.hasLogicError}`)
  }

  if (actual.hasQualityIssues !== expected.shouldHaveQualityIssues) {
    issues.push(`Expected quality issues: ${expected.shouldHaveQualityIssues}, got: ${actual.hasQualityIssues}`)
  }

  return {
    testPassed: issues.length === 0,
    issues: issues,
    exerciseNum: exerciseNum,
    solutionType: solutionType,
  }
}

// Main function to run all tests
async function runBatchTests() {
  console.log('Starting batch test run...')
  
  // Authenticate first
  console.log('Authenticating...')
  try {
    const authResult = await authenticate()
    console.log('✅ Authentication successful')
    console.log(`   Cookie: ${sessionCookie ? sessionCookie.substring(0, 50) + '...' : 'none'}`)
  } catch (error) {
    console.error('❌ Authentication failed:', error.message)
    console.log('Please update AUTH_CREDENTIALS in the script')
    return
  }

  const results = []
  const files = fs.readdirSync(TEST_SOLUTIONS_DIR)
  const testFiles = files.filter(f => f.endsWith('.js'))

  console.log(`\nFound ${testFiles.length} test solution files`)

  for (const file of testFiles) {
    const match = file.match(/^(\d+)-(.*)\.js$/)
    if (!match) continue

    const exerciseNum = match[1]
    const solutionType = match[2]
    const filePath = path.join(TEST_SOLUTIONS_DIR, file)
    const code = fs.readFileSync(filePath, 'utf-8')

    console.log(`Testing: Exercise ${exerciseNum} - ${solutionType}`)

    try {
      const response = await testSolution(exerciseNum, solutionType, code, file)

      // Save HTML report
      const reportPath = path.join(RESULTS_DIR, `${exerciseNum}-${solutionType}-report.html`)
      fs.writeFileSync(reportPath, response.body)

      // Parse report
      const actualResults = parseHTMLReport(response.body)
      const expectedResults = expectations[solutionType]

      if (expectedResults) {
        const comparison = compareResults(actualResults, expectedResults, exerciseNum, solutionType)
        results.push(comparison)

        if (!comparison.testPassed) {
          console.log(`  ❌ FAILED: ${comparison.issues.join(', ')}`)
        } else {
          console.log('  ✅ PASSED')
        }
      } else {
        console.log(`  ⚠️  No expectations defined for type: ${solutionType}`)
      }

      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100))

    } catch (error) {
      console.error(`  ❌ Error testing ${file}:`, error.message)
      results.push({
        testPassed: false,
        issues: ['Request failed: ' + error.message],
        exerciseNum: exerciseNum,
        solutionType: solutionType,
      })
    }
  }

  // Generate summary report
  generateSummaryReport(results)

  console.log('\nBatch test run complete!')
}

// Function to generate a summary report
function generateSummaryReport(results) {
  const summaryPath = path.join(RESULTS_DIR, 'summary-report.json')
  const htmlSummaryPath = path.join(RESULTS_DIR, 'summary-report.html')

  const totalTests = results.length
  const passedTests = results.filter(r => r.testPassed).length
  const failedTests = totalTests - passedTests

  const summary = {
    timestamp: new Date().toISOString(),
    totalTests: totalTests,
    passed: passedTests,
    failed: failedTests,
    passRate: ((passedTests / totalTests) * 100).toFixed(2) + '%',
    details: results,
  }

  // Write JSON summary
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))

  // Write HTML summary
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Results Summary</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .summary { background: #f0f0f0; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .passed { color: green; }
    .failed { color: red; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #4CAF50; color: white; }
    tr:nth-child(even) { background-color: #f2f2f2; }
    .pass { background-color: #d4edda; }
    .fail { background-color: #f8d7da; }
  </style>
</head>
<body>
  <h1>Batch Test Results Summary</h1>
  <div class="summary">
    <h2>Overview</h2>
        <p><strong>Total Tests:</strong> ${totalTests}</p>
    <p class="passed"><strong>Passed:</strong> ${passedTests}</p>
    <p class="failed"><strong>Failed:</strong> ${failedTests}</p>
    <p><strong>Pass Rate:</strong> ${summary.passRate}</p>
    <p><strong>Timestamp:</strong> ${summary.timestamp}</p>
  </div>

  <h2>Detailed Results</h2>
  <table>
    <tr>
      <th>Exercise</th>
      <th>Solution Type</th>
      <th>Result</th>
      <th>Issues</th>
    </tr>
        ${results.map(r => `
    <tr class="${r.testPassed ? 'pass' : 'fail'}">
      <td>${r.exerciseNum}</td>
      <td>${r.solutionType}</td>
      <td>${r.testPassed ? '✅ PASSED' : '❌ FAILED'}</td>
      <td>${r.issues.join('<br>')}</td>
    </tr>
    `).join('')}
  </table>
</body>
</html>
  `

  fs.writeFileSync(htmlSummaryPath, html)

  console.log(`\nSummary: ${passedTests}/${totalTests} tests passed (${summary.passRate})`)
  console.log(`Reports saved to: ${RESULTS_DIR}`)
}

// Run the batch tests
runBatchTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})

