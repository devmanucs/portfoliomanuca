"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFocusToApi = mapFocusToApi;
exports.mapFocusToDb = mapFocusToDb;
exports.mapStatusToApi = mapStatusToApi;
exports.mapEmploymentToApi = mapEmploymentToApi;
const client_1 = require("@prisma/client");
const focusToApi = {
    DESIGN: 'design',
    DEVELOPMENT: 'development',
    HYBRID: 'hybrid',
};
const focusToDb = {
    design: client_1.ProjectFocus.DESIGN,
    development: client_1.ProjectFocus.DEVELOPMENT,
    hybrid: client_1.ProjectFocus.HYBRID,
};
function mapFocusToApi(focus) {
    return focusToApi[focus];
}
function mapFocusToDb(focus) {
    return focusToDb[focus];
}
function mapStatusToApi(status) {
    return status;
}
function mapEmploymentToApi(type) {
    return type;
}
//# sourceMappingURL=enum.mappers.js.map