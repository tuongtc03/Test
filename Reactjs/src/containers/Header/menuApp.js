export const adminMenu = [
  {
    //Quản lý người dùng
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.admin.manage-customer",
        link: "manage-customer",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.product-manage",
        //     link: "/system/product-manage",
        //   },
        // ],
      },

      {
        name: "menu.admin.manage-admin",
        link: "manage-admin",
      },
      {
        name: "menu.admin.user-manage",
        link: "manage-user-redux",
      },
    ],
  },
  {
    //Quản lý sản phẩm
    name: "menu.admin.product",
    menus: [
      {
        name: "menu.admin.manage-product",
        link: "manage-product-redux",
      },

      {
        //Quản lý loại sản phẩm
        name: "menu.admin.manage-category",
        link: "manage-category-redux",
      },
      {
        //Quản lý nhãn
        name: "menu.admin.manage-brand",
        link: "manage-brand-redux",
      },
      {
        //Quản lý giảm giá
        name: "menu.admin.manage-discount",
        link: "manage-discount-redux",
      },
    ],
  },
  {
    //Quản lý đơn hàng
    name: "menu.admin.order",
    menus: [
      {
        name: "menu.admin.manage-order",
        link: "manage-order-redux",
      },
    ],
  },
];
