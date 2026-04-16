const Footer = () => (
  <footer className="bg-gray-100 text-gray-600 text-sm border-t mt-12 py-8 px-4">
    <div className="max-w-4xl mx-auto text-center space-y-3">
      <p>
        © 2025 <span className="font-semibold text-gray-800">Sri Lanka Election Dashboard</span>. Built with{" "}
        <span className="font-medium text-gray-700">React</span>,{" "}
        <span className="font-medium text-gray-700">D3</span>, and{" "}
        <span className="font-medium text-gray-700">Tailwind CSS</span>.
      </p>
      <p>
        All rights reserved. Developed by{" "}
        <a
          href="https://isuruhansaka.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Isuru Hansaka
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
