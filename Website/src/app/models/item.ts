export class item {
    constructor(
        public code: string,
        public userLocation: any,
        public minPrice: number,
        public maxPrice: number,
        public zipcode: string,
        public state: string,
        public distanceRange: number,
        public isInsured: boolean

    ) { 

        this.maxPrice = null;
        this.minPrice = null;
        this.zipcode = null;
        this.state = null;
        this.distanceRange = null;
        this.isInsured = false;
    }
}