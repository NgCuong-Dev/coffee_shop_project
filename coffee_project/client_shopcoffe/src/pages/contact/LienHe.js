import { useRef } from 'react'
export default function LienHe() {
  const formRef = useRef()
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(email)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const emailInput = formData.get('email')
    if (!emailInput || !validateEmail(emailInput)) {
      alert('Email không hợp lệ. Vui lòng nhập email hợp lệ.')
      return
    }
  const data = {
      name: formData.get('name'),
      email: emailInput,
      content: formData.get('content'),
    }
  fetch('http://localhost:4001/api/v1/contact/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          alert('Gửi thông tin thành công')
        } else {
          alert('Có lỗi xảy ra khi gửi thông tin')
        }
      })
      .catch((error) => {
        console.error('Lỗi:', error)
      })}
  return (
    <div className="mt-7 p-5 md:px-0 md:max-w-[1180px] md:mx-auto pb-7">
      <div className="flex justify-center md:gap-x-6 md:px-4">
        <div className="col-span-2 md:col-span-1 w-[50%]">
          <form ref={formRef} autocomplete="false" action="#" className="md:mx-auto">
            <h1 className=" text-[29px] uppercase font-semibold mb-5">
              Contact
            </h1>
            <p className="text-[13.6px]">31A Lý Tự Trọng, Quận 1, TP.HCM</p>
            <div className="mt-3">
              <label for="name" className="block mb-1 text-sm text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                placeholder="Name"
              />
            </div>
            <div className="mt-2">
              <label for="email" className="block mb-1 text-sm text-gray-900">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                placeholder="Email"
              />
            </div>
            <div className="mt-2">
              <label for="message" className="block mb-1 text-sm text-gray-900">
                Message
              </label>
              <textarea
                name="content"
                id="message"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full px-2.5 py-1.5 "
                placeholder="Message"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className=" mt-5 hover:opacity-80 h-[38px] rounded-full py-1 text-[14px] w-full bg-black text-white"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
