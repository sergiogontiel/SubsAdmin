import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirSubscripcionComponent } from './anadir-subscripcion.component';

describe('AnadirSubscripcionComponent', () => {
  let component: AnadirSubscripcionComponent;
  let fixture: ComponentFixture<AnadirSubscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirSubscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirSubscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
