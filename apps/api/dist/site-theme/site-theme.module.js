"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteThemeModule = void 0;
const common_1 = require("@nestjs/common");
const site_theme_controller_1 = require("./site-theme.controller");
const site_theme_service_1 = require("./site-theme.service");
let SiteThemeModule = class SiteThemeModule {
};
exports.SiteThemeModule = SiteThemeModule;
exports.SiteThemeModule = SiteThemeModule = __decorate([
    (0, common_1.Module)({
        controllers: [site_theme_controller_1.SiteThemeController],
        providers: [site_theme_service_1.SiteThemeService],
        exports: [site_theme_service_1.SiteThemeService],
    })
], SiteThemeModule);
//# sourceMappingURL=site-theme.module.js.map