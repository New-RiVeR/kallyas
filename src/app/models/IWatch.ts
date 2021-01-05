export interface WatchItem {
    id: string;
    name: string;
    description: string;
    price: number;
    country: string;
    countryFlag: string;
    year: number;
    image?: string;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    amount: number;
    image: string;
  }