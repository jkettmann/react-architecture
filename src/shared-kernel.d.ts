interface Flavoring<FlavorT> {
  _type?: FlavorT;
}

declare type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;
