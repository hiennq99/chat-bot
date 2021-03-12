<template>
  <div class="h-100 d-flex flex-column">
    <div
      :class="[
        { 'show-side-bar': isShowSideBar },
        'main-menu bg-white transition-03-ease h-100',
      ]"
    >
      <div class="bg-white shadow-sm flex-center p-3 mb-2">
        <img src="images/logo.png" alt="logo" class="image-logo" title="logo" />
      </div>
      <div class="px-2">
        <nav-list :data="navs" />
      </div>
    </div>
    <nav
      class="sticky-top nav-top bg-white pt-4 ml-3 mr-3 ml-sm-4 mr-sm-4 transition-03-ease"
    >
      <div
        class="shadow bg-white rounded flex-center justify-content-between min-height-50 px-2"
      >
        <div @click.stop="isShowSideBar = true" class="cursor-pointer">
          <span class="icon-menu d-block d-xl-none"></span>
        </div>
        <div @click.stop="isShowLogout = !isShowLogout">
          <div class="d-flex align-items-center cursor-pointer">
            <div class="mr-3 font-weight-500">Vangpt</div>
            <span class="shadow rounded-circle overflow-hidden">
              <img
                src="images/no-image.jpg"
                alt="avatar"
                height="40"
                width="40"
              />
            </span>
          </div>
          <transition name="slide-fade">
            <div
              v-if="isShowLogout"
              class="cursor-pointer mt-2 p-3 position-absolute shadow bg-white rounded popup-logout d-flex align-items-center"
            >
              <span class="icon-exit"></span>
              <span class="px-1">Đăng xuất</span>
            </div>
          </transition>
        </div>
      </div>
      <bread-crumb></bread-crumb>
    </nav>
    <div
      class="d-flex flex-column main-content transition-03-ease position-relative flex-grow-1 ml-0"
    >
      <div
        class="main-content-wrapper flex-grow-1 px-3 px-sm-4 transition-03-ease"
      >
        <router-view></router-view>
      </div>
      <footer class="p-3 px-sm-4 transition-03-ease">
        COPYRIGHT &copy; 2020
        <a
          class="font-weight-bold text-primary"
          href="http://monstar-lab.vn/vi"
          target="_blank"
          >Monstar Lab Lifetime</a
        >, All rights Reserved
      </footer>
    </div>
    <transition name="fade">
      <div
        v-show="isShowSideBar"
        class="bg-overlay"
        @click.self="isShowSideBar = false"
      ></div>
    </transition>
  </div>
</template>

<script>
import NavList from "@/admin/components/nav/NavList";
import BreadCrumb from "@/admin/components/BreadCrumb";
export default {
  components: {
    NavList,
    BreadCrumb,
  },
  data() {
    const iconChild = {
      icon: "icon-radio-unchecked",
    };
    const navs = [
      {
        id: 1,
        label: "Thống kê",
        icon: "icon-home",
        url: "/",
      },
      {
        id: 2,
        label: "Quản lý",
        icon: "icon-book",
        children: [
          {
            label: "Kịch bản",
            ...iconChild,
            url: "/contents",
          },
          {
            label: "Câu hỏi",
            ...iconChild,
            url: "/questions",
          },
          {
            label: "Câu trả lời",
            ...iconChild,
            url: "/answers",
          },
        ],
      },
    ];
    return {
      navs,
      isShowLogout: false,
      isShowSideBar: false,
    };
  },

  methods: {
    closeLogOut(e) {
      if (!e.target.classList.contains("popup-logout")) {
        this.isShowLogout = false;
      }
    },
  },
  mounted() {
    window.addEventListener("click", this.closeLogOut);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeLogOut);
  },
};
</script>
