import { SideBarToggle } from "./SideBar";

export const NavBar = () => {
  return (
    <nav class="bg-gray-50 dark:bg-gray-700 border-b-2 min-h-12">
      <div class="w-full px-4 py-3 mx-auto flex justify-between sm:justify-end">
        <SideBarToggle />
        <div class="flex items-center">LOG OUT</div>
      </div>
    </nav>
  );
};
