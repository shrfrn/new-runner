# HTTP Calls Overview - ExRunner Application

**Date:** November 8, 2025  
**Focus:** HTTP/Network calls analysis and service extraction assessment

---

## Executive Summary

The ExRunner application makes HTTP calls from **3 different modules** for **5 distinct purposes**. Currently, there is **no centralized HTTP service**, leading to some code duplication and inconsistent error handling patterns. There is a **strong case** for creating an HTTP service to encapsulate common behaviors.

---

## HTTP Calls Inventory

### 1. Authentication Service (`src/js/services/auth.service.js`)

**Server:** `http://localhost:3000` (hardcoded as `AUTH_SERVER_URL`)

#### Calls Made:
1. **Login** - `POST /api/auth/login`
   - Line: 86 (via `requestAuth()`)
   - Payload: credentials object (username/email, password)
   - Headers: `Content-Type: application/json`
   - Credentials: `include` (cookies)
   - Response: JSON (user object)

2. **Signup** - `POST /api/auth/signup`
   - Line: 86 (via `requestAuth()`)
   - Payload: user details object
   - Headers: `Content-Type: application/json`
   - Credentials: `include` (cookies)
   - Response: JSON (user object)

3. **Logout** - `POST /api/auth/logout`
   - Line: 54 (direct fetch)
   - Payload: none
   - Headers: none
   - Credentials: `include` (cookies)
   - Response: status only

**Error Handling:**
- Network errors caught and thrown with custom message
- Response parsed with dedicated `parseResponseJson()` function
- Server errors extracted from response body
- Comprehensive validation of response structure

---

### 2. Test Submission (`src/js/test-submission.js`)

**Server:** `http://localhost:3000/api/test` (hardcoded as `TEST_SERVER_URL`)

#### Calls Made:
1. **Fetch Local Script** - `GET /submissions/{folder}/{file}`
   - Line: 37
   - Purpose: Load student's solution file
   - Response: text/javascript
   - Error handling: thrown error with script path

2. **Submit for Testing** - `POST /api/test`
   - Line: 44
   - Payload: FormData with:
     - `file`: JavaScript file blob
     - `exerciseId`: exercise identifier
     - `runnerLog`: JSON stringified usage log (optional)
   - Credentials: `include` (cookies)
   - Response: HTML (test report)

**Error Handling:**
- Errors logged to console with styling
- UI feedback via button state changes
- Generic error messages returned

---

### 3. Content Loader (`src/js/content-loader.js`)

**Server:** Local relative paths (static content)

#### Calls Made:
1. **Load Markdown Content** - `GET content/{folder}/{file}.md`
   - Line: 19
   - Purpose: Load exercise markdown files
   - Response: text/markdown
   - Error handling: try-catch with UI feedback

2. **Load HTML Content** - `GET content/html/{folder}/{file}`
   - Line: 54
   - Purpose: Load static HTML pages (about, settings, help)
   - Response: text/html
   - Error handling: try-catch with UI feedback

**Error Handling:**
- Errors logged to console
- UI displays error message
- Returns status object with error details

---

## Code Analysis

### Current HTTP Patterns

#### Pattern 1: JSON API Calls (auth.service.js)
```javascript
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
}

const response = await fetch(url, requestOptions)
const data = await parseResponseJson(response)

if (!response.ok) {
    const message = data?.message || 'Default error message'
    throw new Error(message)
}
```

**Strengths:**
- Dedicated JSON parsing with error handling
- Credential inclusion for auth
- Custom error messages from server
- Network error distinction

**Weaknesses:**
- Only used in auth service (not reusable)
- URL construction logic inline

---

#### Pattern 2: FormData Submission (test-submission.js)
```javascript
const formData = new FormData()
formData.append('file', file)
formData.append('exerciseId', exerciseId.toString())

const response = await fetch(TEST_SERVER_URL, {
    method: 'POST',
    body: formData,
    credentials: 'include'
})

const htmlReport = await serverResponse.text()
```

**Strengths:**
- Appropriate for file uploads
- Credential inclusion

**Weaknesses:**
- No consistent error format
- UI state management mixed with HTTP logic
- Manual response type handling

---

#### Pattern 3: Content Fetching (content-loader.js)
```javascript
const response = await fetch(mdPath)

if (!response.ok) {
    throw new Error(`Failed to load ${mdPath}: ${response.status} ${response.statusText}`)
}

const mdContent = await response.text()
```

**Strengths:**
- Simple and direct
- Appropriate error messages

**Weaknesses:**
- No network error handling
- UI state management mixed with fetch logic
- Duplicated pattern across two functions

---

## Inconsistencies & Issues

### 1. Error Handling Variations
- **auth.service.js**: Network errors caught separately, JSON parsing errors handled, server errors extracted from response
- **test-submission.js**: Generic error handling, no network error distinction
- **content-loader.js**: Basic error handling, no network error distinction

### 2. URL Management
- Three different hardcoded server URLs
- No environment configuration
- No base URL abstraction

### 3. Response Parsing
- **auth.service.js**: Dedicated JSON parser with error handling
- **test-submission.js**: Manual text parsing
- **content-loader.js**: Manual text parsing

### 4. Credential Handling
- API calls include credentials
- Static content fetches don't
- No consistent credential policy

### 5. UI Concerns Mixed with HTTP
- **test-submission.js**: Button state changes during fetch
- **content-loader.js**: DOM manipulation during fetch
- **auth.service.js**: Better separation (returns data, no UI manipulation)

---

## Case for HTTP Service

### Strong Arguments FOR Creating an HTTP Service

#### 1. **Code Duplication**
- JSON request pattern repeated across auth methods
- Error handling logic duplicated
- Response parsing repeated

#### 2. **Inconsistent Error Handling**
- Different error formats across modules
- Network errors not consistently caught
- User-facing messages vary in quality

#### 3. **Configuration Management**
- Three hardcoded server URLs
- No environment-based configuration
- Difficult to switch between dev/staging/prod

#### 4. **Testing Challenges**
- Each module needs separate mocking strategy
- No central point to intercept requests
- Difficult to test error scenarios consistently

#### 5. **Future Extensibility**
- Adding interceptors (auth tokens, logging)
- Adding retry logic
- Adding request/response transformation
- Adding caching layer
- Adding timeout handling

#### 6. **Maintainability**
- Changes to fetch options require updates in multiple places
- Adding new endpoints follows inconsistent patterns
- Credential handling not centralized

---

### Potential Concerns AGAINST Creating an HTTP Service

#### 1. **Minimal Complexity**
- Small application with only 6 HTTP calls
- Current code is readable and functional

#### 2. **Different Use Cases**
- Static content vs API calls have different needs
- File uploads vs JSON payloads require different handling

**Counter-argument:** A well-designed HTTP service can handle multiple scenarios through method variations or configuration options.

---

## Recommended HTTP Service Design

### Service Structure

```
src/js/services/
  http.service.js          (proposed - core HTTP abstraction)
  auth.service.js          (refactored to use http.service)
  config.service.js        (existing)
  usage-tracking.service.js (existing)
  util.service.js          (existing)
```

### Core Features to Include

1. **Base Configuration**
   - Configurable base URLs
   - Default headers
   - Default credentials policy
   - Timeout configuration

2. **Request Methods**
   - `get(url, options)`
   - `post(url, body, options)`
   - `postForm(url, formData, options)`
   - `put(url, body, options)`
   - `delete(url, options)`

3. **Response Handling**
   - Automatic JSON parsing for `application/json` responses
   - Text parsing for other content types
   - Consistent error format
   - Status code validation

4. **Error Handling**
   - Network error detection
   - HTTP error detection (4xx, 5xx)
   - Response parsing error handling
   - Timeout error handling

5. **Interceptors (Optional Future)**
   - Request interceptors (add auth tokens, logging)
   - Response interceptors (transform data, handle global errors)

### Example API

```javascript
// GET request
const content = await http.get('/content/js-basics/01.md')

// POST JSON
const user = await http.post('/api/auth/login', credentials, {
    baseUrl: 'AUTH_SERVER',
    credentials: 'include'
})

// POST FormData
const result = await http.postForm('/api/test', formData, {
    baseUrl: 'TEST_SERVER',
    credentials: 'include'
})
```

---

## Migration Strategy

### Phase 1: Create HTTP Service
1. Create `src/js/services/http.service.js`
2. Implement core request methods
3. Add comprehensive error handling
4. Add JSDoc documentation
5. Test with one simple endpoint

### Phase 2: Refactor auth.service.js
1. Replace `requestAuth()` with `http.post()`
2. Replace logout fetch with `http.post()`
3. Remove duplicate error handling
4. Test authentication flows

### Phase 3: Refactor test-submission.js
1. Replace script fetch with `http.get()`
2. Replace submission with `http.postForm()`
3. Keep UI logic separate
4. Test submission flow

### Phase 4: Refactor content-loader.js
1. Replace markdown fetch with `http.get()`
2. Replace HTML fetch with `http.get()`
3. Keep UI logic separate
4. Test content loading

### Phase 5: Configuration
1. Extract server URLs to config
2. Add environment detection (if needed)
3. Add timeout configuration

---

## Risk Assessment

### Low Risk
- ✅ Small codebase with limited HTTP surface area
- ✅ Clear separation between modules
- ✅ Can be done incrementally without breaking existing functionality

### Mitigation
- Create service with backward-compatible wrapper functions
- Test thoroughly before replacing existing implementations
- Keep existing code until new service is validated

---

## Conclusion

**Recommendation: YES - Create an HTTP Service**

While the current implementation is functional, creating a centralized HTTP service would provide:
- **Better maintainability** through consistent patterns
- **Improved error handling** through centralized logic
- **Easier testing** through single interception point
- **Future flexibility** for interceptors, retries, and caching
- **Cleaner code** through separation of concerns

The investment is small (estimated 2-3 hours) and the benefits are substantial for long-term code quality.

---

## Next Steps

1. Create HTTP service with core functionality
2. Add comprehensive error handling
3. Refactor existing services incrementally
4. Add tests for HTTP service
5. Document API and usage patterns
6. Consider adding request/response logging for debugging

---

**End of Document**


