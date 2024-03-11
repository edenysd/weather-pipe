import * as SegmentGroup from "~/components/segment-group";
import "flowbite";
import { WiDust } from "solid-icons/wi";
import { useLocation, useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";

const paths = [
  { path: "/home", label: "Dashboard" },
  { path: "/home/map", label: "Wheater Map" },
];

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = createMemo(() => location.pathname);

  return (
    <>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r-2"
        aria-label="Sidebar"
      >
        <div class="h-full py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div class="flex flex-col h-fit w-full justify-center items-center text-2xl">
            Weather Pipe
            <WiDust
              class="relative -translate-y-3 fill-accent"
              size={"64px"}
              color="black"
            />
          </div>
          <SegmentGroup.Root value={pathname()}>
            {paths.map((option) => (
              <SegmentGroup.Item
                onChange={(e) => {
                  navigate(option.path);
                }}
                class="w-full"
                value={option.path}
              >
                <SegmentGroup.ItemText class="flex">
                  {option.label}
                </SegmentGroup.ItemText>
                <SegmentGroup.ItemControl />
              </SegmentGroup.Item>
            ))}
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
        </div>
      </aside>
    </>
  );
};

export const SideBarToggle = () => {
  return (
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  );
};
