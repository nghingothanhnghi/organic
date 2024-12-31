// features/menuSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { MainMenuResponse, MainMenuItem, DropdownMenu, MenuLink } from '~/types/menu';
import { getMainMenuAPI } from '~/services/menuService';

// Define the initial state type
interface MenuState {
  data: MainMenuItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MenuState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk to fetch and process the menu
export const fetchMainMenu = createAsyncThunk(
  'menu/fetchMainMenu',
  async (): Promise<MainMenuItem[]> => {
    // Fetch menu data using the service
    const response: MainMenuResponse = await getMainMenuAPI();

    // Process the menu response
    const rawMenu = response.data.attributes.mainMenuItems;

    // Map the menu items to their corresponding types
    return rawMenu.map((item) => {
      if (item.__component === 'menu.menu-link') {
        // Handle menu link
        const linkItem = item as MenuLink;
        return {
          ...linkItem,
          url: linkItem.url || '', // Ensure URL is always a string
        };
      } else if (item.__component === 'menu.dropdown') {
        // Handle dropdown menu
        const dropdownItem = item as DropdownMenu;
        return {
          ...dropdownItem,
          sections: {
            data: dropdownItem.sections.data.map((section) => ({
              ...section,
              attributes: {
                ...section.attributes,
              },
            })),
          },
        };
      }
      return item; // Return as-is for unsupported components
    });
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainMenu.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on loading
      })
      .addCase(fetchMainMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store the flattened data
      })
      .addCase(fetchMainMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred'; // Assign error
      });
  },
});

export default menuSlice.reducer;
