
export const getCategoryDescription = (category: string): string => {
  switch(category) {
    case 'Men':
      return "Explore our premium collection of men's apparel and accessories, designed to keep you stylish and comfortable for every occasion.";
    case 'Women':
      return "Discover our curated collection for women, featuring elegant designs and quality craftsmanship for every style preference.";
    case 'Kids':
      return "Playful, comfortable, and durable clothing for your little ones, designed to keep up with their adventures.";
    case 'Shirts':
      return "Discover our selection of high-quality shirts, from casual to formal designs, perfect for any wardrobe.";
    case 'Pants':
      return "Browse our range of stylish and comfortable pants, designed to offer the perfect fit and durability.";
    case 'Perfumes':
      return "Indulge in our exquisite collection of fragrances, crafted to leave a lasting impression and elevate your personal style.";
    case 'Sunglasses':
      return "Protect your eyes in style with our premium collection of sunglasses, featuring the latest designs and superior UV protection.";
    default:
      return "Explore our luxury collection of premium items, designed to enhance your style and comfort.";
  }
};

export const getCategoryBannerImage = (category: string): string => {
  switch(category) {
    case 'Perfumes':
      return "https://images.unsplash.com/photo-1592945403407-9cefa6648746?q=80&w=1770&auto=format&fit=crop";
    case 'Sunglasses':
      return "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1770&auto=format&fit=crop";
    case 'Men':
      return "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1770&auto=format&fit=crop";
    case 'Women':
      return "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1770&auto=format&fit=crop";
    case 'Kids':
      return "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1770&auto=format&fit=crop";
    case 'Shoes':
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop";
    case 'Shirts':
      return "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1770&auto=format&fit=crop";
    case 'Pants':
      return "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1770&auto=format&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1770&auto=format&fit=crop";
  }
};
