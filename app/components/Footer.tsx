export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 md:mb-0">TechCorp Solutions</div>
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="/support" className="hover:text-blue-400 transition-colors">
              Support
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} TechCorp Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}