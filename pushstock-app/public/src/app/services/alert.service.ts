/*
 * File: alert.service.ts
 * Description: provides information to display in alerts.
 *
 * Edit history:
 *
 * Editor		Date			Description
 * ======		========		===========
 * Sapper		04/01/17		File created
 */

import { Injectable } from '@angular/core';

import { Alert } from '../shared/models/alert';


@Injectable()
export class AlertService {
    private buttonAlert: Alert = new Alert();
    private taskAlert: Alert = new Alert();

    // set latest button alert
    setButtonAlert(alert: Alert) {
        this.buttonAlert = alert;
    }

    // get latest button alert
    getLatestButtonAlert() {
        // store alert
        let alert = this.buttonAlert;
        // clear alert
        this.buttonAlert = new Alert();
        return alert;
    }

    // set latest task alert
    setTaskAlert(alert: Alert) {
        this.taskAlert = alert;
    }

    // get latest task alert
    getLatestTaskAlert() {
        // store alert
        let alert = this.taskAlert;
        // clear alert
        this.taskAlert = new Alert();
        return alert;
    }

}
