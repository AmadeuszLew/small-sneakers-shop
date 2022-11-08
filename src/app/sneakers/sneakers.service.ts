import { SizeChart } from "../shared/models/size-chart.model";
import { Sneaker } from "./sneaker.model";
import { BehaviorSubject , Subject} from 'rxjs';

export class SneakserService{
    sneakersChanged= new Subject<Sneaker[]>();
    private sneakers:Sneaker[]=[
        new Sneaker(
            '555088-711',
            'Jordan 1',
            'Taxi',
            'Jordan',
            'TAXI/BLACK-SAIL',
            999,
            'assets/img/list_items/jordan_1_taxi.jpeg',
            [
                new SizeChart(36,1),
                new SizeChart(36.5,4),
                new SizeChart(37,0),
                new SizeChart(37.5,22),
                new SizeChart(38,15),
                new SizeChart(38.5,11),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,3),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,2),
                new SizeChart(44.5,0),
                new SizeChart(45,0),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            'HP7870',
            'Yeezy 350 v2',
            'Slate',
            'Yeezy',
            'Slate',
            999,
            'assets/img/list_items/yeezy_350v2_Salte.jpg',
            [
                new SizeChart(36,1),
                new SizeChart(36.5,4),
                new SizeChart(37,0),
                new SizeChart(37.5,22),
                new SizeChart(38,15),
                new SizeChart(38.5,11),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,3),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,2),
                new SizeChart(44.5,0),
                new SizeChart(45,0),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            'GW6373',
            'Yeezy 500',
            'Granite',
            'Yeezy',
            'Granite',
            999,
            'assets/img/list_items/yeezy_500_granite.jpg',
            [
                new SizeChart(36,0),
                new SizeChart(36.5,0),
                new SizeChart(37,0),
                new SizeChart(37.5,0),
                new SizeChart(38,0),
                new SizeChart(38.5,0),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,0),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,0),
                new SizeChart(44.5,0),
                new SizeChart(45,1),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            'DB2908',
            'Yeezy 500',
            'Blush',
            'Yeezy',
            'Blush',
            999,
            'assets/img/list_items/yeezy_500.png',
            [
                new SizeChart(36,1),
                new SizeChart(36.5,4),
                new SizeChart(37,0),
                new SizeChart(37.5,22),
                new SizeChart(38,15),
                new SizeChart(38.5,11),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,3),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,2),
                new SizeChart(44.5,0),
                new SizeChart(45,0),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            'FZ5897',
            'Yeezy Slide',
            'Bone (2022 restock)',
            'Yeezy',
            'Bone',
            449,
            'assets/img/list_items/slide_bone.jpg',
            [
                new SizeChart(36,1),
                new SizeChart(36.5,4),
                new SizeChart(37,0),
                new SizeChart(37.5,22),
                new SizeChart(38,15),
                new SizeChart(38.5,11),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,3),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,2),
                new SizeChart(44.5,0),
                new SizeChart(45,0),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            'H06426',
            'ADI2000',
            'Yu-Gi-Oh! Blue Eyes White Dragon',
            'Adidas',
            'WHITE/FOOTWEAR WHITE/BOLD BLUE',
            499,
            'assets/img/list_items/adi200.png',
            [
                new SizeChart(36,1),
                new SizeChart(36.5,4),
                new SizeChart(37,0),
                new SizeChart(37.5,2),
                new SizeChart(38,6),
                new SizeChart(38.5,0),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,3),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,2),
                new SizeChart(44.5,4),
                new SizeChart(45,6),
                new SizeChart(45.5,2),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            'DX3722-001',
            'Dunk low',
            'Wolf Grey Pure Platinum',
            'Nike',
            'PURE PLATINUM/WHITE-WOLF GREY',
            899,
            'assets/img/list_items/pure_platinium.jpg',
            [
                new SizeChart(36,1),
                new SizeChart(36.5,4),
                new SizeChart(37,0),
                new SizeChart(37.5,4),
                new SizeChart(38,15),
                new SizeChart(38.5,2),
                new SizeChart(39,12),
                new SizeChart(39.5,0),
                new SizeChart(40,3),
                new SizeChart(40.5,2),
                new SizeChart(41,0),
                new SizeChart(41.5,1),
                new SizeChart(42,4),
                new SizeChart(42.5,1),
                new SizeChart(43,2),
                new SizeChart(43.5,1),
                new SizeChart(44,2),
                new SizeChart(44.5,4),
                new SizeChart(45,0),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        ),
        new Sneaker(
            '304292-601',
            'Dunk low',
            'Pure Blood',
            'Nike',
            'TRUE RED/BLACK',
            6889,
            'assets/img/list_items/pure_blood.jpeg',
            [
                new SizeChart(36,0),
                new SizeChart(36.5,0),
                new SizeChart(37,0),
                new SizeChart(37.5,0),
                new SizeChart(38,0),
                new SizeChart(38.5,0),
                new SizeChart(39,0),
                new SizeChart(39.5,0),
                new SizeChart(40,0),
                new SizeChart(40.5,0),
                new SizeChart(41,0),
                new SizeChart(41.5,0),
                new SizeChart(42,4),
                new SizeChart(42.5,0),
                new SizeChart(43,0),
                new SizeChart(43.5,0),
                new SizeChart(44,0),
                new SizeChart(44.5,0),
                new SizeChart(45,0),
                new SizeChart(45.5,0),
                new SizeChart(46,1),
            ]
        )
    ]
    getAllSneakers(){
        return this.sneakers.slice();
    }
    //getSneaker(id:string){
    getSneaker(id:string){
        return this.sneakers.find(x => x.sku === id)
    }
    printSneakerName(sneaker:Sneaker){
        return sneaker.model+" "+sneaker.name
    }
    filterByModel(model:string){
        let snkrs=this.sneakers.filter((snkrs)=>{
          return snkrs.model.includes(model)
        })
        //this.sneakers=snkrs;
        this.sneakersChanged.next(snkrs)
      }
    filterByBrand(brand:string){
        let snkrs=this.sneakers.filter((snkrs)=>{
          return snkrs.brand.includes(brand)
        })
        this.sneakersChanged.next(snkrs)
      }
}