import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../../../../../layouts/page-title/page-title.component';
import { register } from 'swiper/element';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ModalService } from '../../../../../../Core/service/modal/modal.service';
import { DomixPaginationComponent } from '../../../../../../componate/domix-pagination/domix-pagination.component';
import { DomixDropdownModule } from '../../../../../../module/domix dropdown/domix-dropdown.module';
import { AddEditReviewComponent } from './add-edit-review/add-edit-review.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModalComponent } from '../../../../../../componate/domix-delet-model/delete-modal/delete-modal.component';

@Component({
    selector: 'app-apps-ecommerce-product-overview',
    imports: [PageTitleComponent, CommonModule, LucideAngularModule, DomixPaginationComponent, DomixDropdownModule],
    templateUrl: './apps-ecommerce-product-overview.component.html',
    styleUrl: './apps-ecommerce-product-overview.component.scss'
})
export class AppsEcommerceProductOverviewComponent {
  constructor(private modalService: ModalService, private activatedRoute: ActivatedRoute, private router: Router) { }
  @ViewChild('paginationDynamicSlider') paginationDynamicSliderContainer!: ElementRef;
  @ViewChild('paginationContain') paginationContain!: ElementRef;

  productName = 'Collection Ruffled Cotton Top';
  rating = 4.8;
  reviews = 149;
  sales = 4789;
  basePrice = 100; // Example base price
  discount = 0.5; // 50% discount
  count = 1;
  discountPercent = 50;
  showMore = false;
  showMoreD = false;
  productId: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  showingStart: number = 1;
  showingEnd: number = 0;


  displayReview: any
  filterdReview: any


  colors = [
    { code: 'bg-blue-500', active: true }, // Blue
    { code: 'bg-gray-300', active: false }, // Gray
    { code: 'bg-pink-500', active: false }, // Pink
    { code: 'bg-green-500', active: false }, // Green
    { code: 'bg-red-500', active: false }  // Red
  ];

  sizes = [
    { label: 'S', active: false },
    { label: 'M', active: true },
    { label: 'L', active: false },
    { label: 'XL', active: false },
    { label: '2XL', active: false }
  ];

  offers = [
    { title: 'Bank Offer', description: 'Get ₹50 instant discount on first Domiex UPI txn on order of ₹200 and above' },
    { title: 'Bank Offer', description: '5% Cashback on Domiex Axis Bank Card' },
    { title: 'Special Price', description: 'Get extra ₹7000 off (price inclusive of cashback/coupon)' },
    { title: 'Freebie', description: 'Flat ₹1000 off on Cleartrip hotels booking along with 300 coins on booking' },
    { title: 'Special Discount', description: 'Get a 10% off on purchase of 2 or more items' }
  ];

  productDetails = [
    { label: 'Neck', value: 'U Neck' },
    { label: 'Sleeve Style', value: 'Sleeveless' },
    { label: 'Sleeve Length', value: 'Long sleeve' },
    { label: 'Fabric', value: 'Linen' },
    { label: 'Pattern', value: 'Plain' },
    { label: 'Fit', value: 'Oversize' },
    { label: 'Occasion', value: 'Party wear' },
  ];

  review = [
    {
      "image": "assets/images/avatar/user-1.png",
      "userName": "John Doe",
      "location": "New York",
      "star": "4.5",
      "date": "24 May, 2024",
      "title": "Code Quality",
      "content": "Was a really good move to add this as part of our project, we had great comments from the business regarding design and user experience. Install with no dependency issues or deprecated packages and was really good overall."
    },
    {
      "image": "assets/images/avatar/user-2.png",
      "userName": "Jane Smith",
      "location": "Los Angeles",
      "star": "5",
      "date": "22 May, 2024",
      "title": "Documentation Quality",
      "content": "Excellent product! Exceeded all my expectations. Highly recommend to anyone looking for quality."
    },
    {
      "image": "assets/images/avatar/user-3.png",
      "userName": "Michael Brown",
      "location": "Chicago",
      "star": "3.5",
      "date": "20 May, 2024",
      "title": "Design Quality",
      "content": "The product is decent but has some room for improvement. The installation was smooth, but some features were a bit underwhelming."
    },
    {
      "image": "assets/images/avatar/user-4.png",
      "userName": "Emily Davis",
      "location": "Houston",
      "star": "2",
      "date": "18 May, 2024",
      "title": "Flexibility",
      "content": "Not very satisfied with the product. It did not meet my expectations and had several issues during installation."
    },
    {
      "image": "assets/images/avatar/user-5.png",
      "userName": "Chris Wilson",
      "location": "Phoenix",
      "star": "4",
      "date": "15 May, 2024",
      "title": "Code Quality",
      "content": "Good product overall, but there are a few bugs that need to be addressed. Customer support was helpful in resolving some issues."
    },
    {
      "image": "assets/images/avatar/user-6.png",
      "userName": "Sarah Lee",
      "location": "San Francisco",
      "star": "4.5",
      "date": "12 May, 2024",
      "title": "Customizability",
      "content": "Great product with excellent features. The user interface is very intuitive and easy to navigate."
    },
    {
      "image": "assets/images/avatar/user-7.png",
      "userName": "David Johnson",
      "location": "Miami",
      "star": "3.5",
      "date": "10 May, 2024",
      "title": "Code Quality",
      "content": "The product is average. It works as expected but lacks some advanced features that competitors offer."
    },
    {
      "image": "assets/images/avatar/user-8.png",
      "userName": "Nancy Adams",
      "location": "Seattle",
      "star": "4.5",
      "date": "8 May, 2024",
      "title": "Design Quality",
      "content": "Had some issues with the product initially, but customer support was able to help resolve them. Still, it's not as seamless as I hoped."
    },
    {
      "image": "assets/images/avatar/user-9.png",
      "userName": "Paul White",
      "location": "Boston",
      "star": "3.5",
      "date": "5 May, 2024",
      "title": "Feature Availability",
      "content": "The product did not meet my expectations at all. It was difficult to install and had many bugs."
    },
    {
      "image": "assets/images/avatar/user-10.png",
      "userName": "Lisa Green",
      "location": "Denver",
      "star": "5",
      "date": "3 May, 2024",
      "title": "Design Quality",
      "content": "Absolutely fantastic product! It has all the features I need and works flawlessly."
    },
    {
      "image": "assets/images/avatar/user-11.png",
      "userName": "James Clark",
      "location": "Atlanta",
      "star": "5",
      "date": "1 May, 2024",
      "title": "Feature Availability",
      "content": "Overall, I'm happy with the product. It performs well and has a good range of features."
    },
    {
      "image": "assets/images/avatar/user-12.png",
      "userName": "Patricia Martinez",
      "location": "Dallas",
      "star": "4.5",
      "date": "28 April, 2024",
      "title": "Flexibility",
      "content": "The product is good but could use some improvements. The user interface could be more user-friendly."
    },
    {
      "image": "assets/images/avatar/user-13.png",
      "userName": "Charles Brown",
      "location": "Orlando",
      "star": "1",
      "date": "25 April, 2024",
      "title": "Code Quality",
      "content": "I had high hopes for this product, but it didn't deliver as expected. There were several issues that made it difficult to use."
    },
    {
      "image": "assets/images/avatar/user-14.png",
      "userName": "Mary Johnson",
      "location": "Philadelphia",
      "star": "4",
      "date": "22 April, 2024",
      "title": "Feature Availability",
      "content": "Overall, a good product. It has most of the features I need and works well."
    },
    {
      "image": "assets/images/avatar/user-15.png",
      "userName": "Richard Wilson",
      "location": "San Diego",
      "star": "3.5",
      "date": "20 April, 2024",
      "title": "Design Quality",
      "content": "Decent product, but the design could be more modern. It's a bit outdated."
    },
    {
      "image": "assets/images/avatar/user-16.png",
      "userName": "Karen Taylor",
      "location": "Las Vegas",
      "star": "2.5",
      "date": "18 April, 2024",
      "title": "Flexibility",
      "content": "Not very flexible. It's difficult to customize according to our needs."
    },
    {
      "image": "assets/images/avatar/user-17.png",
      "userName": "Daniel Thomas",
      "location": "Austin",
      "star": "4",
      "date": "15 April, 2024",
      "title": "Documentation Quality",
      "content": "Good documentation. It helped us understand the product better."
    },
    {
      "image": "assets/images/avatar/user-18.png",
      "userName": "Barbara Hernandez",
      "location": "San Antonio",
      "star": "3",
      "date": "12 April, 2024",
      "title": "Feature Availability",
      "content": "Lacking some features we expected. It needs more customization options."
    },
    {
      "image": "assets/images/avatar/user-19.png",
      "userName": "Matthew Martinez",
      "location": "Charlotte",
      "star": "4.5",
      "date": "10 April, 2024",
      "title": "Flexibility",
      "content": "Very flexible product. We were able to customize it according to our needs."
    },
    {
      "image": "assets/images/avatar/user-20.png",
      "userName": "Amanda Young",
      "location": "San Jose",
      "star": "5",
      "date": "8 April, 2024",
      "title": "Code Quality",
      "content": "Excellent code quality. It's well-structured and easy to maintain."
    },
    {
      "image": "assets/images/avatar/user-21.png",
      "userName": "Robert Lopez",
      "location": "Indianapolis",
      "star": "3",
      "date": "5 April, 2024",
      "title": "Documentation Quality",
      "content": "Documentation could be improved. It lacks some details and examples."
    },
    {
      "image": "assets/images/avatar/user-22.png",
      "userName": "Dorothy Gonzalez",
      "location": "Jacksonville",
      "star": "4.5",
      "date": "3 April, 2024",
      "title": "Design Quality",
      "content": "Great design! It's visually appealing and easy to navigate."
    },
    {
      "image": "assets/images/avatar/user-23.png",
      "userName": "Joseph Perez",
      "location": "San Francisco",
      "star": "4",
      "date": "1 April, 2024",
      "title": "Flexibility",
      "content": "Flexible enough for our needs. We were able to customize it to fit our workflow."
    },
    {
      "image": "assets/images/avatar/user-24.png",
      "userName": "Donna Flores",
      "location": "Columbus",
      "star": "2",
      "date": "29 March, 2024",
      "title": "Feature Availability",
      "content": "Lacks some important features we were looking for. Disappointing."
    },
    {
      "image": "assets/images/avatar/user-25.png",
      "userName": "Kenneth Scott",
      "location": "Fort Worth",
      "star": "4.5",
      "date": "27 March, 2024",
      "title": "Design Quality",
      "content": "The design is top-notch! It's clean, modern, and intuitive."
    },
    {
      "image": "assets/images/avatar/user-26.png",
      "userName": "Jennifer King",
      "location": "Memphis",
      "star": "3",
      "date": "24 March, 2024",
      "title": "Feature Availability",
      "content": "Average feature set. It meets our basic needs but lacks advanced functionality."
    },
    {
      "image": "assets/images/avatar/user-27.png",
      "userName": "Gerald Hernandez",
      "location": "Baltimore",
      "star": "4",
      "date": "22 March, 2024",
      "title": "Documentation Quality",
      "content": "Good documentation. It helped us get started with the product quickly."
    },
    {
      "image": "assets/images/avatar/user-28.png",
      "userName": "Megan Sanchez",
      "location": "Washington",
      "star": "4.5",
      "date": "20 March, 2024",
      "title": "Code Quality",
      "content": "High-quality codebase. It's well-written and easy to understand."
    }
  ]

  ngOnInit(): void {
    register();
    this.initReview();
    this.productId = this.activatedRoute.snapshot.params['productId'];
  }

  initReview() {
    this.filterdReview = [...this.review];
    this.totalPages = Math.ceil(this.filterdReview.length / this.itemsPerPage);

    this.paginateReview();
  }

  paginateReview() {
    this.showingStart = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.showingEnd = Math.min(this.currentPage * this.itemsPerPage, this.filterdReview.length);
    this.displayReview = this.filterdReview.slice(this.showingStart - 1, this.showingEnd);
  }

  getStarClass(starRating: string | number, index: number): string {
    const roundedRating = parseFloat(starRating.toString()); // Ensure it's a number
    if (index <= roundedRating) {
      return 'ri-star-fill';
    } else if (index - 1 < roundedRating && roundedRating % 1 !== 0) {
      return 'ri-star-half-fill';
    }
    return 'ri-star-line';
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.paginateReview();
  }

  editProduct() {
    this.router.navigate([`/apps-ecommerce-create-products/${this.productId}`]);
  }


  visibleProductDetails() {
    if (this.showMoreD) {
      return this.productDetails; // Show all details
    }
    return this.productDetails.slice(0, 3); // Show only first 3 details when showMore is false
  }


  ngAfterViewInit() {
    new Swiper(this.paginationDynamicSliderContainer.nativeElement, {
      loop: true,
      autoplay: {
        delay: 2000, // Changed to 2000ms for a more practical delay
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });

    new Swiper(this.paginationContain.nativeElement, {
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
      },
    });
  }


  selectColor(color: any) {
    this.colors.forEach(c => c.active = false);
    color.active = true;
  }

  selectColorCart(color: any) {
    this.colors.forEach(c => c.active = false);
    color.active = true;
  }

  selectSize(size: any) {
    this.sizes.forEach(s => s.active = false);
    size.active = true;
  }
  selectSizeCart(size: any) {
    this.sizes.forEach(s => s.active = false);
    size.active = true;
  }

  increaseCount() {
    this.count++;
  }

  decreaseCount() {
    if (this.count > 1) this.count--;
  }

  buyNow() {
    // console.log('Buy Now clicked');
  }

  addToCart() {
    // console.log('Add to Cart clicked');
  }

  deleteProduct() {
    // console.log('Delete Product clicked');
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  // Function to control how many offers to display
  visibleOffers() {
    if (this.showMore) {
      return this.offers; // Show all offers
    }
    return this.offers.slice(0, 2); // Show first 2 offers when showMore is false
  }

  handleModal(data: any, index: any) {
    this.modalService.open(AddEditReviewComponent, data, (data) => {
      if (data) {
        if (index != null && index > -1) {
          this.review[index] = {
            ...this.review[index],
            ...data
          };
        }
        else {
          this.review.unshift(data)
        }
        this.initReview();
      }
    })

  }

  openDelModal(i: number) {
    this.modalService.open(DeleteModalComponent, {}, (result) => {
      if (result) {
        this.displayReview.splice(i, 1);
      }
    });
  }

}
