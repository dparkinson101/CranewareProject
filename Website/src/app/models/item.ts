export class item {
    constructor(
        public code: string,
        public userLocation: any,
        public minPrice: number,
        public maxPrice: number,
        public zipcode: string,
        public state: string
    ) { 

        this.maxPrice = null;
        this.minPrice = null;
        this.zipcode = null;
        this.state = null;
    }
}