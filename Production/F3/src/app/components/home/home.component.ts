import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public productList: any;

  public ngOnInit(): void {
    this.productList = [
      {
        id: 1,
        name: 'Fertilizer1',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        price: 100,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
      {
        id: 2,
        name: 'Fertilizer2',
        description:
          'Another product description goes here.',
        price: 150,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
      {
        id: 3,
        name: 'Fertilizer3',
        description:
          'Another product description goes here.',
        price: 200,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
      {
        id: 4,
        name: 'Fertilizer4',
        description:
          'Another product description goes here.',
        price: 250,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
      {
        id: 5,
        name: 'Fertilizer2',
        description:
          'Another product description goes here.',
        price: 150,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
      {
        id: 6,
        name: 'Fertilizer3',
        description:
          'Another product description goes here.',
        price: 200,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
      {
        id: 7,
        name: 'Fertilizer4',
        description:
          'Another product description goes here.',
        price: 250,
        image: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      },
    ];
  }
}
