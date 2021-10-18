"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var User_1 = require("./User");
var Note = /** @class */ (function () {
    function Note() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Note.prototype, "id");
    __decorate([
        typeorm_1.Column({ nullable: false, unique: true }),
        typeorm_1.Generated("uuid")
    ], Note.prototype, "uuid");
    __decorate([
        typeorm_1.Column({ nullable: false }),
        class_validator_1.MinLength(10, {
            message: 'Title is too short'
        }),
        class_validator_1.MaxLength(50, {
            message: 'Title is too long'
        })
    ], Note.prototype, "title");
    __decorate([
        typeorm_1.Column({ nullable: false }),
        class_validator_1.MinLength(2, {
            message: 'Content is too short'
        }),
        class_validator_1.MaxLength(256, {
            message: 'Content is too long'
        })
    ], Note.prototype, "content");
    __decorate([
        typeorm_1.Column({ type: 'date', "default": function () { return "CURRENT_TIMESTAMP"; } })
    ], Note.prototype, "createDate");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.notes; }, { nullable: false })
    ], Note.prototype, "user");
    Note = __decorate([
        typeorm_1.Entity()
    ], Note);
    return Note;
}());
exports.Note = Note;
