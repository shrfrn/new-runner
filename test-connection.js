const fs = require('fs')
const path = require('path')
const http = require('http')

// Test script to verify setup before running full batch

console.log('🔍 Testing Setup...\n')

// 1. Check test solutions directory
const TEST_SOLUTIONS_DIR = path.join(__dirname, 'test-solutions', 'js-basics')
console.log('1. Checking test solutions directory...')
console.log('   Path:', TEST_SOLUTIONS_DIR)

if (fs.existsSync(TEST_SOLUTIONS_DIR)) {
  const files = fs.readdirSync(TEST_SOLUTIONS_DIR)
  const jsFiles = files.filter(f => f.endsWith('.js'))
  console.log('   ✅ Directory exists')
  console.log(`   ✅ Found ${jsFiles.length} test files`)
  console.log('   First 5 files:', jsFiles.slice(0, 5).join(', '))
} else {
  console.log('   ❌ Directory not found!')
  process.exit(1)
}

// 2. Check file pattern matching
console.log('\n2. Testing file pattern matching...')
const testFile = '01-perfect.js'
const match = testFile.match(/^(\d+)-(.*)\.js$/)
if (match) {
  console.log('   ✅ Pattern matches')
  console.log('   Exercise:', match[1])
  console.log('   Type:', match[2])
} else {
  console.log('   ❌ Pattern does not match')
}

// 3. Read a test file
console.log('\n3. Reading test file...')
const testFilePath = path.join(TEST_SOLUTIONS_DIR, '01-perfect.js')
if (fs.existsSync(testFilePath)) {
  const code = fs.readFileSync(testFilePath, 'utf-8')
  console.log('   ✅ File read successfully')
  console.log('   Code length:', code.length, 'bytes')
  console.log('   First 100 chars:', code.substring(0, 100))
} else {
  console.log('   ❌ File not found')
}

// 4. Test server connection
console.log('\n4. Testing server connection...')
const SERVER_URL = 'http://localhost:3000/api/test'
console.log('   Server URL:', SERVER_URL)

// Create FormData manually (multipart/form-data)
const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2)
const testCode = 'console.log("test")'

let testData = ''
testData += `--${boundary}\r\n`
testData += 'Content-Disposition: form-data; name="file"; filename="test.js"\r\n'
testData += 'Content-Type: text/javascript\r\n\r\n'
testData += testCode + '\r\n'
testData += `--${boundary}\r\n`
testData += 'Content-Disposition: form-data; name="exerciseId"\r\n\r\n'
testData += '01\r\n'
testData += `--${boundary}--\r\n`

const options = {
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': Buffer.byteLength(testData),
  },
}

console.log('   Attempting connection...')
console.log('   Sending FormData with file and exerciseId fields...')

const req = http.request(SERVER_URL, options, res => {
  console.log('   ✅ Server responded!')
  console.log('   Status:', res.statusCode)
  console.log('   Headers:', JSON.stringify(res.headers, null, 2))

  let data = ''
  res.on('data', chunk => {
    data += chunk
  })

  res.on('end', () => {
    console.log('   Response length:', data.length, 'bytes')
    if (data.length > 0) {
      console.log('   First 200 chars:', data.substring(0, 200))
    }
    console.log('\n✅ All checks passed! Ready to run batch tests.')
  })
})

req.on('error', error => {
  console.log('   ❌ Connection failed!')
  console.log('   Error:', error.message)
  console.log('\n⚠️  Please check:')
  console.log('   - Is the server running?')
  console.log('   - Is the SERVER_URL correct?')
  console.log('   - Should it be http:// or https://?')
  console.log('   - What port is the server on?')
})

req.write(testData)
req.end()

