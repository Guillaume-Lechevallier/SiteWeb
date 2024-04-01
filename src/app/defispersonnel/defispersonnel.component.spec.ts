import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefispersonnelComponent } from './defispersonnel.component';

describe('DefispersonnelComponent', () => {
  let component: DefispersonnelComponent;
  let fixture: ComponentFixture<DefispersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefispersonnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefispersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
