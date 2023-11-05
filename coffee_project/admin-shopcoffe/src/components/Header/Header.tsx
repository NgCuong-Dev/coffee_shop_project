import { useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '~/apis/auth.api'
import { AppContext } from '~/contexts/app.context'
import useDarkMode from '~/hooks/useDarkMode'
import { clearLS } from '~/utils/auth'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { profile, reset } = useContext(AppContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    reset()
    clearLS()
    toast.success('Đăng xuất thành công!')
    navigate('/login')
  }
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    })
  }, [])
  return (
    <div
      ref={modalRef}
      id='drawer-navigation'
      className={`${showMenu ? 'mobile:translate-x-[0] ' : 'mobile:translate-x-[-100%] '
        } dark:bg-gray-700 w-[190px] mobile:fixed non-scroll dark:border-none border-r border-gray-300 top-0 relative left-0 z-40 h-screen p-4  transition-all  bg-white w-50 mobile:w-[180px]`}
      tabIndex={-1}
      aria-labelledby='drawer-navigation-label'
    >
      <div
        id='drawer-navigation-label'
        style={{ textAlign: 'center' }}
        className={` ${showMenu ? 'hidden' : ''
          } text-blue-400 flex justify-between items-center text-base font-semibold uppercase dark:text-gray-400 `}
      >
        {profile?.isAdmin && <h2 style={{ margin: 'auto' }}>Admin</h2>}
        {profile?.isStaff && <h2 style={{ margin: 'auto' }}>Nhân viên</h2>}
      </div>
      <div className='py-4 overflow-y-auto flex flex-col justify-between h-[90%]'>
        <ul className='space-y-2'>
          {profile?.isAdmin && (
            <li>
              <Link
                to='/'
                className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg fill="#A2A2A8" width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <g>
                        <path d="M26,19.4V14a2,2,0,0,0-4,0v5.4A5.1,5.1,0,0,0,19,24a5,5,0,0,0,10,0A5.1,5.1,0,0,0,26,19.4Z" />
                        <path d="M24,2A22.1,22.1,0,0,0,2,24,21.6,21.6,0,0,0,8.3,39.4a1.9,1.9,0,0,0,2.8,0h0l3-3a2,2,0,0,0-2.8-2.8L9.8,35.1A19.2,19.2,0,0,1,6.1,26H8a2,2,0,0,0,0-4H6.1a18.5,18.5,0,0,1,3.8-9.2h0l1.4,1.3a1.9,1.9,0,0,0,2.8,0,1.9,1.9,0,0,0,0-2.8L12.8,9.9h0A18.5,18.5,0,0,1,22,6.1h0V8a2,2,0,0,0,4,0V6.1h0a18.5,18.5,0,0,1,9.2,3.8h0l-1.3,1.4a1.9,1.9,0,0,0,0,2.8,1.9,1.9,0,0,0,2.8,0l1.4-1.3h0A18.5,18.5,0,0,1,41.9,22H40a2,2,0,0,0,0,4h1.9a19.2,19.2,0,0,1-3.7,9.1l-1.5-1.5a2,2,0,1,0-2.8,2.8L37,39.5a2,2,0,0,0,2.7-.1A21.6,21.6,0,0,0,46,24,22.1,22.1,0,0,0,24,2Z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <div>Dashboard</div>
              </Link>
            </li>
          )}
          {profile?.isStaff && (
            <li>
              <Link
                to='/'
                className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg fill="#A2A2A8" width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <g>
                        <path d="M26,19.4V14a2,2,0,0,0-4,0v5.4A5.1,5.1,0,0,0,19,24a5,5,0,0,0,10,0A5.1,5.1,0,0,0,26,19.4Z" />
                        <path d="M24,2A22.1,22.1,0,0,0,2,24,21.6,21.6,0,0,0,8.3,39.4a1.9,1.9,0,0,0,2.8,0h0l3-3a2,2,0,0,0-2.8-2.8L9.8,35.1A19.2,19.2,0,0,1,6.1,26H8a2,2,0,0,0,0-4H6.1a18.5,18.5,0,0,1,3.8-9.2h0l1.4,1.3a1.9,1.9,0,0,0,2.8,0,1.9,1.9,0,0,0,0-2.8L12.8,9.9h0A18.5,18.5,0,0,1,22,6.1h0V8a2,2,0,0,0,4,0V6.1h0a18.5,18.5,0,0,1,9.2,3.8h0l-1.3,1.4a1.9,1.9,0,0,0,0,2.8,1.9,1.9,0,0,0,2.8,0l1.4-1.3h0A18.5,18.5,0,0,1,41.9,22H40a2,2,0,0,0,0,4h1.9a19.2,19.2,0,0,1-3.7,9.1l-1.5-1.5a2,2,0,1,0-2.8,2.8L37,39.5a2,2,0,0,0,2.7-.1A21.6,21.6,0,0,0,46,24,22.1,22.1,0,0,0,24,2Z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <div>Dashboard</div>
              </Link>
            </li>
          )}
          {/* <li>
            <Link
              to='/comment'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#A2A2A8" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.49999 20.25C4.37892 20.2521 4.25915 20.2248 4.1509 20.1705C4.04266 20.1163 3.94916 20.0366 3.87841 19.9383C3.80766 19.8401 3.76175 19.7261 3.74461 19.6063C3.72747 19.4864 3.73961 19.3641 3.77999 19.25L5.37999 14C5.03175 13.0973 4.85539 12.1375 4.85999 11.17C4.8584 10.1057 5.06918 9.0518 5.47999 8.06999C5.88297 7.13047 6.45975 6.27549 7.17999 5.54999C7.90382 4.82306 8.76344 4.24545 9.70999 3.84999C10.6889 3.4344 11.7415 3.22021 12.805 3.22021C13.8685 3.22021 14.9211 3.4344 15.9 3.84999C17.3341 4.46429 18.5573 5.48452 19.4191 6.7851C20.2808 8.08568 20.7434 9.60985 20.75 11.17C20.7437 13.2771 19.9065 15.2966 18.42 16.79C17.6945 17.5102 16.8395 18.087 15.9 18.49C14.0091 19.2819 11.8865 19.3177 9.96999 18.59L4.71999 20.19C4.64977 20.22 4.57574 20.2402 4.49999 20.25ZM12.8 4.74999C11.5334 4.75547 10.2962 5.13143 9.24068 5.83153C8.18519 6.53164 7.35763 7.52528 6.85999 8.68999C6.19883 10.2911 6.19883 12.0889 6.85999 13.69C6.91957 13.8548 6.91957 14.0352 6.85999 14.2L5.62999 18.37L9.77999 17.11C9.94477 17.0504 10.1252 17.0504 10.29 17.11C11.0824 17.439 11.932 17.6083 12.79 17.6083C13.648 17.6083 14.4976 17.439 15.29 17.11C16.0708 16.7813 16.779 16.3018 17.3742 15.6989C17.9693 15.096 18.4397 14.3816 18.7583 13.5967C19.077 12.8118 19.2376 11.9717 19.231 11.1245C19.2244 10.2774 19.0508 9.4399 18.72 8.65999C18.2234 7.50094 17.398 6.51285 16.3459 5.81792C15.2937 5.123 14.0609 4.75171 12.8 4.74999Z" fill="#A2A2A8" />
              </svg>
              <div>Bình luận</div>
            </Link>
          </li> */}
          <li>
            <Link
              to='/product'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg width="24" height="24" viewBox="0 0 20 20" fill="#A2A2A8" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" fill="none" width="20" height="20" />
                <g>
                  <path d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5 .71 0 1.39.15 2 .42.61-.27 1.29-.42 2-.42 2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02c.63.84 1.02 1.87 1.02 3v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z" />
                </g>
              </svg>
              <div>Sản phẩm</div>
            </Link>
          </li>
          <li>
            <Link
              to='/category'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#A2A2A8" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" fill="#A2A2A8" />
                <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" fill="#A2A2A8" />
                <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" fill="#A2A2A8" />
                <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" fill="#A2A2A8" />
              </svg>
              <div>Danh mục</div>
            </Link>
          </li>
          <li>
            <Link
              to='/contact'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg fill="#A2A2A8" width="24" height="24" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <g id="_x32_5_attachment" />
                <g id="_x32_4_office" />
                <g id="_x32_3_pin" />
                <g id="_x32_2_business_card" />
                <g id="_x32_1_form" />
                <g id="_x32_0_headset" />
                <g id="_x31_9_video_call" />
                <g id="_x31_8_letter_box" />
                <g id="_x31_7_papperplane" />
                <g id="_x31_6_laptop" />
                <g id="_x31_5_connection" />
                <g id="_x31_4_phonebook" />
                <g id="_x31_3_classic_telephone" />
                <g id="_x31_2_sending_mail" />
                <g id="_x31_1_man_talking" />
                <g id="_x31_0_date" />
                <g id="_x30_9_review" />
                <g id="_x30_8_email">
                  <g>
                    <g>
                      <path fill="#A2A2A8" d="M35.0137,31.8325c0.5488-0.0596,0.9453-0.5532,0.8857-1.1021c-0.0596-0.5493-0.5518-0.9434-1.1025-0.8862     c-6.4932,0.7036-9.5806-1.688-11.0259-3.8203c-2.0195-2.98-2.0645-7.2817-0.1143-10.959     c1.9429-3.6626,5.356-5.7627,9.3657-5.7627c0.001,0,0.002,0,0.0029,0c3.0547,0,5.7949,1.2461,7.3301,3.3325     c1.6016,2.1763,1.8633,5.2012,0.7578,8.7485c-0.4336,1.3921-1.8486,3.2183-3.0938,3.5781     c-0.5078,0.1484-0.9092,0.0938-1.2236-0.1665c-0.3623-0.3013-0.4922-0.769-0.4814-0.9541     c0.002-0.0117,0.0029-0.0225,0.0039-0.0342l1.0957-10.9561c0.0586-0.5493-0.3389-1.042-0.8877-1.1001     c-0.5586-0.061-1.042,0.3389-1.1006,0.8882l-0.0969,0.9086c-0.0175-0.013-0.0319-0.0287-0.0496-0.0414     c-1.2813-0.9214-3.0767-1.0112-4.8047-0.2397c-2.9424,1.3115-5.0669,5.48-4.5469,8.9199c0.3901,2.5801,2.209,4.251,4.9917,4.5845     c1.2773,0.1519,2.8452-0.2251,4.0083-1.085c0.1689,0.2427,0.3682,0.4634,0.5908,0.6484     c0.8242,0.6836,1.9092,0.8794,3.0566,0.5488c2.0088-0.5811,3.8389-2.9502,4.4482-4.9048     c1.6445-5.2793,0.333-8.6396-1.0566-10.5283c-1.9111-2.5972-5.2539-4.1475-8.9414-4.1475c-0.001,0-0.002,0-0.0029,0     c-4.7739,0-8.8315,2.4878-11.1323,6.8252c-2.293,4.3232-2.2046,9.4331,0.2256,13.0186     c2.1333,3.1475,5.8232,4.8188,10.5332,4.8188C33.4111,31.9648,34.2002,31.9209,35.0137,31.8325z M34.9131,17.4961l-0.5693,5.9414     c-0.5811,0.9546-2.1055,1.4746-3.1875,1.3472c-1.9009-0.228-2.9946-1.2026-3.251-2.8975     c-0.3848-2.5454,1.2593-5.8477,3.3838-6.7949c0.5137-0.229,1.0332-0.3433,1.5107-0.3433c0.5029,0,0.96,0.1274,1.3115,0.3804     C34.7412,15.582,35.0176,16.4004,34.9131,17.4961z" />
                      <path fill="#A2A2A8" d="M59.3057,21.6533l-7.2637-4.4982V2c0-0.5522-0.4473-1-1-1H12.4771c-0.5522,0-1,0.4478-1,1v15.0159     c-3.4714,2.1884-5.806,3.7847-6.9165,4.7346c-1.5254,1.3042-2.3652,3.1631-2.3652,5.2334v29.0249     C2.1953,59.8638,5.3315,63,9.186,63h45.6284c1.8837,0,3.5925-0.7524,4.8508-1.9683c0.0023-0.0023,0.0054-0.003,0.0076-0.0053     c0.0011-0.0012,0.0013-0.0027,0.0024-0.0039c1.3107-1.2715,2.1294-3.0475,2.1294-5.0137V26.9839     C61.8047,25.2393,61.1504,22.7964,59.3057,21.6533z M52.042,19.5073l5.0593,3.1331l-5.0593,4.4129V19.5073z M58.784,23.826     c0.6964,0.7996,1.0207,2.077,1.0207,3.1579v29.0249c0,1.0747-0.3491,2.0649-0.9291,2.8804L39.5911,40.5665L58.784,23.826z      M13.4771,3H50.042v25.7969L31.998,44.5361l-18.521-16.1475V3z M11.4771,19.3841v7.2624L6.7792,22.551     C7.835,21.7673,9.4214,20.6976,11.4771,19.3841z M4.1953,56.0088V26.9839c0-1.1927,0.3796-2.2405,1.0782-3.0918l19.8513,17.3058     L5.7814,59.6376C4.8109,58.7264,4.1953,57.4419,4.1953,56.0088z M9.186,61c-0.5724,0-1.1138-0.1168-1.6263-0.295l19.0789-18.1874     l4.7021,4.0992c0.1885,0.1641,0.4229,0.2461,0.6572,0.2461s0.4692-0.082,0.6572-0.2466l5.4222-4.7294l19.3299,18.3657     C56.6494,60.7177,55.7672,61,54.8145,61H9.186z" />
                    </g>
                  </g>
                </g>
                <g id="_x30_7_information" />
                <g id="_x30_6_phone_talking" />
                <g id="_x30_5_women_talking" />
                <g id="_x30_4_calling" />
                <g id="_x30_3_women" />
                <g id="_x30_2_writing" />
                <g id="_x30_1_chatting" />
              </svg>
              <div>Liên hệ</div>
            </Link>
          </li>
          <li>
            <Link
              to='/order'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#A2A2A8" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="#A2A2A8" />
                <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" fill="#A2A2A8" />
                <path d="M11 10.8L12.1429 12L15 9" fill="none" />
                <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" fill="#A2A2A8" />
              </svg>
              <div>Đơn hàng</div>
            </Link>
          </li>
          {/* <li>
            <Link
              to='/message'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#A2A2A8" xmlns="http://www.w3.org/2000/svg">
                <path fill="#A2A2A8" d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" />
              </svg>
              <div>Tin nhắn</div>
            </Link>
          </li> */}
          {profile?.isAdmin && (
            <li>
              <Link
                to='/user'
                className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="6" r="4" fill='#A2A2A8' />
                  <path
                    fill='#A2A2A8'
                    d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634" />
                </svg>
                <div>Tài khoản</div>
              </Link>
            </li>
          )}
          <li>
            <Link
              to='/payment'
              className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#A2A2A8" xmlns="http://www.w3.org/2000/svg">
                <path fill="#A2A2A8" d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" />
              </svg>
              <div>Thanh toán</div>
            </Link>
          </li>
        </ul>
        <ul className='mt-auto'>
          <li className=''>
            <button onClick={toggleDarkMode} className='w-full'>
              {isDarkMode ? (
                <div className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M12 18.5455C10.264 18.5455 8.59918 17.8558 7.37166 16.6283C6.14415 15.4008 5.45455 13.736 5.45455 12C5.45455 10.264 6.14415 8.59918 7.37166 7.37166C8.59918 6.14415 10.264 5.45455 12 5.45455C13.736 5.45455 15.4008 6.14415 16.6283 7.37166C17.8558 8.59918 18.5455 10.264 18.5455 12C18.5455 13.736 17.8558 15.4008 16.6283 16.6283C15.4008 17.8558 13.736 18.5455 12 18.5455ZM12 16.3636C13.1573 16.3636 14.2672 15.9039 15.0856 15.0856C15.9039 14.2672 16.3636 13.1573 16.3636 12C16.3636 10.8427 15.9039 9.73278 15.0856 8.91444C14.2672 8.0961 13.1573 7.63636 12 7.63636C10.8427 7.63636 9.73278 8.0961 8.91444 8.91444C8.0961 9.73278 7.63636 10.8427 7.63636 12C7.63636 13.1573 8.0961 14.2672 8.91444 15.0856C9.73278 15.9039 10.8427 16.3636 12 16.3636ZM10.9091 1.09091C10.9091 0.488417 11.3975 0 12 0V0C12.6025 0 13.0909 0.488417 13.0909 1.09091V2.18182C13.0909 2.78431 12.6025 3.27273 12 3.27273V3.27273C11.3975 3.27273 10.9091 2.78431 10.9091 2.18182V1.09091ZM10.9091 21.8182C10.9091 21.2157 11.3975 20.7273 12 20.7273V20.7273C12.6025 20.7273 13.0909 21.2157 13.0909 21.8182V22.9091C13.0909 23.5116 12.6025 24 12 24V24C11.3975 24 10.9091 23.5116 10.9091 22.9091V21.8182ZM3.51491 5.05745C3.08895 4.63149 3.08895 3.94087 3.51491 3.51491V3.51491C3.94087 3.08895 4.63149 3.08895 5.05745 3.51491L5.82873 4.28618C6.25469 4.71214 6.25469 5.40277 5.82873 5.82873V5.82873C5.40277 6.25469 4.71214 6.25469 4.28618 5.82873L3.51491 5.05745ZM18.1713 19.7138C17.7453 19.2879 17.7453 18.5972 18.1713 18.1713V18.1713C18.5972 17.7453 19.2879 17.7453 19.7138 18.1713L20.4851 18.9425C20.9111 19.3685 20.9111 20.0591 20.4851 20.4851V20.4851C20.0591 20.9111 19.3685 20.9111 18.9425 20.4851L18.1713 19.7138ZM18.9421 3.51464C19.3682 3.0883 20.0594 3.08834 20.4855 3.51473V3.51473C20.9113 3.94083 20.9111 4.63141 20.4852 5.05736L19.7139 5.82864C19.2879 6.25465 18.5972 6.25465 18.1712 5.82864V5.82864C17.7452 5.4027 17.7452 4.71213 18.171 4.28609L18.9421 3.51464ZM4.28618 18.1713C4.71214 17.7453 5.40277 17.7453 5.82873 18.1713V18.1713C6.25469 18.5972 6.25469 19.2879 5.82873 19.7138L5.05746 20.4851C4.63149 20.9111 3.94087 20.9111 3.51491 20.4851V20.4851C3.08895 20.0591 3.08895 19.3685 3.51491 18.9425L4.28618 18.1713ZM22.9091 10.9091C23.5116 10.9091 24 11.3975 24 12V12C24 12.6025 23.5116 13.0909 22.9091 13.0909H21.8182C21.2157 13.0909 20.7273 12.6025 20.7273 12V12C20.7273 11.3975 21.2157 10.9091 21.8182 10.9091H22.9091ZM2.18182 10.9091C2.78431 10.9091 3.27273 11.3975 3.27273 12V12C3.27273 12.6025 2.78431 13.0909 2.18182 13.0909H1.09091C0.488417 13.0909 0 12.6025 0 12V12C0 11.3975 0.488417 10.9091 1.09091 10.9091H2.18182Z'
                      fill='#A2A2A8'
                    />
                  </svg>
                  <div>Tối</div>
                </div>
              ) : (
                <div className='flex gap-x-3 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9.6 6C9.59976 7.66877 10.0966 9.29979 11.0271 10.6851C11.9576 12.0703 13.2796 13.147 14.8245 13.7779C16.3695 14.4087 18.0673 14.5651 19.7015 14.2271C21.1161 13.9345 22.4275 13.3728 23.512 12.4539C23.698 12.2963 24 12.4229 24 12.6667C24 19.2943 18.6276 24 12 24C5.3724 24 0 18.6276 0 12C0 5.3724 4.70573 0 11.3333 0C11.6208 0 11.7699 0.35622 11.5841 0.575553C11.0336 1.22558 10.5844 1.95701 10.2534 2.74522C9.82058 3.77568 9.59843 4.88234 9.6 6ZM2.4 12C2.39913 14.142 3.11463 16.2227 4.43267 17.9112C5.75071 19.5996 7.59556 20.7987 9.67369 21.3178C11.7518 21.8368 13.9439 21.646 15.901 20.7756C17.8582 19.9052 19.468 18.4052 20.4744 16.5144C18.6833 16.9364 16.8141 16.8937 15.0442 16.3905C13.2742 15.8872 11.6622 14.9401 10.3611 13.6389C9.0599 12.3378 8.11278 10.7258 7.60954 8.95581C7.1063 7.18586 7.06364 5.31667 7.4856 3.5256C5.94909 4.34416 4.66414 5.5652 3.76831 7.05797C2.87247 8.55075 2.39949 10.2591 2.4 12Z'
                      fill='#A2A2A8'
                    />
                  </svg>
                  <div>Sáng</div>
                </div>
              )}
            </button>
          </li>
          <li>
            <Link
              to=''
              onClick={() => handleLogout()}
              className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <svg
                aria-hidden='true'
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='flex-1 ml-3 whitespace-nowrap'>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>
      <button
        type='button'
        onClick={() => setShowMenu(!showMenu)}
        className='absolute mobile:block hidden right-[-100px] bottom-[20px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      >
        {!showMenu ? 'Menu' : 'Đóng'}
      </button>
    </div>
  )
}

export default Header
