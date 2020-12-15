import {Directive, ElementRef, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';
import {map} from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective implements OnInit {

  constructor(private el: ElementRef, private formControl: NgControl) {
  }

  ngOnInit(): void {
    this.formControl.control.parent.valueChanges
      .pipe(
        map(({a, b, answer}) => Math.abs((a + b - answer) / (a + b)))
      )
      .subscribe((value: any) => {
        value < 0.2 ? (this.el.nativeElement.classList.add('closet')) : (this.el.nativeElement.classList.remove('closet'));
      });
  }

}
