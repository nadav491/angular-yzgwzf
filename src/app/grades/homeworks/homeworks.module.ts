import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeWorksComponent } from '@app/grades/homeworks/homeworks.component';
import { HomeWorksRoutingModule } from '@app/grades/homeworks/homeworks-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, HomeWorksRoutingModule],
  declarations: [HomeWorksComponent]
})
export class HomeWorksModule {}
