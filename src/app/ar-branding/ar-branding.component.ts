import { Component, OnInit } from '@angular/core';
import { AR, ARMaterial, ARNode, ARPlaneTappedEventData } from '@nativescript/ar';

@Component({
  selector: 'ns-ar-branding',
  templateUrl: './ar-branding.component.html',
  styleUrls: ['./ar-branding.component.css']
})
export class ARBrandingComponent implements OnInit {
  private ar: AR;
  private brands = [
    { name: 'Adidas', logo: '~/assets/adidas-logo.png', colors: ['#000000', '#FFFFFF'], values: ['Performance', 'Passion', 'Integrity', 'Diversity'] },
    { name: 'Nike', logo: '~/assets/nike-logo.png', colors: ['#F96302', '#FFFFFF'], values: ['Innovation', 'Sustainability', 'Diversity', 'Community'] },
    { name: 'Tesla', logo: '~/assets/tesla-logo.png', colors: ['#CC0000', '#000000'], values: ['Innovation', 'Sustainability', 'Performance', 'Design'] },
    { name: 'Apple', logo: '~/assets/apple-logo.png', colors: ['#999999', '#FFFFFF'], values: ['Innovation', 'Design', 'Privacy', 'Environment'] }
  ];

  constructor() {
    this.ar = new AR();
  }

  ngOnInit() {
    this.ar.start().then(() => {
      console.log('AR started');
    }).catch(error => {
      console.error('Error starting AR:', error);
    });

    this.ar.planeTapped.on((args: ARPlaneTappedEventData) => {
      this.showBrandingAR(args.position);
    });
  }

  private showBrandingAR(position: number[]) {
    const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
    
    // Create logo node
    const logoNode = ARNode.createImage(brand.logo);
    logoNode.position = [position[0], position[1] + 0.5, position[2]];
    logoNode.scale = [0.5, 0.5, 0.5];
    this.ar.addNode(logoNode);

    // Create color palette nodes
    brand.colors.forEach((color, index) => {
      const colorNode = ARNode.createSphere(0.1);
      colorNode.position = [position[0] + (index * 0.2), position[1], position[2]];
      colorNode.material = ARMaterial.createColor(color);
      this.ar.addNode(colorNode);
    });

    // Create value text nodes
    brand.values.forEach((value, index) => {
      const textNode = ARNode.createText(value);
      textNode.position = [position[0], position[1] - 0.2 - (index * 0.1), position[2]];
      textNode.scale = [0.1, 0.1, 0.1];
      this.ar.addNode(textNode);
    });
  }
}