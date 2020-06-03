import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreateDialogComponent } from './room-create-dialog.component';

describe('RoomCreateDialogComponent', () => {
  let component: RoomCreateDialogComponent;
  let fixture: ComponentFixture<RoomCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
