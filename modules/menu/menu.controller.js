import * as menuService from "./menu.service.js";

export const createMenu = async (req, res, next) => {
  try {
    const menu = await menuService.createMenuItem({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

export const getMenus = async (req, res, next) => {
  try {
    const menus = await menuService.getMenuList(req.query, req.query);

    res.status(200).json({
      success: true,
      count: menus.length,
      data: menus,
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuDetails = async (req, res, next) => {
  try {
    const menu = await menuService.getMenuBySlug(req.params.slug);

    if (!menu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};