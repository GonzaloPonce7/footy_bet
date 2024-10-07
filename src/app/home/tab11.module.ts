import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab11Page } from './tab11.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab11PageRoutingModule } from './tab11-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab11PageRoutingModule
  ],
  declarations: [Tab11Page]
})
export class Tab11PageModule {}
