import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { inject, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';

export interface DrawerConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private overlay = inject(Overlay);

  open(template: TemplateRef<any>, viewContainerRef: ViewContainerRef, config?: DrawerConfig) {
    const drawerRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global(),
    });

    const portal = new TemplatePortal(template, viewContainerRef, {
      config,
      drawerRef
    });

    drawerRef.attach(portal);

    drawerRef.backdropClick().subscribe(() => {
      drawerRef.detach();
      drawerRef.dispose();
    });

    return drawerRef
  }
}
