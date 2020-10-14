// This code assumes that you are inside a loop, and the dateString variable below is an item produced by the forEach
const dateString = "19@[2020-01-01T17:15:00.000+12:00/2020-01-01T08:15:00.000+02:00,2020-01-01T19:15:00.000+08:00/2020-01-01T09:00:00.000-03:00,2020-01-01T01:45:00.000-07:00/2020-01-01T08:30:00.000-02:00,2020-01-01T11:15:00.000+04:00/2020-01-01T18:45:00.000+11:00,2019-12-31T17:15:00.000-07:00/2019-12-31T21:45:00.000-03:00,2019-12-31T15:45:00.000-12:00/2020-01-01T07:15:00.000+03:00,2020-01-01T01:30:00.000Z/2020-01-01T01:00:00.000-02:00]";

// First thing to do is get the array of date/times into a consumable item.
// At the moment, it's one long string and that's nightmare fuel.
// If we split on the '@' symbol, we get 2 things:
// The ID of the user and array (still a string at this point)
// In this example I don't do anything with the ID of the user but you could.
const dateStringSplit = dateString.split('@');

// Since the array is still like '[content]', we need to make it in a way we can iterate over.
// First, we use .replace to remove the square brackets from the string then we split the string
// on the commas that separate the time ranges. This will give us an array of consumable content like
// ['james', 'stewart'] rather than '[james, stewart]'.
const timeRanges = dateStringSplit[1].replace(/[\[\]']/g,'' ).split(',')

// Init a new array that we need to put objects into
const startTimes = [];

// Loop through the time ranges
timeRanges.forEach(range => {
    // Each range can be separated out using the slash, so do that.
    const ranges = range.split('/')

    // This is a function inside the forEach to return the UTC version of the time (we'll need it later)
    const toUTC = (date) => {
        return new Date(date).toISOString();
    }

    // Push into the array an object that has the the UTC of the time and the original time.
    // But since question 1 of the test only needs to consider start times, push the first date
    // in from your split date.
    startTimes.push(toUTC(ranges[0]));
})

// Sort your array on the UTC value so that you get the earliest one first
startTimes.sort();

// startTimes[0] is now the earlier interval.
console.log(startTimes, startTimes[0]);