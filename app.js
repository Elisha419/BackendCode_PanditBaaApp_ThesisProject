const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.static(__dirname+'/images'))


app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./database/database");

const clientRoute = require("./router/clientRoute");
app.use(clientRoute);

const contactRoute = require("./router/contactRoute");
app.use(contactRoute);

const serviceRoute = require("./router/serviceRoute");
app.use(serviceRoute);

const adminRoute = require("./router/adminRoute");
app.use(adminRoute);

const bookingRoute = require("./router/bookingRoute");
app.use(bookingRoute);

const upcomingeventsRoute = require("./router/upcomingeventsRoute");
app.use(upcomingeventsRoute);

app.listen("90");