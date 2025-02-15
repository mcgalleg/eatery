interface CateringPackage {
  title: string;
  price: number;
  description: string;
  perPerson?: boolean;
  includes: string[];
}

interface MenuItem {
  name: string;
  price: number;
  description: string;
  perGuest?: boolean;
}

interface MenuPackage {
  title: string;
  items: MenuItem[];
  note?: string;
}

interface Enhancement {
  name: string;
  price: number;
  description: string;
  perPerson?: boolean;
  serves?: number;
}

interface SideOption {
  name: string;
  description: string;
}

interface AdditionalService {
  name: string;
  price: number;
  description: string;
  note?: string;
}

export const cateringPackages: CateringPackage[] = [
  {
    title: "Special Delivery & Setup",
    price: 69,
    description: "Professional delivery and setup with quality packaging within 15 miles",
    includes: [
      "Warming Kit",
      "Serving Ware",
      "Disposable Plates",
      "Napkin Rolls"
    ]
  },
  {
    title: "Full-Service Staffed Event",
    price: 7,
    description: "Professional staff service for 2-3 hour events (price per person)",
    perPerson: true,
    includes: [
      "Professional staff in black attire",
      "Dedicated event captain",
      "Premium copper chafers",
      "Complete serving setup",
      "Buffet management",
      "Clean-up service"
    ]
  }
];

export const menuPackages: MenuPackage[] = [
  {
    title: "Premium Entrees",
    items: [
      { 
        name: "Carne Asada", 
        price: 15,
        description: "Dive into the heart of New Mexican tradition with our Carne Asada. This 6oz ribeye steak is grilled to juicy perfection with grilled onions, jalapeños and warm tortillas."
      },
      { 
        name: "Classic Fajitas", 
        price: 15,
        description: "Ignite your taste buds with our tasty fajitas! Includes your choice of protein, warm tortillas, onions, bell peppers, cheese, sour cream, guacamole and salsa."
      },
      { 
        name: "Pork Chop Dinner", 
        price: 13,
        description: "Juicy pork chop served with New Mexican green chile and warm tortillas"
      },
      { 
        name: "Taco Fiesta", 
        price: 13,
        description: "Seasoned steak, fish or chicken tacos filled with fresh cabbage, onion, crumbled goat cheese, and cilantro. Served on soft white corn tortilla."
      },
      { 
        name: "Enchiladas", 
        price: 11,
        description: "Delicious enchiladas, made from New Mexican red chile, cheddar cheese and corn tortillas. A catering favorite."
      }
    ],
    note: "All entrees include choice of two sides"
  }
];

export const enhancements: {
  stations: Enhancement[];
  drinks: Enhancement[];
  desserts: Enhancement[];
  extras: Enhancement[];
} = {
  stations: [
    { 
      name: "Beverage Station", 
      price: 3, 
      description: "Self-service drink station includes fresh Coffee, filtered Water, house-made Lemonade, and fresh-brewed Iced Tea",
      perPerson: true
    },
    { 
      name: "Appetizer Station", 
      price: 6, 
      description: "Fresh-made Corn Chips with Queso, house Salsa, and assorted Veggie & Fruit Trays",
      perPerson: true
    },
    { 
      name: "Premium Bar Package", 
      price: 18, 
      description: "Complete bar service including Champagne, Red & White Wine selection, 2 signature Margaritas, and 3 Beer options",
      perPerson: true
    }
  ],
  drinks: [
    { 
      name: "Bottled Soda", 
      price: 3, 
      description: "Assorted soft drinks",
      perPerson: true 
    },
    { 
      name: "Bottled Water", 
      price: 2, 
      description: "Purified drinking water",
      perPerson: true 
    },
    { 
      name: "Virgin Margarita", 
      price: 12, 
      description: "Alcohol-free margarita mix ready for spiking",
      perPerson: true 
    }
  ],
  desserts: [
    { 
      name: "Sopapillas & Honey", 
      price: 4, 
      description: "Fried pastry with honey drizzle",
      perPerson: true 
    },
    { 
      name: "Churros & Chocolate", 
      price: 4, 
      description: "Cinnamon-sugar sticks with dipping sauce",
      perPerson: true 
    },
    { 
      name: "Cookie Assortment", 
      price: 2, 
      description: "Variety pack of homemade cookies",
      perPerson: true 
    }
  ],
  extras: [
    { 
      name: "Additional Side Dish", 
      price: 3, 
      description: "Add a third side dish to any entree",
      perPerson: true
    },
    { 
      name: "Fruit & Veggie Trays", 
      price: 39.99, 
      description: "Separate trays of seasonal assortments served with Ranch and Yogurt dips",
      serves: 20
    }
  ]
};

export const sideOptions: SideOption[] = [
  { name: "Green Chile", description: "New Mexico-style famous green chile" },
  { name: "Spanish Rice", description: "Tomato-infused traditional rice" },
  { name: "Calabacitas", description: "Seasonal squash medley (availability varies)" },
  { name: "Fried Potatoes", description: "Pan fried potatoes" },
  { name: "Refried Beans", description: "Delicious refried beans" },
  { name: "Black Beans", description: "Whole beans in mild broth" },
  { name: "Cheese Enchiladas", description: "Corn tortillas with melted cheese and mild red chile" },
  { name: "Garden Salad", description: "Fresh mixed greens with vegetables" }
];

export const additionalServices: AdditionalService[] = [
  { 
    name: "Champagne Pour Service", 
    price: 199, 
    description: "Professional champagne pouring service (up to 100 guests)",
    note: "Perfect for toasts and celebrations"
  },
  { 
    name: "Cake Cutting Service", 
    price: 199, 
    description: "Professional dessert service with plating (up to 100 guests)",
    note: "Includes plates and utensils"
  },
  { 
    name: "Bussing Service", 
    price: 199, 
    description: "Dedicated cleanup crew (up to 100 guests)",
    note: "Keeps your event space tidy throughout"
  },
  { 
    name: "Equipment Rental Deposit", 
    price: 250, 
    description: "Refundable deposit for equipment rental",
    note: "Required for all equipment rentals"
  },
  { 
    name: "Outdoor Setup", 
    price: 250, 
    description: "Buffet tent with 3 tables setup",
    note: "Perfect for outdoor events"
  },
  { 
    name: "Additional Hour", 
    price: 250, 
    description: "Extended service time (up to 100 guests)",
    note: "Per hour beyond standard service time"
  },
  { 
    name: "Tear Down Service", 
    price: 250, 
    description: "Complete venue cleanup service (up to 100 guests)",
    note: "Follows specific venue requirements"
  }
]; 