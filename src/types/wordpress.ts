 
export interface HomeACF extends AboutData, OurPhilosophyData {
  slider: [];  
}
export interface WPPage {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: HomeACF;   
}


//about us page types

export interface ServiceListItem {
  service: string;
}

export interface GroupCard {
  service_name: string;
  list: ServiceListItem[];
}

export interface AboutGroupItem {
  group_logo: string;
  group_card: GroupCard[];
}

export interface AboutData {
  heading: string;
  paragraph: string;
  groudp_heading: string;
  about_group: AboutGroupItem[];
}

export interface AboutProps {
  about: AboutData;
}




// innerwork types

export interface InnerWorkImage {
  image: string;
}

export interface PhilosophyItem {
  heading: string;
  paragraph: string;
}

export interface OurPhilosophyData {
  inner_work_heading: string;
  inner_work_images: InnerWorkImage[];
  our_philosophy: PhilosophyItem[];
}

export interface OurPhilosophyProps {
  our_philosophy: OurPhilosophyData;
}