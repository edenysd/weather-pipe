import { Avatar } from "~/components/avatar";
import { SideBarToggle } from "./SideBar";
import * as Menu from "~/components/menu";
import { useNavigate } from "@solidjs/router";
import { logOut } from "~/lib/auth";
import { TbLogout } from "solid-icons/tb";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav class="bg-gray-50 dark:bg-gray-700 border-b-2 h-fit">
      <div class="w-full px-4 py-3 mx-auto flex justify-between lg:justify-end">
        <SideBarToggle />
        <div class="flex items-center">
          <Menu.Root>
            <Menu.Trigger>
              <Avatar />
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content class="w-full min-w-44">
                <Menu.ItemGroup id="group-1">
                  <Menu.ItemGroupLabel class="text-base" for="group-1">
                    <div>Welcome!</div>
                    <div class="font-light">{Meteor.user()?.username}</div>
                  </Menu.ItemGroupLabel>

                  <Menu.Separator />
                  <Menu.Item
                    class="flex flex-row gap-4 text-base"
                    id="profile"
                    onClick={async () => {
                      logOut().then(() => {
                        navigate("/");
                      });
                    }}
                  >
                    <TbLogout class="h-6 w-6" />
                    Logout
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </div>
      </div>
    </nav>
  );
};
