import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  private BOOTSTRAP_SHOW_CLASS = 'show';
  private BOOTSTRAP_DROPDOWN_MENU_CLASS = '.dropdown-menu';
  private dropdownMenu: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit(): void {
    this.dropdownMenu = this.elementRef.nativeElement.querySelector(this.BOOTSTRAP_DROPDOWN_MENU_CLASS);
  }

  @HostListener('document:click', ['$event.target.parentElement'])
  public onClick(parentElement: HTMLElement): void {
    const shouldOpen = this.shouldOpenDropdownMenu(parentElement);
    this.renderer.removeClass(this.dropdownMenu, this.BOOTSTRAP_SHOW_CLASS);

    if (shouldOpen) {
      this.renderer.addClass(this.dropdownMenu, this.BOOTSTRAP_SHOW_CLASS);
    }
  }

  private shouldOpenDropdownMenu(parentElement: HTMLElement): boolean {
    const dropdownMenuElement: HTMLElement = parentElement?.isEqualNode(this.elementRef.nativeElement) ?
      parentElement.querySelector(this.BOOTSTRAP_DROPDOWN_MENU_CLASS) : null;

    return dropdownMenuElement ? !dropdownMenuElement.classList.contains(this.BOOTSTRAP_SHOW_CLASS) : false;
  }
}
