import { Directive , Input } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[appDisablecontroldirective]'
})
export class DisablecontroldirectiveDirective {

  @Input() set appDisablecontroldirective( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
