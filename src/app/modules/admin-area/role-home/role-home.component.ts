import { Component, OnInit } from '@angular/core';
import { RoleDto } from 'src/app/models/roleDto';

@Component({
  selector: 'app-role-home',
  templateUrl: './role-home.component.html',
  styleUrls: ['./role-home.component.css']
})
export class RoleHomeComponent implements OnInit {

  constructor() { }

  roleList: RoleDto[] = [];

  ngOnInit(): void {
  }

}
