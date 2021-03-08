import {Organelle} from '../Organelle';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'organelleFilter'
})
export class OrganelleFilterPipe implements PipeTransform {
    transform( organelles: Organelle[], searchTerm: string): Organelle[]{
        if(!organelles||!searchTerm){
            return organelles;
        }
        return organelles.filter(organelle=>
            organelle.organismName.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1 ||
            organelle.accession.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
    }
}