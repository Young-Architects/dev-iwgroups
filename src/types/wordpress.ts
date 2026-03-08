
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
  image: string
}

export interface InnerWorkPhilosophyItem {
  heading: string
  paragraph: string
}

export interface InnerWorkData {
  inner_work_heading: string
  inner_work_images: InnerWorkImage[]
  our_philosophy: InnerWorkPhilosophyItem[]
}

export interface InnerworkGroupsProps {
  our_philosophy?: InnerWorkData
}

// our philosophy

export interface PhilosophyItem {
  heading: string
  paragraph: string
}

export interface PhilosophySection {
  title?: string
  philop_heading?: string
  our_philosophy_list?: PhilosophyItem[]
}

export interface OurPhilosophyProps {
  philosophy?: PhilosophySection
}




// community galleries


export interface CommunityGallery {
  image: string
}

export interface CommunityPresentation {
  com_heading?: string
  com_paragraph?: string
  galleries?: CommunityGallery[]
}

export interface CommunityEngagementProps {
  com_pres?: CommunityPresentation
}



// global presense

export interface GlobalListItem {
  list?: string
}

export interface GlobalPresentation {
  global_heading?: string
  global_paragraph?: string

  uk_country_name?: string
  in_country_name?: string

  about_united_kingdom?: GlobalListItem[]
  about_india?: GlobalListItem[]

  india_lat?: string | number
  india_long?: string | number
  uk_lat?: string | number
  uk_long?: string | number
}

export interface GlobalPresenceProps {
  global_pres?: GlobalPresentation
}


// our philosophy

export interface PhilosophyItem {
  heading: string
  paragraph: string
}

export interface PhilosophySection {
  title?: string
  philop_heading?: string
  our_philosophy_list?: PhilosophyItem[]
}

export interface OurPhilosophyProps {
  philosophy?: PhilosophySection
}

// header types

export type IndustryChild = {
  menu_name: string
  menu_link: string
}

export type IndustryMenu = {
  menu_name: string
  children: IndustryChild[]
}

export type IndustryResponse = {
  industries_menu: IndustryMenu[]
}



// phone number and email 

export interface EmailAddress {
  email?: string
}

export interface PhoneNumber {
  service_number_name?: string
  first_number?: string
  second_number?: string
}

export interface PhoneProps {
  result?: {
    email_address?: EmailAddress[]
    phone_numbers?: PhoneNumber[]
  }
}

// address

export interface AddressItem {
  address_title?: string
  address?: string
  address_lat?: string | number
  address_long?: string | number
}

export interface AddressProps {
  result?: {
    address?: AddressItem[]
  }
}