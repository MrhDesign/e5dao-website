export default function Home() {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="headline1 mb-6">
            Innovative Solutions for Your Business
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We provide cutting-edge technology solutions to help your business grow and succeed in the digital age
          </p>
          <a href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Get Started Today
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive solutions tailored to your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-blue-600 text-xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600">Modern, responsive websites built with the latest technologies</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Apps</h3>
              <p className="text-gray-600">Native and cross-platform mobile applications</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-purple-600 text-xl">☁️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud Solutions</h3>
              <p className="text-gray-600">Scalable cloud infrastructure and migration services</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About TechCorp Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 10 years of experience in the technology industry, we have helped hundreds of businesses 
                transform their operations and achieve their digital goals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of expert developers, designers, and consultants work closely with clients to deliver 
                innovative solutions that drive growth and efficiency.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Expert team of professionals</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Competitive pricing</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>On-time delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Contact us today for a free consultation</p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-2xl mb-2">📧</div>
              <div className="font-semibold">Email</div>
              <div>contact@techcorp.com</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📞</div>
              <div className="font-semibold">Phone</div>
              <div>+1 (555) 123-4567</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📍</div>
              <div className="font-semibold">Address</div>
              <div>123 Tech Street, Silicon Valley, CA</div>
            </div>
          </div>
          <a href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
}
