import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocomplementaireComponent } from './infocomplementaire.component';

describe('InfocomplementaireComponent', () => {
  let component: InfocomplementaireComponent;
  let fixture: ComponentFixture<InfocomplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfocomplementaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfocomplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
