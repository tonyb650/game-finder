import express from 'express'
import locationRouter from './routes/location.routes'
import messageRouter from './routes/message.routes'

// const cors = require("cors");
// const cookieParser = require("cookie-parser");
const app = express()
const port: number = 8000

app.use(express.json());
app.use(express.urlencoded({extended:true})); // has to do with bodyParser
// app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
// app.use(cookieParser());

require("./config/mongoose.config");
// require('dotenv').config();

// require("./routes/user.routes")(app);
// const AllMyUserRoutes = require("./routes/user.routes");
// AllMyUserRoutes(app);
// require("./routes/event.routes")(app);

app.use(locationRouter)
app.use(messageRouter)

app.listen(port, ()=> console.log(`Express is listening on port: ${port}`))