export class Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string;

    constructor(obj?: Product) {
        this.id = obj ? obj.id : 0;
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.price = obj ? obj.price : 0;
        this.discountPercentage = obj ? obj.discountPercentage : 0;
        this.stock = obj ? obj.stock : 0;
        this.rating = obj ? obj.rating : 0;
        this.brand = obj ? obj.brand : '';
        this.category = obj ? obj.category : '';
        this.thumbnail = obj ? obj.thumbnail : '';
        this.images = obj ? obj.images : '';
    }
}