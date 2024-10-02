"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var events_1 = require("events");
var fs = require("fs");
var url_1 = require("url");
var eventEmitter = new events_1.EventEmitter();
var DATA_FILE = "data.json";
// Helper function to check if the data file exists or not
var ensureDataFileExists = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 4]);
                return [4 /*yield*/, fs.promises.access(DATA_FILE, fs.constants.F_OK)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                return [4 /*yield*/, fs.promises.writeFile(DATA_FILE, JSON.stringify([]))];
            case 3:
                _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Reads data from the file
var readDataFromFile = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, ensureDataFileExists()];
            case 1:
                _a.sent();
                return [4 /*yield*/, fs.promises.readFile(DATA_FILE, "utf8")];
            case 2:
                data = _a.sent();
                return [2 /*return*/, JSON.parse(data)];
            case 3:
                error_2 = _a.sent();
                console.error("Error reading data file: ", error_2);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Writes data to the file
var writeDataToFile = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2))];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error writing data file: ", error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//Helper function to get the request body
var getRequestBody = function (req) {
    return new Promise(function (resolve, reject) {
        var body = "";
        req.on("data", function (chunk) { return (body += chunk.toString()); });
        req.on("end", function () { return resolve(body); });
        req.on("error", function (err) { return reject(err); });
    });
};
// Event handling for save
eventEmitter.on("saveData", function (newData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, readDataFromFile()];
            case 1:
                data = _a.sent();
                data.push(newData);
                return [4 /*yield*/, writeDataToFile(data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error saving data: ", error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Event handling for update
eventEmitter.on("updateData", function (updatedData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, index, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, readDataFromFile()];
            case 1:
                data = _a.sent();
                index = data.findIndex(function (item) { return item.id === updatedData.id; });
                if (!(index !== -1)) return [3 /*break*/, 3];
                data[index] = updatedData;
                return [4 /*yield*/, writeDataToFile(data)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.error("Error updating data: ", error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//Event handling for delete
eventEmitter.on("deleteData", function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, readDataFromFile()];
            case 1:
                data = _a.sent();
                data = data.filter(function (item) { return item.id !== id; });
                return [4 /*yield*/, writeDataToFile(data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Error deleting data: ", error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Create server and handle different routes
var server = (0, http_1.createServer)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, id_1, body, newData, body, newItems, body, updatedData, body, data, index, data, item, data, error_7;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 18, , 19]);
                url = (0, url_1.parse)(req.url || "", true);
                id_1 = parseInt(((_a = url.pathname) === null || _a === void 0 ? void 0 : _a.split("/")[2]) || "0", 10);
                if (!(req.method === "POST" && url.pathname === "/data")) return [3 /*break*/, 2];
                return [4 /*yield*/, getRequestBody(req)];
            case 1:
                body = _f.sent();
                newData = __assign(__assign({}, JSON.parse(body)), { id: Date.now() });
                eventEmitter.emit("saveData", newData);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Data Saved", data: newData }));
                return [3 /*break*/, 17];
            case 2:
                if (!(req.method === "POST" && url.pathname === "/data/multiple")) return [3 /*break*/, 4];
                return [4 /*yield*/, getRequestBody(req)];
            case 3:
                body = _f.sent();
                newItems = JSON.parse(body).map(function (item) { return (__assign(__assign({}, item), { id: Date.now() + Math.floor(Math.random() * 10000) })); });
                newItems.forEach(function (item) { return eventEmitter.emit("saveData", item); });
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Multiple Data Saved", data: newItems }));
                return [3 /*break*/, 17];
            case 4:
                if (!(req.method === "PUT" && ((_b = url.pathname) === null || _b === void 0 ? void 0 : _b.startsWith("/data/")))) return [3 /*break*/, 6];
                return [4 /*yield*/, getRequestBody(req)];
            case 5:
                body = _f.sent();
                updatedData = __assign(__assign({}, JSON.parse(body)), { id: id_1 });
                eventEmitter.emit("updateData", updatedData);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Data updated", data: updatedData }));
                return [3 /*break*/, 17];
            case 6:
                if (!(req.method === "PATCH" && ((_c = url.pathname) === null || _c === void 0 ? void 0 : _c.startsWith("/data/")))) return [3 /*break*/, 12];
                return [4 /*yield*/, getRequestBody(req)];
            case 7:
                body = _f.sent();
                return [4 /*yield*/, readDataFromFile()];
            case 8:
                data = _f.sent();
                index = data.findIndex(function (item) { return item.id === id_1; });
                if (!(index !== -1)) return [3 /*break*/, 10];
                data[index] = __assign(__assign({}, data[index]), JSON.parse(body));
                return [4 /*yield*/, writeDataToFile(data)];
            case 9:
                _f.sent();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Data partially updated",
                    data: data[index],
                }));
                return [3 /*break*/, 11];
            case 10:
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Data not found" }));
                _f.label = 11;
            case 11: return [3 /*break*/, 17];
            case 12:
                if (!(req.method === "GET" && ((_d = url.pathname) === null || _d === void 0 ? void 0 : _d.startsWith("/data/")))) return [3 /*break*/, 14];
                return [4 /*yield*/, readDataFromFile()];
            case 13:
                data = _f.sent();
                item = data.find(function (d) { return d.id === id_1; });
                if (item) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(item));
                }
                else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Data not found" }));
                }
                return [3 /*break*/, 17];
            case 14:
                if (!(req.method === "GET" && url.pathname === "/data")) return [3 /*break*/, 16];
                return [4 /*yield*/, readDataFromFile()];
            case 15:
                data = _f.sent();
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
                return [3 /*break*/, 17];
            case 16:
                if (req.method === "DELETE" && ((_e = url.pathname) === null || _e === void 0 ? void 0 : _e.startsWith("/data/"))) {
                    eventEmitter.emit("deleteData", id_1);
                    res.writeHead(204, { "Content-Type": "application/json" });
                    res.end();
                }
                // If route is not found
                else {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Route not found" }));
                }
                _f.label = 17;
            case 17: return [3 /*break*/, 19];
            case 18:
                error_7 = _f.sent();
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Internal server error", error: error_7.message, }));
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); });
// Start the server
var PORT = 4789;
server.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
