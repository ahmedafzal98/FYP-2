const ContactUs = () => {
  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans">
      {/* Header with Nav */}
      <header className="flex items-center justify-between px-6 md:px-24 py-4 bg-[#f9f9f9]">
        <h1 className="text-xl font-bold text-black">SmartNewsHub</h1>
        <div className="space-x-4">
          <button className="text-black font-medium hover:underline">
            Log In
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition">
            Try for Free
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-6 md:px-24 text-sm text-gray-500 mb-4">
        Home &gt; Contact
      </div>

      {/* Page Layout */}
      <div className="px-6 md:px-24 grid md:grid-cols-2 gap-12 items-start pb-16">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-bold font-serif text-black mb-4">
            Read smarter, not harder.
          </h2>
          <p className="text-gray-600 mb-4">
            Power through articles, reports, and news — by reading and listening
            on your terms through SmartNewsHub.
          </p>
          <p className="text-gray-600 mb-6">
            Have a suggestion or issue to share? We’d love to hear from you.
            Reach out below or{" "}
            <span className="underline text-blue-600 cursor-pointer">
              contact our support team
            </span>
            .
          </p>
        </div>

        {/* Right Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-serif font-semibold text-black mb-2">
            Leave us a message
          </h3>
          <p className="text-sm text-blue-600 mb-6 cursor-pointer hover:underline">
            Or contact sales
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent successfully! ✅");
            }}
          >
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="First & Last Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="eg: john@apple.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
