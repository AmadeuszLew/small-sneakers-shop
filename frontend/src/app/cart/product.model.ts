export class Product {
  public sku: string;
  public model: string;
  public name: string;
  public brand: string;
  public colorway: string;
  public price: number;
  public imagePath: string;
  public size: number;

  constructor(sku: string, model: string, name: string, brand: string, colorway: string, price: number, imagePath: string, size: number) {
    this.sku = sku;
    this.model = model;
    this.name = name;
    this.brand = brand;
    this.colorway = colorway;
    this.price = price;
    this.imagePath = imagePath;
    this.size = size;
  }
}
