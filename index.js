const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload')
const app = express();
const cors = require('cors');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/admin/category');
const productRoutes = require('./routes/admin/product');
const orderRouter = require('./routes/admin/order')
const userRoutes = require('./routes/user/user');
const uploadRoutes = require('./routes/upload');
app.use(express.urlencoded({ extended: false }));
//connect mongoose
dotenv.config();
mongoose.connect('mongodb://localhost/project1', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('connect mongoose successfuly');
});
app.use(cors());
app.use(express.json());
app.use(fileUpload({
 useTempFiles: true
}))
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRouter);
app.use("/api", uploadRoutes);
app.use("/api", userRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
 console.log("server at http://localhost: " + PORT)
});

