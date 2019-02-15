import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Third party imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [CommonModule, FormsModule, NgbModule, SortableHeaderDirective, AutofocusDirective],
  declarations: [SortableHeaderDirective, AutofocusDirective]
})
export class SharedModule { }
