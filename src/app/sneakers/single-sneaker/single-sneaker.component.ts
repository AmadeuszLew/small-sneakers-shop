import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Sneaker} from '../sneaker.model';
import {SizeChart} from '../../shared/models/size-chart.model';

@Component({
  selector: 'app-single-sneaker',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './single-sneaker.component.html',
  styleUrl: './single-sneaker.component.css'
})
export class SingleSneakerComponent implements OnInit {
  mouseOver = false;
  @Input()
  sneaker: Sneaker;

  sizesAvailableInfo: string;

  ngOnInit():void {
    this.sizesAvailableInfo = this.getSizesString(this.sneaker?.sizesAvailable);
  }

  getSizesString(sizes: SizeChart[]){
    const showSizes: number[] = [];
    for (const size of sizes){
      if (size.avability > 0) {
        showSizes.push(size.size);
      }
    }
    return showSizes.length > 3 ? 'Dostępny w wielu rozmiarach' : 'Dostępne rozmiary: ' + showSizes ;
  }
}
