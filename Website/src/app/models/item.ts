export class item {
    constructor(
        public code: string,
        public userLocation: any,
        public minPrice: number,
        public maxPrice: number
      
    ) { 

        this.maxPrice = null;
        this.minPrice = null;
    }
}