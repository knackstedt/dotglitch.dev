import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry, catchError, delay, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class Fetch {
    constructor(private http: HttpClient) { }

    // Public interface for making AJAX transactions
    public get<T>(url: string, options: any = {}): Promise<T> {
        return this.request<T>("get", url, options);
    }
    public put<T>(url: string, body: any, options: any = {}): Promise<T> {
        options.body = (options.body && Object.keys(options.body).length > 0 ? options.body : body) || {};
        return this.request<T>("put", url, options);
    }
    public post<T>(url: string, body: any, options: any = {}): Promise<T> {
        options.body = (options.body && Object.keys(options.body).length > 0 ? options.body : body) || {};
        return this.request<T>("post", url, options);
    }
    public delete<T>(url: string, options: any = {}): Promise<T> {
        return this.request<T>("delete", url, options);
    }

    // Internally, handle the observable as a promise.
    private request<T>(method: string, url: string, options): Promise<T> {
        options.reportProgress = true;

        // Allow support for different response types.
        // Generally we shouldn't need this to be anything other than JSON.
        options.responseType = options.responseType || "json";
        options.withCredentials = true;

        const p = new Promise((resolve, reject) => {
            const o = this.http.request(method, url, options)
                .pipe(retry({
                    delay(error, retryCount) {
                        if (error.status == 429 || error.status == 500)
                            return of({});
                        throw error;
                    },
                    count: 2
                }), catchError(err => {
                    return of(null);
                }))
                .subscribe(data => {
                    resolve(data as unknown as T);
                });
        });

        return p as Promise<T>;
    }
}
