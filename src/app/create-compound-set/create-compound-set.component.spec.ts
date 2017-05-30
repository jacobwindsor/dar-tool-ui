import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompoundSetComponent } from './create-compound-set.component';

describe('CreateCompoundSetComponent', () => {
  let component: CreateCompoundSetComponent;
  let fixture: ComponentFixture<CreateCompoundSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompoundSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompoundSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
