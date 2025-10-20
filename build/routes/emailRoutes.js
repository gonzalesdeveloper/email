"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
class EmailRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/send-mail', emailController_1.emailController.SendEmailWeb);
    }
}
const emailRoutes = new EmailRoutes();
exports.default = emailRoutes.router;
