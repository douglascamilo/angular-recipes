import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  private BOOTSTRAP_SHOW_CLASS = 'show';
  private dropdownMenu: HTMLElement;
  private isOpen = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
  }

  @HostListener('click')
  onClick(): void {
    this.isOpen = !this.isOpen;
    this.renderer.removeClass(this.dropdownMenu, this.BOOTSTRAP_SHOW_CLASS);

    if (this.isOpen) {
      this.renderer.addClass(this.dropdownMenu, this.BOOTSTRAP_SHOW_CLASS);
    }
  }
}
