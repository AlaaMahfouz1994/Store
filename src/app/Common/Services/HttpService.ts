import { Injectable, OnDestroy, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
    ApiUrl = 'https://fakestoreapi.com/';
    constructor(private HttpClient: HttpClient, ) { }

    Get<T>(endPoint: string) {
        let endPointUrl = this.ApiUrl + endPoint;
        return this.HttpClient.get<T>(endPointUrl);
    }

    Post<T>(endPoint: string, model: any) {
        let endPointUrl = this.ApiUrl + endPoint;
        return this.HttpClient.post<T>(endPointUrl, model);
    }

    Delete<T>(endPoint: string) {
        let endPointUrl = this.ApiUrl + endPoint;
        return this.HttpClient.delete<T>(endPointUrl);
    }

    Put<T>(endPoint: string, model: any) {
        let endPointUrl = this.ApiUrl + endPoint;
        return this.HttpClient.put<T>(endPointUrl, model);
    }

    UploadFileToS3<T>(endPointUrl: string, model: any) {
        return this.HttpClient.put<T>(endPointUrl, model);
    }

    GetWithOptions<T>(endPoint: string, options: any) {
        let endPointUrl = this.ApiUrl + endPoint;
        return this.HttpClient.get<T>(endPointUrl, options);
    }

}