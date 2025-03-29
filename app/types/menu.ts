// Section structure for dropdown menus
export interface SectionAttributes {
    heading: string;
    createdAt: string;
    updatedAt: string;
    url: string | null;
  }
  
  export interface Section {
    id: number;
    attributes: SectionAttributes;
  }
  
  // Dropdown menu structure
  export interface DropdownMenu {
    id: number;
    __component: "menu.dropdown";
    title: string;
    sections: {
      data: Section[];
    };
  }
  
  // Menu link structure
  export interface MenuLink {
    id: number;
    __component: "menu.menu-link";
    title: string;
    url: string | null;
  }
  
  // Main menu item structure
  export type MainMenuItem = DropdownMenu | MenuLink;
  
  // Attributes for the main menu response
  export interface MainMenuAttributes {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    mainMenuItems: MainMenuItem[];
  }
  
  // Main menu response structure
  export interface MainMenuData {
    id: number;
    attributes: MainMenuAttributes;
  }
  
  export interface MainMenuResponse {
    data: MainMenuData;
    meta: Record<string, any>; // Meta can have varying structure
  }
  