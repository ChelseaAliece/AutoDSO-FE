import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodsoComponent } from './autodso.component';

describe('AutodsoComponent', () => {
  let component: AutodsoComponent;
  let fixture: ComponentFixture<AutodsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
