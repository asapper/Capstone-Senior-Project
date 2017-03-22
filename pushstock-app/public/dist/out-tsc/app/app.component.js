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
        this.API = 'https://localhost:4200/api';
        this.welcomeView = true;
        this.buttonView = false;
        this.workerView = false;
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
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [Http])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map