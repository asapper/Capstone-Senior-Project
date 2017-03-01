var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { Button } from '../shared/models/button';
var ButtonFormComponent = (function () {
    function ButtonFormComponent() {
        this.buttonCreated = new EventEmitter();
        this.newButton = new Button();
        this.testButton = new Button();
        this.active = true;
    }
    ButtonFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.newButton.clickTimestamp = new Date();
        this.buttonCreated.emit({ button: this.newButton });
        this.newButton = new Button();
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    return ButtonFormComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonFormComponent.prototype, "buttonCreated", void 0);
ButtonFormComponent = __decorate([
    Component({
        selector: 'button-form',
        styles: ["\n    form {\n      padding: 10px;\n      background: #ECF0F1;\n      border-radius: 3px;\n      margin-bottom: 30px;\n    }\n  "],
        templateUrl: './button-form.component.html'
    })
], ButtonFormComponent);
export { ButtonFormComponent };
//# sourceMappingURL=../../../../src/app/buttons/button-form.component.js.map