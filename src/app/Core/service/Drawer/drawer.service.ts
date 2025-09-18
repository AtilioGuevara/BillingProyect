import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

export interface DrawerConfig {
  title?: string;
  content?: string;
  footer?: boolean;
  position?: string;
  footerClass?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private drawerRef: ComponentRef<any> | null = null;
  private backdropPlayer: AnimationPlayer | null = null;

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private animationBuilder: AnimationBuilder
  ) { }

  open(component: Type<any>, config: DrawerConfig) {
    if (this.drawerRef) {
      this.close();
    }

    const factory = this.cfr.resolveComponentFactory(component);
    this.drawerRef = factory.create(this.injector);

    this.drawerRef.instance.config = {
      ...config,
      isOpen: true
    };

    this.appRef.attachView(this.drawerRef.hostView);
    const domElem = (this.drawerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop-overlay backdrop-blur-xs';
    backdrop.id = 'drawerBackdropDiv';
    backdrop.addEventListener('click', () => this.close());

    document.body.appendChild(backdrop);

    const fadeInBackdropAnimation = this.animationBuilder.build([
      style({ opacity: 0 }),
      animate('300ms ease-in', style({ opacity: 1 }))
    ]);
    this.backdropPlayer = fadeInBackdropAnimation.create(backdrop);
    this.backdropPlayer.play();
  }

  close(result: any = null) {
    if (this.drawerRef) {
      const fadeOutAnimation = this.animationBuilder.build([
        style({ opacity: 1 }),
        animate('50ms ease-out', style({ opacity: 0 }))
      ]);

      const modalPlayer = fadeOutAnimation.create(this.drawerRef.location.nativeElement);
      modalPlayer.onDone(() => {
        this.appRef.detachView(this.drawerRef!.hostView);
        this.drawerRef!.destroy();
        this.drawerRef = null;

        document.body.removeChild(document.getElementById('drawerBackdropDiv')!);
      });
      modalPlayer.play();
    }
  }
}
