const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000

// Middlewares
app.use(express.json())
app.use(morgan('dev'))


// Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/crud-inventory", {useNewUrlParser: true}, () => {
    console.log("connected to the DB")
})


// Routes
// app.use("/characters", require('./routes/thronesRouter.js'))

const Item = require("../routes/inventory.js");

Item.find((err, items) => {
    // Note that this error doesn't mean nothing was found,
    // it means the database had an error while searching, hence the 500 status
    if (err) return res.status(500).send(err)
    // send the list of all items
    return res.status(200).send(items);
});
// If query IS passed into .find(), filters by the query parameters
Item.find({item: "xxxx", price: 111}, (err, items) =>{
    if (err) return res.status(500).send(err)

    // send the list of all items in database with name of "John James" and price of 36
    // Very possible this will be an array with just one Item object in it.
    return res.status(200).send(items);
});

Item.findOne(
    // query
    {item: "yyyy", dept: "zzzz"},

    // Only return an object with the "item" and "dept" fields. "_id" 
    // is included by default, so you'll need to remove it if you don't want it.
    {name: true, owner: true},

    // callback function
    (err, item) => {
        if (err) return res.status(200).send(err)
        return res.status(200).send(item)
    }
);
// Common RESTful way to get the Id is from the url params in req.params
Item.findById(req.params.itemId, (err, item) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(item)
});
Item.where("price").gte(50).lte(100).exec((err, items) => {
    // Do stuff
});
const Todo = require("../models/todo");

// Assuming this is from a POST request and the body of the
// request contained the JSON of the new "todo" item to be saved
const newItemObj = new Todo(req.body);
newTodoObj.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newTodoObj);
});

///////////



// Global Server Error Handler - handles ANY thrown error from ANY of our routes above
app.use((err, req, res, next) => {
    console.error(err)
    return res.send({errMsg: err.message})
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})