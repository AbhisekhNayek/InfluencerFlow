
function Contact() {
  return (
    <div className="py-16 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">CONTACT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input name="name" placeholder="Name" className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input name="email" placeholder="Email" className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <input
              name="subject"
              placeholder="Subject"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
        <textarea
              name="message"
              placeholder="Message"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
            />
        </div>
          <input className="px-6 py-3 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300" type="submit" value="Send Message" />
      </div>
    </div>
  );
}
export default Contact;
