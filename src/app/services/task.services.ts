import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskServices{

    constructor(private http: Http){
        console.log('Http Services ')
    }

    getTasks(){
        return this.http.get('https://ionwebapi.azurewebsites.net/api/tasks')
        .map((res:Response) => res.json());
        
    }
}
