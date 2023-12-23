export const adminMenu = [
  {
    //Quản lý người dùng
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.admin.manage-customer",
        link: "user-customer",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        //   {
        //     name: "menu.system.system-administrator.product-manage",
        //     link: "/system/product-manage",
        //   },
        // ],
      },

      {
        name: "menu.admin.manage-admin",
        link: "user-admin",
      },
      {
        name: "menu.admin.user-manage",
        link: "manage-user",
      },
      {
        name: "menu.admin.user-redux",
        link: "user-redux",
      },
    ],
  },
  {
    //Quản lý sản phẩm
    name: "menu.admin.product",
    menus: [
      {
        name: "menu.admin.manage-product",
        link: "manage-product",
      },

      {
        //Quản lý loại sản phẩm
        name: "menu.admin.manage-category",
        link: "manage-category",
      },
      {
        //Quản lý nhãn
        name: "menu.admin.manage-brand",
        link: "manage-brand",
      },
      {
        //Quản lý giảm giá
        name: "menu.admin.manage-discount",
        link: "manage-discount",
      },
    ],
  },
  {
    //Quản lý đơn hàng
    name: "menu.admin.order",
    menus: [
      {
        name: "menu.admin.manage-order",
        link: "manage-order",
      },
    ],
  },
];
