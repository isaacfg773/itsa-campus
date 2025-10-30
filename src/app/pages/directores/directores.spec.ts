import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Directores } from './directores';

describe('Directores', () => {
  let component: Directores;
  let fixture: ComponentFixture<Directores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Directores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Directores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
