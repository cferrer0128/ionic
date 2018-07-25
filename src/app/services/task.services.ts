import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskServices{

    public taskList:any;

    private domain:string='https://u9avc8h706.execute-api.us-east-2.amazonaws.com/dev/';
    
    constructor(private http: Http){
        //console.log('Http Services....!')
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
   
    //getTasks
    getTasks(){
       
        return this.http.get(this.domain)
            .map(res => res.json());
        
    }
    //delete
    deleteTask(task){
        
         task.isdeleted = true;
         
         var headers = new Headers();
         headers.append('Content-Type','application/json');
         
         return this.http.delete(this.domain+task._id,{headers:headers})
             .map(res => res.json());
     }

    //addTask
    addTask(newTask){
        var headers = new Headers();
        
        headers.append('Content-Type','application/json');
        return this.http.post(this.domain,JSON.stringify(newTask),{headers:headers})
        .map(res => res.json())
        .toPromise();
    }

    //addTask
    addLocation(newLocation){
        var headers = new Headers();
        
        headers.append('Content-Type','application/json');
        return this.http.post(this.domain,JSON.stringify(newLocation),{headers:headers})
        .map(res => res.json())
        .toPromise();
    }

}
