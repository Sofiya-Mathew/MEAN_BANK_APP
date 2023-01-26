import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  @Input() item: string | undefined;
  @Output() onCancel=new EventEmitter()
  @Output() onDelete=new EventEmitter()
  //@inpput -decorator used to hold data from parent(dashboard)
  //item will send  to parent (property binding[item]='acno)-dashboard html page


  constructor() {}

  ngOnInit(): void {}

  cancel() {
    this.onCancel.emit();
  }
  delete(){
    this.onDelete.emit(this.item)//item=acno
  }
}
