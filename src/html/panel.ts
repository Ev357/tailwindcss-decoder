export const panelHtml = `
<div class="flex min-w-0">
<h2 class="truncate text-base font-medium leading-7 text-slate-900"><a href=""></a></h2>
</div>
<div class="ml-6 flex items-center">
<div class="flex space-x-1 rounded-lg bg-slate-100 p-0.5" role="tablist" aria-orientation="horizontal">
  <button class="flex items-center rounded-md bg-white py-[0.4375rem] pl-2 pr-2 text-sm font-semibold shadow lg:pr-3"
    id="headlessui-tabs-tab-1" role="tab" type="button" aria-selected="true" tabindex="-1"
    data-headlessui-state="selected" aria-controls="headlessui-tabs-panel-3">
    <svg class="h-5 w-5 flex-none stroke-slate-600" fill="none" stroke-width="1.5" stroke-linecap="round"
      stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10Z"></path>
      <circle cx="10" cy="10" r="2.25"></circle>
    </svg><span class="sr-only text-slate-600 lg:not-sr-only lg:ml-2">Preview</span>
  </button>
  <button class="flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3"
    id="headlessui-tabs-tab-2" role="tab" type="button" aria-selected="false" tabindex="0" data-headlessui-state=""
    aria-controls="headlessui-tabs-panel-4">
    <svg class="h-5 w-5 flex-none stroke-sky-500" fill="none" stroke-width="1.5" stroke-linecap="round"
      stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="m13.75 6.75 3.5 3.25-3.5 3.25M6.25 13.25 2.75 10l3.5-3.25"></path>
    </svg><span class="sr-only text-slate-900 lg:not-sr-only lg:ml-2">Code</span>
  </button>
</div>
<div class="ml-6 mr-3 hidden h-5 w-px bg-slate-900/10 sm:block"></div>
<div class="relative hidden sm:block">
  <select
    class="form-select h-9 w-full rounded-lg border-0 bg-transparent bg-none p-0 pl-3.5 pr-[1.875rem] font-medium text-slate-900 focus:shadow-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:text-sm"
    disabled>
    <option selected value="html">HTML</option>
  </select><svg aria-hidden="true" viewBox="0 0 8 6" width="8" height="6" fill="none"
    class="pointer-events-none absolute inset-y-0 right-3.5 h-full stroke-slate-500">
    <path d="M7 1.5l-3 3-3-3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
</div>
<div data-state="copy">
  <div data-type="copy">
    <button class="group relative ml-2 hidden h-9 w-9 items-center justify-center sm:flex" data-state="">
      <svg class="h-8 w-8 stroke-slate-400 transition group-hover:rotate-[-4deg] group-hover:stroke-slate-600"
        fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round">
        <path
          d="M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
          d="M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.7475 16.2499L18.2475 16.2499" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M13.7475 19.2499L18.2475 19.2499" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <g class="opacity-0">
          <path d="M15.9975 5.99988L15.9975 3.99988" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
          <path d="M19.9975 5.99988L20.9975 4.99988" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
          <path d="M11.9975 5.99988L10.9975 4.99988" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
        </g>
      </svg>
    </button>
  </div>
  <div data-type="copied" class="hidden">
    <button class="group relative ml-2 hidden h-9 w-9 items-center justify-center sm:flex">
      <span
        class="absolute inset-x-0 bottom-full mb-2.5 flex translate-y-0 scale-100 justify-center opacity-100"><span
          class="rounded-md bg-gray-900 px-3 py-1 text-[0.625rem] font-semibold uppercase leading-4 tracking-wide text-white drop-shadow-md filter"><svg
            aria-hidden="true" width="16" height="6" viewBox="0 0 16 6"
            class="absolute left-1/2 top-full -ml-2 -mt-px text-gray-900">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
              fill="currentColor"></path>
          </svg>Copied!</span></span><svg class="h-8 w-8 rotate-[-8deg] stroke-[#06B6D4]" fill="none"
        viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round">
        <path
          d="M12.9975 10.7499L11.7475 10.7499C10.6429 10.7499 9.74747 11.6453 9.74747 12.7499L9.74747 21.2499C9.74747 22.3544 10.6429 23.2499 11.7475 23.2499L20.2475 23.2499C21.352 23.2499 22.2475 22.3544 22.2475 21.2499L22.2475 12.7499C22.2475 11.6453 21.352 10.7499 20.2475 10.7499L18.9975 10.7499"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
          d="M17.9975 12.2499L13.9975 12.2499C13.4452 12.2499 12.9975 11.8022 12.9975 11.2499L12.9975 9.74988C12.9975 9.19759 13.4452 8.74988 13.9975 8.74988L17.9975 8.74988C18.5498 8.74988 18.9975 9.19759 18.9975 9.74988L18.9975 11.2499C18.9975 11.8022 18.5498 12.2499 17.9975 12.2499Z"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13.7475 16.2499L18.2475 16.2499" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M13.7475 19.2499L18.2475 19.2499" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <g class="">
          <path d="M15.9975 5.99988L15.9975 3.99988" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
          <path d="M19.9975 5.99988L20.9975 4.99988" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
          <path d="M11.9975 5.99988L10.9975 4.99988" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round">
          </path>
        </g>
      </svg>
    </button>
  </div>
</div>
</div>
`;