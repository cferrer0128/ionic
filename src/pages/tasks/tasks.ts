import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TaskServices } from '../../app/services/task.services';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage implements OnInit {

  public tasks:any;
  public Title:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service:TaskServices) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TasksPage + Services Running', this.service.taskList);
    
  }

  ngOnInit(){
    this.tasks = this.service.taskList;

    setInterval(() => {
      this.service.getTasks()
      .subscribe(data =>{
        //console.log('refreshed data ', this.service.taskList);
        this.tasks = this.service.taskList
      })
    }, 5000);
    
  }
  onetask:any;
  //Intervals
  

  //adding task
  addTask(){

      var newTask = {
        Title:this.Title,
        isdeleted:false
      }

      this.service.addTask(newTask)
      .then(data =>{
          console.log(' task added... ' + JSON.stringify(data));
          this.Title = "";
          
      })
      .then(data =>{
        this.service.getTasks()
          .subscribe(newdata =>{
            this.tasks = this.service.taskList;
          })
      })

  }
  //delete task...
  deleteTask(task){
    task.isdeleted = true;
    this.onetask = task;
        this.service.deleteTask(task)
        .subscribe(data =>{
          //console.log('Delete task... ' + JSON.stringify(data));

          for(var i=0; i<this.tasks.length;i++){
                if(this.tasks[i]._id == this.onetask._id){
                    
                    console.log('Delete task... ' + JSON.stringify(this.tasks[i]))
         
                         this.tasks.splice(i,1);
                }
                   
          }
            
                
        })

}

}