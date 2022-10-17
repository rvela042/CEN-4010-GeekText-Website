const mongoose = require('mongoose');
const { Rating, Comment, Highest, Average } = require('.models/model.js');
  
// Creating array of rating data objects
const ratingData = [{
    name: Rick,
    rating: 5,
    datestamp: 5/27/2021
},
{
    name: Saul,
    rating: 3,
    datestamp: 10/31/2019
}]
  
// Creating array of comment data objects
const commentData = [{
    name: "Rick",
    comment: "Solid book. Worth every second.",
    datestamp: 5/27/2021
},
{
    name: "Saul",
    comment: "Did not include as much suspense as I'd hoped for.",
    datestamp: 10/31/2019
}]
  
// Creating array of rating and comment data objects
const listData = [{
    highestRating: [5, 3] // find way to map comments to ratings inside array
}]
  
// Creating array of average ratings for book objects
const averageData = [{
    bookName: "Where the Red Fern Grows",
    avgRating: 4.8
},
{
    bookName: "Of Mice and Men",
    avgRating: 4.5
}]

// Inserting rating data
Rating.insertMany(ratingData)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })
  
// Inserting comment data
Comment.insertMany(commentData)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })
  
// Inserting list data
Highest.insertMany(listData)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })

// Inserting average rating data
Average.insertMany(averageData)
.then(value => {
    console.log("Saved Successfully");
})
.catch(error => {
    console.log(error);
})