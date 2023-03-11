import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Env {

}

@Injectable()
export class AppConfig {


    constructor(private HttpClient: HttpClient) { }


}