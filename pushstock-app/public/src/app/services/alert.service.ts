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
        let alert = this.alert; // store alert
        this.alert = new Alert(); // clear alert
        return alert;
    }

    // set alert to success type, assign given fields
    setSuccessAlert(message: string) {
        this.alert.type = 'alert-success';
        this.alert.title = 'Success!';
        this.alert.message = message;
    }

    // set alert to error type, assign given fields
    setErrorAlert(message: string) {
        this.alert.type = 'alert-danger';
        this.alert.title = 'Error:';
        this.alert.message = message;
    }

    // handle response, determine type of alert
    handleApiResponse(res: any) {
        if (res.message) {
            this.setSuccessAlert(res.message);
        } else if (res.error) {
            this.setErrorAlert(res.error);
        }
    }

}
