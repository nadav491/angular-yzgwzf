import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './labs.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, LabsRoutingModule],
  declarations: [LabsComponent]
})
export class LabsModule {}
