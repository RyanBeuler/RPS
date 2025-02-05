import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { DesktopuiComponent } from './desktopui/desktopui.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ROCK PAPER SCISSORS';

  deviceInfo!: DeviceInfo;

  //hook to container for background effect depending on mobile or desktop
  @ViewChild('container', {read: ViewContainerRef, static: true})
  container!: ViewContainerRef;

  //hook to container for background effect depending on mobile or desktop
  @ViewChild('ui', {read: ViewContainerRef, static: true})
  ui!: ViewContainerRef;

  constructor(private deviceDetectorService: DeviceDetectorService) {}

  public ngOnInit(): void {
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    if (this.deviceInfo.deviceType === "mobile") {
      console.log('mobile detected')
    } 
    if (this.deviceInfo.deviceType === "desktop"){
      this.container.createComponent(BackgroundComponent)
      this.ui.createComponent(DesktopuiComponent)
      console.log('desktop detected')
    }
    
  }

  ngAfterViewInit() {
    console.log('>>>bgElement', this.container);
  }

}
