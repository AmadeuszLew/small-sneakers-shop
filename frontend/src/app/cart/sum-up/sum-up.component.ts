import { Component, Input} from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-sum-up',
  templateUrl: './sum-up.component.html',
  styleUrls: ['./sum-up.component.css'],
})
export class SumUpComponent {

  constructor(private cartService: CartService) { }
  @Input() grandTotal: number;

}
