const fb_capi_token = process.env.FB_CAPI_TOKEN || '';
const fb_pixel_id = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
const base_url = process.env.NEXT_EXPRESS_SERVER_BASE_URL


const config = {  fb_capi_token,
  fb_pixel_id,
  base_url
};

export default config;