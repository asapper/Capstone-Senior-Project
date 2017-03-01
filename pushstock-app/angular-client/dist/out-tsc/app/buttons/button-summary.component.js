var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Button } from '/Users/saul/Desktop/201701-PVS02/pushstock-app/express-server/app/models/button.js';
var ButtonSummaryComponent = (function () {
    function ButtonSummaryComponent() {
    }
    return ButtonSummaryComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", typeof (_a = typeof Button !== "undefined" && Button) === "function" && _a || Object)
], ButtonSummaryComponent.prototype, "button", void 0);
ButtonSummaryComponent = __decorate([
    Component({
        selector: 'button-summary',
        styles: ["\n    .jumbotron\n    {\n      text-align: center;\n      display: block;\n      font-size: 80px;\n    }\n    "],
        template: "\n\n    <!-- If a button exists then display the component -->\n    <div class=\"jumbotron\" *ngIf=\"button\">\n      <!-- user icon -->\n      <img src=\"https://start.flic.io/Get%20Started%20_%20Flic_%20The%20Wireless%20Smart%20Button_files/flic-app-icon-a9cf641d7af179844c60eab0f611336acf2edf96b1a95949f45549bbb107f352.png\">\n\n      <!-- Button information -->\n      <h2>\n        Id #: {{ button.buttonId }}<br>\n        MAC Address: {{ button.macAddress }}<br>\n        Description: {{ button.Description }}\n      </h2>\n\n      <!-- Two way databinding:\n           Edit the description of the button -->\n      <input style=\"font-size: 20px\" class=\u201Dform-control\u201D [(ngModel)]=\"button.buttonDescription\">\n    </div>\n  "
    })
], ButtonSummaryComponent);
export { ButtonSummaryComponent };
var _a;
//# sourceMappingURL=../../../../src/app/buttons/button-summary.component.js.map