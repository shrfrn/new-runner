'use strict'

console.log('Ex 54')
console.log('Airline company')
// reviewed ✔️

/*
Build a data structure for an airline company.(use the create function for each object).
Create to following entities:
​
i. A Plane. The plane will contain:
1. model.
2. seatCount.
​
ii. A passenger - tip: use createPassenger(fullName, flights)
1. id (7 random digits)
2. fullName
3. flights (array of pointers to the relevant flights)
​
iii. A flight
1. date
2. departure
3. destination
4. plane (pointer to a plane)
5. passengers (array of pointers to the relevant passengers)
​
Initialize all variables with consistent data. i.e (date should be 0
and passengers should be an empty array).
​
i. Create an array of 5 passengers (gPassengers is a good name)
ii. Create an array of 2 planes.
iii. Create an array of 2 flights, each flight has a plane property that points
to a plane object, and a passengers property that points to the passengers array.
TIP: first create a passenger with an empty flights array,
and the flight with an empty passengers array, then you can push the objects.
​
Write the functions:
​
i. bookFlight(flight, passenger) - this function connects between the pointers 
of the passengers and their flights.
​
ii. getFrequentFlyers() - returns the passengers with the maximal 
flights count.
​
iii. checkIfFlightFullyBooked(flight) - checks if there are available 
seats on the flights, and returns true if there are. 
Think where would it make sense to invoke it.
*/

var gPassengers = []
createPassengers()

var gPlanes = [createPlane('707', 5), createPlane('DC10', 3)]

var gFlights = [
  createFlight('Israel', 'CosteRica', gPlanes[0]),
  createFlight('Israel', 'SriLanka', gPlanes[1]),
]


console.log('Booking flights...')
bookFlight(gFlights[1], gPassengers[3])
bookFlight(gFlights[1], gPassengers[0])
bookFlight(gFlights[0], gPassengers[3])
bookFlight(gFlights[1], gPassengers[2])
bookFlight(gFlights[1], gPassengers[4])
bookFlight(gFlights[0], gPassengers[2])
bookFlight(gFlights[0], gPassengers[4])
bookFlight(gFlights[0], gPassengers[0])
bookFlight(gFlights[0], gPassengers[1])

var frequentFlyers = getFrequentFlyers()

console.log('Passengers:', gPassengers)
console.log('Flights:', gFlights)
console.log('the frequent flyers are:', frequentFlyers)

function bookFlight(flight, passenger) {
  if (isFullyBooked(flight)) {
    console.log('Sorry', passenger.fullname, 'this flight is fully booked.')
    return
  }
  passenger.flights.push(flight)
  flight.passengers.push(passenger)
  console.log('Flight successfully booked!')
}

function getFrequentFlyers() {
  var max = 0
  var frequentFlyers = [] // Required in case array is zero length

  for (var i = 0; i < gPassengers.length; i++) {
    var currPassenger = gPassengers[i]
    var flightCount = currPassenger.flights.length

    if (flightCount > max) {
      frequentFlyers = [currPassenger]
      max = flightCount
    } else if (flightCount === max) {
      frequentFlyers.push(currPassenger)
    }
  }
  return frequentFlyers
}

// Helper functions
function isFullyBooked(flight) {
  return flight.passengers.length >= flight.plane.seatCount
}

function createPlane(model, seatCount) {
  return {
    model: model,
    seatCount: seatCount,
  }
}

function createPassenger(fullname) {
  return {
    id: makeId(7),
    fullname: fullname,
    flights: [],
  }
}

function createFlight(departure, detination, plane) {
  return {
    date: 0,
    departure: departure,
    detination: detination,
    plane: plane,
    passengers: [],
  }
}

function createPassengers() {
  var names = ['Muki', 'Shuki', 'Puki', 'Lala', 'Baba']

  for (var i = 0; i < names.length; i++) {
    gPassengers.push(createPassenger(names[i]))
  }
}

function makeId(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
