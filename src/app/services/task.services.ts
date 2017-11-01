import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskServices{

 
    constructor(private http: Http){
        console.log('Http Services ')
    }

    setHeaders(verb: string) {
        let headers =  new Headers();
        let digest = window["digest"];
       // console.log('Disgest..!!! ', digest);
        //if ( document.getElementById('__REQUESTDIGEST')) {digest = document.getElementById('__REQUESTDIGEST').innerHTML;}

            if(verb.length>0)
                headers.set('Accept', 'application/xml;odata=verbose');
            else headers.set('Accept', 'application/json;odata=verbose');

            headers.set('X-RequestDigest', digest);
            headers.set('Access-Control-Allow-Origin', '*');

            switch (verb) {
            case 'POST':
                headers.set('Content-type', 'application/json;odata=verbose');
                break;
            case 'PUT':
                headers.set('Content-type', 'application/json;odata=verbose');
                headers.set('IF-MATCH', '*');
                headers.set('X-HTTP-Method', 'MERGE');
                break;
            case 'DELETE':
                headers.set('IF-MATCH', '*');
                headers.set('X-HTTP-Method', 'DELETE');
                break;
        }

        return headers;
     }
    getTasks(){
        return this.http.get('/api/tasks', { headers: this.setHeaders('') })
        .map((res:Response) => res.json());
        
    }
}
