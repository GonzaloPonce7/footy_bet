import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab11Page } from './tab11.page';

describe('Tab11Page', () => {
  let component: Tab11Page;
  let fixture: ComponentFixture<Tab11Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab11Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab11Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
