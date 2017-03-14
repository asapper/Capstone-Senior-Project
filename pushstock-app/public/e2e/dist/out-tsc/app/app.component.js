var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = 'app works!';
        this.API = 'http://localhost:3000/api';
        this.buttons = [];
        this.welcomeView = true;
        this.buttonView = false;
        this.workerView = false;
        this.buttonActive = false;
    }
    AppComponent.prototype.changeToHomeView = function () {
        this.welcomeView = true;
        this.buttonView = false;
        this.workerView = false;
    };
    AppComponent.prototype.changeToButtonView = function () {
        this.welcomeView = false;
        this.buttonView = true;
        this.workerView = false;
    };
    AppComponent.prototype.changeToWorkerView = function () {
        this.welcomeView = false;
        this.buttonView = false;
        this.workerView = true;
    };
    AppComponent.prototype.setTrue = function () {
        this.buttonActive = true;
        console.log("set buttonActive to true");
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getAllButtons();
    };
    AppComponent.prototype.onButtonCreated = function (buttonId, clickTimestamp, buttonDescription) {
        var _this = this;
        this.http.post(this.API + "/addButton", { buttonId: buttonId, clickTimestamp: clickTimestamp, buttonDescription: buttonDescription })
            .map(function (res) { return res.json(); })
            .subscribe(function () {
            _this.getAllButtons();
        });
        console.log("button added");
    };
    AppComponent.prototype.getAllButtons = function () {
        var _this = this;
        this.http.get(this.API + "/buttons")
            .map(function (res) { return res.json(); })
            .subscribe(function (buttons) {
            console.log(buttons);
            _this.buttons = buttons;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [Http])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map