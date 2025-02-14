import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { isEmpty, Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private auth : AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token != null)
        {
            const headers = new HttpHeaders()
                .append('Authorization', `Bearer ${token}`)
                .append('Content-Type', 'application/json');
            const modifReq = req.clone({ headers });
            console.log('I am the interceptor');
            return next.handle(modifReq);
        }
        else {
            return next.handle(req);
        }

    }

}