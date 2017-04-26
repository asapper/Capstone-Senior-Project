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
    private alert: Alert = new Alert();

    // set latest button alert
    setAlert(alert: Alert) {
        this.alert = alert;
    }

    // get latest button alert
    getLatestAlert() {
        // store alert
        let alert = this.alert;
        // clear alert
        this.alert = new Alert();
        return alert;
    }

    setSuccessAlert(title: string, message: string) {
        this.alert.type = 'alert-success';
        this.alert.title = title;
        this.alert.message = message;
    }

}
