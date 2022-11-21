import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { AuthService } from '../auth/auth.service';
import { user } from 'app/mock-api/common/user/data';
import { environment } from 'environments/environment';

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

        //return this._httpClient.get<User>('http://localhost:8000/v1/auth/login').pipe(
        //    tap((user) => {
        //        this._user.next(user);
        //    })
        //);

        console.log("Ingresé al get del usuario");

        return this._httpClient.post<User>(`${environment.serverUrl}/login/me`,{id:localStorage.getItem("userId")}).pipe(
            tap((res:any) => {
                console.log("Este es el valor del me", res);
                this._user.next(res);
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
    update(user: User): Observable<any>
    {

        const nombreQuery = 'me';
        const queryParams = `search: " " `;
        const queryProps = 'id,name,email, avatar';

        //return this._httpClient.patch<User>('api/common/user', {user}).pipe(
        //    map((response) => {
        //        this._user.next(response);
        //        console.log(this._user);
        //    })
        //);

        return this._httpClient.get<User>(`${environment.serverUrl}/graphql/secret?query=query{${nombreQuery}(${queryParams}){${queryProps}}}`).pipe(
            map((response:any) => {
                this._user.next(response.data.me);
                console.log("Este es el usuario desde el servicio",response.data.me);
            })
        );
    }
}
