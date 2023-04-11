import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  //@Input() customImg: string = ''

  // Para cargar Imagen Default en caso de no encontrar la imagen
  @HostListener('error') handleError(): void {
    const elemNative = this.elemHost.nativeElement
    console.log('Imagen no encontrada', this.elemHost)
    elemNative.src = '../../../assets/image/songappx512.png'
  }

  constructor(private elemHost: ElementRef) {

  }

}
