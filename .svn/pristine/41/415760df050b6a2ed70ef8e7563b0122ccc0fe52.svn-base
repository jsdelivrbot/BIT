import {Injectable, Pipe} from '@angular/core';

/*
 Generated class for the Conversion pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'nameReplace'
})
@Injectable()
export class nameReplace {
    transform(str: string):string {
        if(str.length>5)str=str.substring(0,4);
        return str
    }
}
