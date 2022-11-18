import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { AuthService } from '../auth/auth.service';
import { user } from 'app/mock-api/common/user/data';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    currentUser: User;
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value

        this._user.next(value);
        

    }

    get user$(): Observable<User>
    {
        console.log("Entré al get $User");
        this.currentUser = user;

        this.cacheValue('current_user', user);
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {

        return this._httpClient.get<User>('http://localhost:8000/v1/auth/login').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }


    public setUser(user: User) {
        this.currentUser = user;

        this.cacheValue('current_user', user);
    }


    private cacheValue(index: string, value: any) {
        localStorage.setItem(index, JSON.stringify(value));
    }


    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>///http://localhost:8000/graphql/secret?query=query{me{id,name,email}}
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
                console.log(this._user);
            })
        );
    }
}
