import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isConnected() { // mock
        return of(true)
    }
}