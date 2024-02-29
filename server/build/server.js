"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
dotenv_1.default.config(); // loads any environmental variables that we have
const app = (0, express_1.default)();
const port = 8000; // Express port
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // has to do with bodyParser
// app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use((0, cors_1.default)({ credentials: true, origin: ['https://game-finder-yme6.onrender.com', 'http://game-finder-yme6.onrender.com', 'http://localhost:8000', 'http://localhost:5173'] }));
// app.use(cors({ origin: ['http://localhost:3000', 'http://gamebrag.onrender.com', 'https://gamebrag.onrender.com'], credentials: true }))
app.use((0, cookie_parser_1.default)());
require("./config/mongoose.config"); // start database connection here
app.use(location_routes_1.default);
app.use(message_routes_1.default);
app.use(user_routes_1.default);
app.use(event_routes_1.default);
app.use(notification_routes_1.default);
app.listen(port, () => console.log(`Express is listening on port: ${port}`));
