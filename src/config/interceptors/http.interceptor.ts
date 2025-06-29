import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let endpointApiHeader: string = environment.api.headerName;
    let endpointApiKey: string = environment.api.apiKey;

    const reqWithHeader = req.clone({
        headers: req.headers.set(endpointApiHeader, endpointApiKey),
    });

    return next(reqWithHeader);
}
