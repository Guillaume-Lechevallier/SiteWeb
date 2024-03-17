import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApropodemoiComponent } from './apropodemoi.component';

describe('ApropodemoiComponent', () => {
  let component: ApropodemoiComponent;
  let fixture: ComponentFixture<ApropodemoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApropodemoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApropodemoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
