export default function Services() {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive technology solutions designed to transform your business
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-blue-600 text-2xl">💻</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Web Development</h3>
              <p className="text-gray-600 mb-6">
                Custom web applications built with modern frameworks and technologies.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  React & Next.js Applications
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  E-commerce Solutions
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  API Development
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Database Design
                </li>
              </ul>
              <div className="text-blue-600 font-semibold">Starting from $5,000</div>
            </div>

            {/* Mobile Apps */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-green-600 text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Mobile Applications</h3>
              <p className="text-gray-600 mb-6">
                Native and cross-platform mobile apps for iOS and Android.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  React Native Development
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Native iOS & Android
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  App Store Deployment
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Push Notifications
                </li>
              </ul>
              <div className="text-blue-600 font-semibold">Starting from $8,000</div>
            </div>

            {/* Cloud Solutions */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-purple-600 text-2xl">☁️</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Cloud Solutions</h3>
              <p className="text-gray-600 mb-6">
                Scalable cloud infrastructure and migration services.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  AWS & Azure Setup
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  DevOps & CI/CD
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Cloud Migration
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Security & Monitoring
                </li>
              </ul>
              <div className="text-blue-600 font-semibold">Starting from $3,000</div>
            </div>

            {/* Digital Marketing */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-orange-600 text-2xl">📈</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Digital Marketing</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive digital marketing strategies to grow your business.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  SEO Optimization
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Social Media Marketing
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Content Strategy
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Analytics & Reporting
                </li>
              </ul>
              <div className="text-blue-600 font-semibold">Starting from $2,000/month</div>
            </div>

            {/* UI/UX Design */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-pink-600 text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">UI/UX Design</h3>
              <p className="text-gray-600 mb-6">
                Beautiful, user-friendly designs that convert visitors into customers.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  User Research
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Wireframing & Prototyping
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Visual Design
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Usability Testing
                </li>
              </ul>
              <div className="text-blue-600 font-semibold">Starting from $4,000</div>
            </div>

            {/* IT Consulting */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-indigo-600 text-2xl">🔧</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">IT Consulting</h3>
              <p className="text-gray-600 mb-6">
                Strategic technology consulting to optimize your business operations.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Technology Assessment
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Digital Transformation
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  System Integration
                </li>
                <li className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  Process Optimization
                </li>
              </ul>
              <div className="text-blue-600 font-semibold">Starting from $150/hour</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Let's discuss your project requirements</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Quote
            </a>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}