import {AbstractControl} from "@angular/forms";
export function noCharacterValidator(control: AbstractControl) {
    if (control.value.keyCode != 46 && control.value.keyCode > 31 
      && (control.value.keyCode < 48 || control.value.keyCode > 57)){
        return null ;

      }
      return{'character':false}
  
    
  }