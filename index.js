const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const expressSession = require('express-session');
/**  */
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const KhoaHoctRouter = require('./routes/KhoaHoc');
const commentRouter = require('./routes/comment');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
//connect mongoose
dotenv.config();
mongoose.connect('mongodb://localhost/AnToanDien', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('connect mongoose successfuly');
});
//set ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
/**  */
app.listen(3000, () => {
 console.log("server at http://localhost:3000 ")
});
app.use(expressSession({
 secret: 'Pham Dinh Hai 2199'
}))
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/khoahoc', productRouter)
app.use('/cart', cartRouter);
app.use('/comment', commentRouter);
app.use('/khoahoc', KhoaHoctRouter);