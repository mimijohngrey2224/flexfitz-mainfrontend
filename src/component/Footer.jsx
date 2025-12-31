import { IoLogoInstagram } from "react-icons/io5";
import ladelogoM from "/ladelogoM-removebg-preview.png";
import { BsFacebook } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";


function Footer() {
  return (
    <div>
         <footer className="footer bg-gray-900 text-white py-12 px-6 lg:px-24">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="logo text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-4">FLEXFITZ</h1>
            <img src={ladelogoM} alt="FlexFitz Logo" className="w-[160px] h-[130px] mx-auto lg:mx-0" />
          </div>

          {/* Links Section */}
          <div className="footer-links text-center lg:text-left">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li className="hover:text-yellow-500 transition-colors duration-200"><a href="#home">Home</a></li>
              <li className="hover:text-yellow-500 transition-colors duration-200"><a href="#contact">Contact</a></li>
              <li className="hover:text-yellow-500 transition-colors duration-200"><a href="#privacy-policy">Privacy Policy</a></li>
              <li className="hover:text-yellow-500 transition-colors duration-200"><a href="#terms">Terms and Conditions</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="social-media text-center lg:text-left">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>

            <div className="
              social-icons 
              flex 
              flex-wrap 
              justify-center 
              lg:justify-start 
              gap-6
            ">
              {/* Facebook no facebook for now*/}
              {/* <a
                href="https://www.facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transform transition duration-300 hover:scale-110 hover:text-blue-600"
              >
                <BsFacebook size={30} />
              </a> */}

              {/* Instagram */}
              <a
                href="https://www.instagram.com/leemahsflexfits"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transform transition duration-300 hover:scale-110 hover:text-pink-600"
              >
                <IoLogoInstagram size={30} />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@leemahsflexfitz1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="transform transition duration-300 hover:scale-110 hover:text-white"
              >
                <FaTiktok size={30} />
              </a>

              {/* Twitter no X for now/ X */}
              {/* <a
                href="https://twitter.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="transform transition duration-300 hover:scale-110 hover:text-gray-400"
              >
                <FaXTwitter size={30} />
              </a> */}

              {/* WhatsApp */}
              <a
                href="https://wa.me/+2347070588469"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transform transition duration-300 hover:scale-110 hover:text-green-500"
              >
                <FaWhatsapp size={30} />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&to=leemahsflexfitz@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="transform transition duration-300 hover:scale-110 hover:text-yellow-400"
              >
                <FaEnvelope size={30} />
              </a>


              {/* Email */}
              {/* <a
                href="mailto:support@leemahsflexfitz@gmail.com"
                aria-label="Email"
                className="transform transition duration-300 hover:scale-110 hover:text-yellow-400"
              >
                <FaEnvelope size={30} />
              </a> */}

              {/* <a
                href="mailto:leemahsflexfitz@gmail.com"
                aria-label="Email"
                className="transform transition duration-300 hover:scale-110 hover:text-yellow-400"
              >
                <FaEnvelope size={30} />
              </a> */}
            </div>
          </div>

        </div>
        
        {/* Bottom Section (Optional) */}
        <div className="mt-12 text-center text-sm">
          <p>&copy; 2025 FLEXFITZ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer