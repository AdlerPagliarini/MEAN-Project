import { FundamentalService } from './../../services/fundamental.service';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'fundamentals',
  templateUrl: './fundamentals.component.html'
})

export class FundamentalsComponent implements OnInit {
    code:string;
    name:string;
    age:number;
    email:string;
    address:Address;
    hobbies:string[];
    hello:any;
    posts:Post[];
    isEdit:boolean = false;
  
    constructor(private dataService:FundamentalService) {
      console.log('constructor ran..');
  
    }
  
    ngOnInit() {
      console.log('ngOnInit ran...');
      this.code = "</>";
      this.name = 'Adler Pagliarini';
      this.email = 'test@test.com';
      this.age = 26;
      this.address = {
        street:'1234 Main st',
        city: 'SP',
        state:'SP'
      }
      this.hobbies = ['Write code', 'Workout', 'Watch movies', 'Listen to music'];
      this.hello ='hello';
  
      this.dataService.getPosts().subscribe((posts) => {
        //console.log(posts);
        this.posts = posts;
      });
    }
  
    onClick(){
      this.name='Brad Traversy';
      this.hobbies.push('New Hobby');
    }
  
    addHobby(hobby){
      console.log(hobby);
      this.hobbies.unshift(hobby);
      return false;
    }
  
    deleteHobby(i){
      this.hobbies.splice(i, 1);
    }
  
    toggleEdit(){
      this.isEdit = !this.isEdit;
    }
  
  }
    
  interface Address{
    street:string,
    city:string,
    state:string
  }
  
  interface Post{
    id: number,
    title:string,
    body:string,
    userId:number
  }