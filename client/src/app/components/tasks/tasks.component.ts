import { Component } from '@angular/core';
import { TaskService } from './../../services/task.service';
import { Task } from '../../../model/Task';


@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent { 
  
  tasks: Task[];
  title: string;
  
  constructor(private taskService:TaskService){
      this.taskService.getTasks()
          .subscribe(tasks => {
              console.log(tasks);
              this.tasks = tasks;
              this.title = "New task...";
          });
  }
  
  addTask(event){
    event.preventDefault();
    var newTask = {
        title: this.title,
        isDone: false
    }
    
    this.taskService.addTask(newTask)
        .subscribe(task => {
            console.log(task);
            this.tasks.push(task);
            this.title = '';
        });
  }

  deleteTask(id){
    var tasks = this.tasks;
    
    this.taskService.deleteTask(id).subscribe(data => {
        console.log(data);
        if(data.n == 1){
            for(var i = 0;i < tasks.length;i++){
                if(tasks[i]._id == id){
                    tasks.splice(i, 1);
                }
            }
        }
    });
  }

  updateStatus(task){
    console.log(task);
    var _task = {
        _id:task._id,
        title: task.title,
        isDone: !task.isDone
    };
    
    this.taskService.updateStatus(_task).subscribe(data => {
        console.log(data);
        task.isDone = !task.isDone;
    });
  }
  
  
}
