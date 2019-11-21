export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public image?: Image,
    public price?: number,
    public currency?: string,
    public storeName?: string,
    public storeId?: string,
      ) {}
}

interface Image {
   title: string;
   alt: string;
   src: string;
}