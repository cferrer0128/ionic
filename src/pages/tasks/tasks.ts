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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service:TaskServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage + Services Running', this.service.taskList);
    
  }

  ngOnInit(){
    this.tasks = this.service.taskList;
    
  }

}
