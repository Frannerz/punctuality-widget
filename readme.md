# Completed Features:

## Basic features

- Display rostered times for specific dates- complete
- Display if corresponding actual time was on time, or if there was an issue with it- complete
- Hover over actual time comment to see what the actual time was- complete

## Advanced features
Handling of shifts/rosters with some times missing (just indicate that in the UI, "no finish time clocked") - complete 


### Not yet completed:
- Date picker ("This Pay Period", also allows custom date selection)- add second date input, would need to do more checking of accepted query parameters
- Pagination ("Show [25] shifts" / "Showing 1 to 5 of 5 shifts")- either change limit on query params or solve in js e.g. with for loop when creating table
- Summary of times, through textual summary ("Mike is punctual 80% of the time"), chart, and summary of results ("punctual: 8, left early: 2")- would use a framework for this
