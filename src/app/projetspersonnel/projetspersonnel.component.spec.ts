import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetspersonnelComponent } from './projetspersonnel.component';

describe('ProjetspersonnelComponent', () => {
  let component: ProjetspersonnelComponent;
  let fixture: ComponentFixture<ProjetspersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetspersonnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetspersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
