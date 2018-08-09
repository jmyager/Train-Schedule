# Train Schedule
A simple train scheduling application utilizing a firebase database

## Overview
Train Schedule was an exercise in building an application that utilized firebase for the first time. The application required user input data into a form, creating a "train". This train is then saved permanently in the database, where it will display in the schedule upon loading the web page. 

Additionally, programming logic was required to determine how many minutes away the next train is from the user. Each train runs on a certain frequency cycle; the application then tracks the current time and subtracts the distance to the next recorded arrival time, to arrive at a final number. 

The arithmetic becomes dynamic, as the data points are entered by the user and not hard coded into the application.

## Demo
View the live demo [here](http://www.joshyager.com/Train-Schedule/)
