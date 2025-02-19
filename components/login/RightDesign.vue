<template>
  <div class="md:w-1/2 relative">
    <div class="hidden md:block">


      <div class="ml-24 mb-16 absolute left-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-6 py-8"
        style="transform: rotate(-8deg); z-index: 2;">
        <div class="bg-orange-400 mx-auto rounded-lg relative mb-8 py-2 w-20 border-2 border-white">
          <div class="h-8 bg-green-500 w-8 rounded absolute left-0 top-0 -mt-3 ml-4"
            style="transform: rotate(-45deg); z-index: -1;"></div>
          <div class="h-8 bg-green-600 w-8 rounded absolute left-0 top-0 -mt-3 ml-8"
            style="transform: rotate(-12deg); z-index: -2;"></div>

          <div
            class="flex items-center justify-center h-6 bg-orange-400 w-6 rounded-l-lg ml-auto border-4 border-white -mr-1">
            <div class="h-2 w-2 rounded-full bg-orange-400 border-2 border-white"></div>
          </div>

          <div class="w-8 h-8 bg-green-500 border-4 border-white rounded-full -ml-3 -mb-5"></div>
        </div>

        <div class="text-gray-800 text-center">
          Cash <br /> Payment
        </div>
      </div>

      <div class="ml-32 absolute left-8 bottom-12 w-40 bg-white rounded-lg shadow-lg px-10 py-8"
        style="transform: rotate(-8deg); z-index: 2; margin-bottom: -220px;">
        <div class="bg-orange-400 mx-auto rounded-lg px-2 pb-2 relative mb-8">
          <div class="mb-1">
            <span class="w-1 h-1 bg-indigo-100 rounded-full inline-block" style="margin-right: 1px;"></span><span
              class="w-1 h-1 bg-indigo-100 rounded-full inline-block" style="margin-right: 1px;"></span><span
              class="w-1 h-1 bg-indigo-100 rounded-full inline-block"></span>
          </div>
          <div class="h-1 w-12 bg-indigo-100 rounded mb-1"></div>
          <div class="h-1 w-10 bg-indigo-100 rounded mb-2"></div>

          <div class="flex">
            <div class="w-6 h-3 rounded bg-indigo-100 mr-1"></div>
            <div class="w-6 h-3 rounded bg-indigo-100"></div>
          </div>

          <div class="-mr-2 -mb-4 absolute bottom-0 right-0 h-16 w-10 rounded-lg bg-green-500 border-2 border-white">
          </div>
          <div
            class="w-2 h-2 rounded-full bg-green-600 mx-auto absolute bottom-0 right-0 mr-2 -mb-2 z-10 border-2 border-white">
          </div>
        </div>

        <div class="text-gray-800 text-center">
          Mobile <br />Services
        </div>
      </div>

      <div class="mt-10 w-full absolute right-0 top-24 flex rounded-lg bg-white overflow-hidden shadow-lg"
        style="transform: rotate(-8deg); margin-right: -250px; z-index: 1;">
        <div class="w-32 bg-gray-200" style="height: 560px;"></div>
        <div class="flex-1 p-6">
          <h2 class="text-lg text-gray-700 font-bold mb-3">
            Popular Payments
          </h2>
          <div class="flex mb-5">
            <div class="w-16 rounded-full bg-gray-100 py-2 px-4 mr-2">
              <div class="p-1 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-16 rounded-full bg-gray-100 py-2 px-4 mr-2">
              <div class="p-1 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-16 rounded-full bg-gray-100 py-2 px-4 mr-2">
              <div class="p-1 rounded-full bg-gray-300"></div>
            </div>
            <div class="w-16 rounded-full bg-gray-100 py-2 px-4">
              <div class="p-1 rounded-full bg-gray-300"></div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-4 mb-5">
            <div class="w-1/3 px-4">
              <div class="h-40 rounded-lg bg-white shadow-lg p-6">
                <div class="w-16 h-16 rounded-full bg-gray-200 mb-6"></div>
                <div class="h-2 w-16 bg-gray-200 mb-2 rounded-full"></div>
                <div class="h-2 w-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div class="w-1/3 px-4">
              <div class="h-40 rounded-lg bg-white shadow-lg p-6">
                <div class="w-16 h-16 rounded-full bg-gray-200 mb-6"></div>
                <div class="h-2 w-16 bg-gray-200 mb-2 rounded-full"></div>
                <div class="h-2 w-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div class="w-1/3 px-4">
              <div class="h-40 rounded-lg bg-white shadow-lg p-6">
                <div class="w-16 h-16 rounded-full bg-gray-200 mb-6"></div>
                <div class="h-2 w-16 bg-gray-200 mb-2 rounded-full"></div>
                <div class="h-2 w-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          <h2 class="text-lg text-gray-700 font-bold mb-3">
            Recent Payments
          </h2>

          <div class="w-full flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3">
            <div class="w-1/3">
              <div class="flex">
                <div class="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                <div>
                  <div class="h-2 w-16 bg-gray-200 mb-1 rounded-full"></div>
                  <div class="h-2 w-10 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="w-16 rounded-full bg-green-100 py-2 px-4 mx-auto">
                <div class="p-1 rounded-full bg-green-200"></div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="h-2 w-10 bg-gray-100 rounded-full mx-auto"></div>
            </div>
          </div>

          <div class="flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3">
            <div class="w-1/3">
              <div class="flex">
                <div class="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                <div>
                  <div class="h-2 w-16 bg-gray-200 mb-1 rounded-full"></div>
                  <div class="h-2 w-10 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="w-16 rounded-full bg-orange-100 py-2 px-4 mx-auto">
                <div class="p-1 rounded-full bg-orange-200"></div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="h-2 w-16 bg-gray-100 rounded-full mx-auto"></div>
            </div>
          </div>

          <div class="flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3">
            <div class="w-1/3">
              <div class="flex">
                <div class="h-8 w-8 rounded bg-gray-200 mr-4"></div>
                <div>
                  <div class="h-2 w-16 bg-gray-200 mb-1 rounded-full"></div>
                  <div class="h-2 w-10 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="w-16 rounded-full bg-blue-100 py-2 px-4 mx-auto">
                <div class="p-1 rounded-full bg-blue-200"></div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="h-2 w-8 bg-gray-100 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full absolute left-0 bottom-0 ml-1"
        style="transform: rotate(-8deg); z-index: 1; margin-bottom: -360px;">
        <div class="grid--gray h-48 w-48"></div>
      </div>
    </div>

    <div class="md:hidden w-full absolute right-0 top-0 flex rounded-lg bg-white overflow-hidden shadow">
      <div class="h-4 bg-gray-200 absolute top-0 left-0 right-0 rounded-t-lg flex items-center">
        <span class="h-2 w-2 rounded-full bg-red-500 inline-block mr-1 ml-2"></span>
        <span class="h-2 w-2 rounded-full bg-orange-400 inline-block mr-1"></span>
        <span class="h-2 w-2 rounded-full bg-green-500 inline-block mr-1"></span>
      </div>
      <div class="w-32 bg-gray-100 px-2 py-8" style="height: 340px;">
        <div class="h-2 w-16 bg-gray-300 rounded-full mb-4"></div>
        <div class="flex items-center mb-4">
          <div class="h-5 w-5 rounded-full bg-gray-300 mr-3 flex-shrink-0"></div>
          <div>
            <div class="h-2 w-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div class="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-10 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-20 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-6 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-16 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-10 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-20 bg-gray-200 rounded-full mb-2"></div>
        <div class="h-2 w-6 bg-gray-200 rounded-full mb-2"></div>
      </div>
      <div class="flex-1 px-4 py-8">
        <h2 class="text-xs text-gray-700 font-bold mb-1">
          Popular Payments
        </h2>
        <div class="flex mb-5">
          <div class="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
          <div class="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
          <div class="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
          <div class="p-2 w-12 rounded-full bg-gray-100 mr-2"></div>
        </div>

        <div class="flex flex-wrap -mx-2 mb-5">
          <div class="w-1/3 px-2">
            <div class="p-3 rounded-lg bg-white shadow">
              <div class="w-6 h-6 rounded-full bg-gray-200 mb-2"></div>
              <div class="h-2 w-10 bg-gray-200 mb-1 rounded-full"></div>
              <div class="h-2 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="p-3 rounded-lg bg-white shadow">
              <div class="w-6 h-6 rounded-full bg-gray-200 mb-2"></div>
              <div class="h-2 w-10 bg-gray-200 mb-1 rounded-full"></div>
              <div class="h-2 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div class="w-1/3 px-2">
            <div class="p-3 rounded-lg bg-white shadow">
              <div class="w-6 h-6 rounded-full bg-gray-200 mb-2"></div>
              <div class="h-2 w-10 bg-gray-200 mb-1 rounded-full"></div>
              <div class="h-2 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        <h2 class="text-xs text-gray-700 font-bold mb-1">
          Popular Payments
        </h2>

        <div class="w-full flex flex-wrap justify-between items-center border-b-2 border-gray-100 py-3">
          <div class="w-1/3">
            <div class="flex">
              <div class="h-5 w-5 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
              <div>
                <div class="h-2 w-16 bg-gray-200 mb-1 rounded-full"></div>
                <div class="h-2 w-10 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="w-16 rounded-full bg-green-100 py-2 px-4 mx-auto">
              <div class="p-1 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="h-2 w-10 bg-gray-100 rounded-full mx-auto"></div>
          </div>
        </div>

        <div class="flex flex-wrap justify-between items-center py-3">
          <div class="w-1/3">
            <div class="flex">
              <div class="h-5 w-5 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
              <div>
                <div class="h-2 w-16 bg-gray-200 mb-1 rounded-full"></div>
                <div class="h-2 w-10 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="w-16 rounded-full bg-orange-100 py-2 px-4 mx-auto">
              <div class="p-1 rounded-full bg-orange-200"></div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="h-2 w-16 bg-gray-100 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="mr-3 md:hidden absolute right-0 bottom-0 w-40 bg-white rounded-lg shadow-lg px-10 py-6"
      style="z-index: 2; margin-bottom: -380px;">
      <div class="bg-orange-400 mx-auto rounded-lg w-20 pt-3 mb-12 relative">
        <div class="h-3 bg-white"></div>

        <div class="text-right my-2">
          <div class="inline-flex w-3 h-3 rounded-full bg-white -mr-2"></div>
          <div class="inline-flex w-3 h-3 rounded-full bg-orange-400 border-2 border-white mr-2"></div>
        </div>

        <div class="-ml-4 -mb-6 absolute left-0 bottom-0 w-16 bg-green-500 mx-auto rounded-lg pb-2 pt-3">
          <div class="h-2 bg-white mb-2"></div>
          <div class="h-2 bg-white w-6 ml-auto rounded mr-2"></div>
        </div>
      </div>

      <div class="text-gray-800 text-center text-sm">
        Payment for <br />Internet
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>