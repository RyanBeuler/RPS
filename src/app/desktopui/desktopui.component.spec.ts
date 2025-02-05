import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopuiComponent } from './desktopui.component';

describe('DesktopuiComponent', () => {
  let component: DesktopuiComponent;
  let fixture: ComponentFixture<DesktopuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopuiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
