// 메뉴와 준비 중 페이지가 같은 주소·제목을 사용합니다.
export const profilePage = { path: '/my/profile', title: '프로필' }
export const sellerPage = { path: '/my/register-store', title: '우리 가게 마감팩 등록' }
export const myMenu = [
  { path: '/my/orders', title: '주문내역', icon: 'receipt' },
  { path: '/favorites', title: '찜한 가게', icon: 'heart' },
  { path: '/my/notification-settings', title: '알림 설정', icon: 'bell' },
  { path: '/my/payment-methods', title: '결제 수단', icon: 'card' },
  { path: '/my/support', title: '고객센터', icon: 'headphones' },
  { path: '/my/settings', title: '설정', icon: 'settings' },
]
export const myPlaceholderPages = [profilePage, sellerPage, ...myMenu.filter(item => item.path !== '/favorites')]
