import { Directive, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appFor]",
})
export class ForDirective implements OnInit {

  @Input("appForEm")
  numbers: number[] | undefined;
  
  @Input("appForUsando")
  texto: string[] | undefined;

  constructor() {}
  ngOnInit():void {
    console.log(this.numbers);
    console.log(this.texto);
  }
}
