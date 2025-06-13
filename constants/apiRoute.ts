const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_API || "https://api.katunje.com/v1";
const withBase = (path: string) => `${BASE_URL}${path}`;
export const API_ROUTES = {
  AUTH: {
    SUPERADMIN_LOGIN: withBase("/auth/login"),
    REGIONAL_ADMIN_LOGIN: withBase("/api/auth/regional-admin/login"),
    CUSTOMER_LOGIN: withBase("/api/auth/customer/login"),
    GOOGLE_LOGIN: withBase("/auth/google"),
    USER_DETAILS: withBase("/auth/user-details"),
    VERIFY_EMAIL: withBase("/auth/verify-email-otp"),
    RESEND_VERIFY_EMAIL: withBase("/auth/resend-verify-email-otp"),
    SEND_FORGOT_PASSWORD_LINK: withBase("/auth/forget-password-email-otp"),
    CHANGE_PASSWORD: withBase("/auth/reset-password"),
    VERIFY_FORGOT_PASSWORD_OTP: withBase("/auth/verify-forgot-password-otp"),
  },
  REGION: {
    FETCH_ALL_REGION: withBase("/region/fetch-all-region"),
    FETCH_REGION_BY_SYMBOL: withBase("/region/fetch-region-by-symbol/"),
  },
  CATEGORY: {
    FETCH_ALL_CATEGORY: withBase("/category/fetch-all-categories"),
    FETCH_ALL_SUB_CATEGORY: withBase("/category/fetch-all-sub-categories"),
  },
  BLOG: {
    FETCH_ALL_BLOG: withBase("/blog/fetch-all-blogs"),
    FETCH_ALL_BLOG_CATEGORY: withBase("/blog-category/fetch-all-categories"),
  },
  SUPERADMIN_DASHBOARD: {
    DASHBOARD_ANALYTICS: withBase("/super-admin/fetch-dashboard-summary"),
    MONTHLY_METRICS: withBase("/super-admin/fetch-monthly-metrics"),
    FETCH_ALL_REGIONAL_ADMIN: withBase(
      "/super-admin/fetch-all-regional-admin"
    ),
    FETCH_ALL_CUSTOMER: withBase("/super-admin/fetch-all-customer"),
    SEARCH_REGIONAL_ADMIN: withBase("/super-admin/search-regional-admin"),
    ADD_REGIONAL_ADMIN: withBase("/super-admin/create-regional-admin"),
    DELETE_REGIONAL_ADMIN: withBase("/super-admin/delete-regional-admin"),
    SEARCH_CUSTOMER: withBase("/super-admin/search-customer"),
    ADD_CATEGORY: withBase("/category/create-product-category"),
    ADD_SUBCATEGORY: withBase("/subcategory/create-subcategory"),
    UPDATE_CATEGORY: withBase("/category/update-product-category"),
    DELETE_CATEGORY: withBase("/category/delete-category/"),
    ADD_BLOG: withBase("/blog/create-blog"),
    FETCH_ALL_COUPON: withBase("//coupon/fetch-all-coupons"),
    ADD_REGION: withBase("/region/create-region"),
    UPDATE_REGION: withBase("/region/update-region"),
    DELETE_REGION: withBase("/region/delete-region/"),
    UPDATE_BLOG: withBase("/blog/update-blog/"),
    DELETE_BLOG: withBase("/blog/delete-blog/"),
  },
  REGIONAL_ADMIN_DASHBOARD: {
    DASHBOARD_ANALYTICS: withBase("/regional-admin/fetch-dashboard-summary"),
    MONTHLY_METRICS: withBase("/regional-admin/fetch-monthly-metrics"),
    FETCH_ALL_CUSTOMER: withBase("/regional-admin/fetch-all-customer"),
    SEARCH_CUSTOMER: withBase("/regional-admin/search-customer"),
  },
  SUPERADMIN_ADMIN: {
    DELETE_REGIONAL_ADMIN: withBase("/super-admin/delete-regional-admin"),
    UPDATE_REGIONAL_ADMIN: withBase("/super-admin/update-regional-admin/"),
    FETCH_ALL_PRODUCT: withBase("/super-admin/fetch-all-products"),
    SEARCH_PRODUCT: withBase("/super-admin/search-products"),
    FETCH_ALL_ORDERS: withBase("/super-admin/fetch-all-orders"),
    SEARCH_ORDER: withBase("/super-admin/search-orders"),
  },
  REGIONAL_ADMIN: {
    DELETE_CUSTOMER: withBase("/regional-admin/delete-customer"),
    UPDATE_CUSTOMER: withBase("/regional-admin/update-customer/"),
    FETCH_ALL_PRODUCT: withBase("/regional-admin/fetch-all-products"),
    SEARCH_PRODUCT: withBase("/regional-admin/search-products"),
    FETCH_ALL_ORDERS: withBase("/regional-admin/fetch-all-orders"),
    SEARCH_ORDER: withBase("/regional-admin/search-orders"),
    ADD_PRODUCT: withBase("/regional-admin/create-product"),
    FETCH_ALL_COUPON: withBase("/regional-admin/fetch-all-coupons?"),
    UPDATE_PRODUCT: withBase("/product/update-product/"),
    DELETE_PRODUCT: withBase("/regional-admin/delete-product/"),
    UPDATE_ORDER_STATUS: withBase("/order/update-order-status/"),
    FETCH_ALL_BANNER: withBase("/regional-admin/fetch-banners?"),
  },
  COUPON: {
    FETCH_ALL_COUPON: withBase("/coupon/fetch-all-coupons?"),
    ADD_COUPON: withBase("/coupon/create-coupon"),
    UPDATE_COUPON: withBase("/coupon/update-coupon/"),
    DELETE_COUPON: withBase("/coupon/delete-coupon/"),
  },
  NEWSLETTER: {
    FETCH_ALL_NEWSLETTER: withBase("/newsletter/fetch-all-newsletter?"),
    FETCH_NEWSLETTER_BY_REGION: withBase(
      "/newsletter/fetch-newsletter-by-regionId?"
    ),
    SEARCH_NEWSLETTER: withBase("/newsletter/search-newsletter?"),
  },
  BANNER: {
    FETCH_ALL_BANNER: withBase("/super-admin/fetch-all-banner?"),
    ADD_BANNER: withBase("/banner/create-banner"),
    UPDATE_BANNER: withBase("/banner/update-banner/"),
    DELETE_BANNER: withBase("/banner/delete-banner/"),
  },
  PRODUCT: {
    FETCH_ALL_PRODUCT_SIZE: withBase("/product-size/fetch-product-size"),
    FETCH_ALL_PRODUCT_COLOR: withBase("/product-color/fetch-product-color"),
  },
  S3: {
    S3_UPLOAD: withBase("/upload"),
  },
};
