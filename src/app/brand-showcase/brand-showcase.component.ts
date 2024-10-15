import { Component } from '@angular/core';

interface Brand {
  name: string;
  logo: string;
  colors: string[];
  values: string[];
}

@Component({
  selector: 'ns-brand-showcase',
  templateUrl: './brand-showcase.component.html',
  styleUrls: ['./brand-showcase.component.css']
})
export class BrandShowcaseComponent {
  brands: Brand[] = [
    { name: 'Adidas', logo: '~/assets/adidas-logo.png', colors: ['#000000', '#FFFFFF'], values: ['Performance', 'Passion', 'Integrity', 'Diversity'] },
    { name: 'Nike', logo: '~/assets/nike-logo.png', colors: ['#F96302', '#FFFFFF'], values: ['Innovation', 'Sustainability', 'Diversity', 'Community'] },
    { name: 'Tesla', logo: '~/assets/tesla-logo.png', colors: ['#CC0000', '#000000'], values: ['Innovation', 'Sustainability', 'Performance', 'Design'] },
    { name: 'Apple', logo: '~/assets/apple-logo.png', colors: ['#999999', '#FFFFFF'], values: ['Innovation', 'Design', 'Privacy', 'Environment'] }
  ];

  currentBrandIndex = 0;

  get currentBrand(): Brand {
    return this.brands[this.currentBrandIndex];
  }

  nextBrand() {
    this.currentBrandIndex = (this.currentBrandIndex + 1) % this.brands.length;
  }

  previousBrand() {
    this.currentBrandIndex = (this.currentBrandIndex - 1 + this.brands.length) % this.brands.length;
  }
}