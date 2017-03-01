import { Component } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    // Link to our api, pointing to localhost
    API = 'http://localhost:3000/api';

    // empty list of buttons
    buttons: any[] = [];

    constructor(private http: Http) {}

    // Angular 2 Life Cycle event whem component has been initialized
    ngOnInit() {
        this.getAllButtons();
    }

    // get all buttons from the API
    getAllButtons() {
        this.http.get(`${this.API}/buttons`)
            .map(res => res.json())
            .subscribe(buttons => {
                console.log(buttons);
                this.buttons = buttons;
            })
    }
}
