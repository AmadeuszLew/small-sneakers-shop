import { SizeChart } from '../shared/models/size-chart.model';

export class Sneaker {
  public sku: string;
  public model: string;
  public name: string;
  public brand: string;
  public colorway: string;
  public price: number;
  public imagePath: string;
  public sizesAvailable: SizeChart[];
  public onSale?: boolean

  constructor(sku: string, model: string, name: string, brand: string, colorway: string,
              price: number, imagePath: string, sizesAvailable: SizeChart[], onSale: boolean) {
    this.sku = sku;
    this.model = model;
    this.name = name;
    this.brand = brand;
    this.colorway = colorway;
    this.price = price;
    this.imagePath = imagePath;
    this.sizesAvailable = sizesAvailable;
    this.onSale = onSale;
  }
}
