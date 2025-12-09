<script setup>
  import { ref } from 'vue'

  const isActiveIcon = ref(true);

  const handlerIconSearch = () => {
    isActiveIcon.value = isActiveIcon.value !== true;
  }
</script>

<template>
  <transition v-if="isActiveIcon" name="in">
    <div class="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg"
           @click="handlerIconSearch"
           width="45px" height="43px" viewBox="0 0 428.000000 412.000000"
           preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"
           fill="#B71C1C" stroke="none">
          <path d="M1585 3361 c-205 -43 -377 -135 -526 -281 -229 -226 -329 -479 -316
  -802 3 -91 12 -158 27 -213 112 -413 442 -712 861 -780 258 -41 518 16 739
  164 41 27 86 58 98 69 l24 19 176 -179 c98 -99 178 -184 179 -191 14 -95 0
  -77 311 -390 164 -164 312 -307 330 -319 69 -43 173 0 188 78 13 69 6 79 -316
  399 -170 170 -319 314 -332 321 -13 7 -39 13 -58 14 -32 0 -51 16 -212 178
  l-177 177 20 25 c203 254 284 562 228 870 -64 347 -314 653 -643 784 -128 51
  -211 68 -366 72 -114 3 -164 0 -235 -15z m430 -100 c181 -45 310 -118 446
  -251 135 -133 212 -261 259 -435 28 -100 38 -295 20 -402 -58 -363 -334 -670
  -695 -775 -70 -20 -102 -23 -255 -23 -164 0 -180 2 -265 29 -300 95 -532 310
  -634 588 -46 124 -55 179 -55 333 0 132 3 162 27 247 105 382 409 648 812 712
  64 10 262 -3 340 -23z"/>
          <path d="M1681 3009 c-206 -35 -387 -163 -494 -349 -39 -69 -77 -195 -80 -269
  -3 -97 15 -91 29 9 13 104 26 145 70 230 108 208 313 339 569 362 17 2 30 8
  30 13 0 13 -58 15 -124 4z"/>
        </g>
      </svg>
    </div>
  </transition>
  <transition v-else name="out" mode="out-in">
    <div class="searchbar_div">
      <input type="text" class="searchbar" />
      <button>Поиск</button>
      <div class="search_modal">
        <div class="header">
          <p>Поиск</p>
          <button @click="handlerIconSearch">X</button>
        </div>
        <div class="item">
          <input type="text" />
          <button>Применить</button>
        </div>
      </div>
      <div class="overlay"></div>
    </div>
  </transition>

</template>

<style scoped>
  .searchbar {
    background-color: #FFF;
    width: 170%;
    padding: 6px;
  }
  .searchbar_div {
    display: flex;
    gap: 8px;
  }
  .search_modal {
    display: none;
  }
  .in-enter-active,
  .in-leave-active {
    transition: all 0.3s ease;
  }

  .in-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }

  .in-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  @media screen and (max-width: 768px) {
    .searchbar {
      display: none;
    }
    .search_modal {
      display: flex;
      background-color: #FFFFF0;
      position: fixed;
      top: 0;
      left: 25px;
      right: 25px;
      padding: 12px;
      flex-direction: column;
      border-radius: 12px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
    }
    .header p {
      color: #0D0D0D;
    }
    .item {
      display: flex;
      padding: 12px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 12px;
    }
    .item input {
      background-color: #FFFF;
      border: #0D0D0D solid 2px;
      width: 80%;
    }
  }
</style>
