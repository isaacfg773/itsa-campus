import { ComponentFixture, TestBed } from '@angular/core/testing';

import { horarios.component } from './horarios.component';

describe('Horarios', () => {
  let component: Horarios;
  let fixture: ComponentFixture<Horarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Horarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Horarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
