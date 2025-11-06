# Exercise 54: Airline Management

## Instructions
In this exercise, you will:
1. Build a data structure for an airline company with the following entities:

   a. Plane:
   - model
   - seatCount
   - Implement `createPlane(model, seatCount)`

   b. Passenger:
   - id (7 random digits)
   - fullName
   - flights (array of flight pointers)
   - Implement `createPassenger(fullName)`

   c. Flight:
   - date
   - departure
   - destination
   - plane (pointer to plane object)
   - passengers (array of passenger pointers)
   - Implement `createFlight(departure, destination, plane)`

2. Initialize data:
   - Create array of 5 passengers
   - Create array of 2 planes
   - Create array of 2 flights
   - Connect flights with planes and passengers

3. Implement the following functions:
   - `bookFlight(flight, passenger)`: connects flight and passenger
   - `getFrequentFlyers()`: returns passengers with most flights
   - `isFullyBooked(flight)`: checks if all seats are booked

## Example
```javascript
// Create a plane
const plane = createPlane('Boeing 737', 180)

// Create a passenger
const passenger = createPassenger('John Doe')

// Create a flight
const flight = createFlight(0, 'New York', 'London', plane)

// Book the flight
bookFlight(flight, passenger)
```

## Tips
- Think about how to generate unique 7-digit IDs
- Where might you use `isFullyBooked()`