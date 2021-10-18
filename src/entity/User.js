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
var Note_1 = require("./Note");
var bcryptjs_1 = require("bcryptjs");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.hashPassword = function () {
        this.password = bcryptjs_1.hashSync(this.password, 8);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ nullable: false, unique: true }),
        typeorm_1.Generated("uuid")
    ], User.prototype, "uuid");
    __decorate([
        typeorm_1.Column({ nullable: false, unique: true }),
        class_validator_1.MinLength(4, {
            message: 'username-short.'
        }),
        class_validator_1.MaxLength(15, {
            message: 'username-long.'
        })
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column({ nullable: false, unique: true }),
        class_validator_1.IsEmail(undefined, { message: 'email-invalid' })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ nullable: false })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ type: 'date', "default": function () { return "CURRENT_TIMESTAMP"; } })
    ], User.prototype, "createDate");
    __decorate([
        typeorm_1.OneToMany(function () { return Note_1.Note; }, function (note) { return note.user; })
    ], User.prototype, "notes");
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate()
    ], User.prototype, "hashPassword");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
