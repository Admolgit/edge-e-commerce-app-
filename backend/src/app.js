"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./src/route/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// This is the middle ware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', routes_1.default);
const PORT = process.env.PORT || 4000;
mongoose_1.default.connect(process.env.MONGODB_URL, {})
    .then(() => console.log("Connected to Edge MongoDB "))
    .catch(err => console.log(err.message));
app.listen(PORT, () => console.log(`Edge server running on ${PORT}`));
exports.default = app;
