import { Logo } from "./Header";
import { FaLinkedinIn  } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <div className="h-screen w-full flex flex-col lg:gap-y-6">
      <header id="header" className="w-full py-6 px-8 flex justify-center items-center">
        <Logo/>
      </header>
      
      <section id="coming-soon" className="relative h-full w-full flex items-center lg:items-start justify-center">
          <div className="text-center z-10 max-w-4xl mx-auto px-8">

              <h1 className="text-text-primary-custom text-6xl md:text-8xl font-bold mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  Coming Soon
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold text-text-secondary-custom mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  Andrés Malvestiti
              </h2>
              
              <p className="text-lg text-text-secondary-custom mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                  Building something extraordinary. My portfolio is currently under construction, featuring innovative AI-powered projects and full-stack solutions.
              </p>
              
              <div className="mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "1s" }}>
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-code text-text-secondary-custom">Progress</span>
                      <span className="text-sm font-code text-accent-custom">75%</span>
                  </div>
                  <div className="w-full bg-dark-secondary-custom rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent-custom to-accent-custom-light h-2 rounded-full transition-all duration-1000 ease-out" style= {{ width: "75%", animationDelay: "1.2s" }}></div>
                  </div>
              </div>
              
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
                  <p className="text-text-secondary-custom mb-6">Want to get in touch? Reach out while I finish building.</p>
                  <div className="flex justify-center space-x-6">
                     <a
                        href="mailto:malvestitiandres@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary-custom hover:text-accent-custom transition-colors duration-300"
                      >
                        <FaEnvelope className="w-8 h-8"/>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/andres-malvestiti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary-custom hover:text-accent-custom transition-colors duration-300"
                      >
                        <FaLinkedinIn className="w-8 h-8"/>
                      </a>
                      <a
                        href="https://github.com/andresmalvestiti"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary-custom hover:text-accent-custom transition-colors duration-300"
                      >
                        <FaGithub className="w-8 h-8"/>
                      </a>
                  </div>
              </div>
          </div>
          
          <div className="absolute bottom-8 left-8 max-w-sm opacity-0 animate-fade-in hidden lg:block" style={{ animationDelay: "1.6s" }}>
            <div className="bg-dark-secondary-custom rounded-lg p-4 font-code text-sm text-text-secondary-custom border border-accent-custom/10">
              <div className="flex items-center mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-xs text-text-secondary-custom">terminal</span>
              </div>
              <div className="text-accent-custom">$ npm run build</div>
              <div className="text-green-400">✓ Building portfolio...</div>
              <div className="text-yellow-300">⚡ Optimizing AI components</div>
              <div className="text-blue-300">📦 Bundling assets</div>
              <div className="text-accent-custom">$ git commit -m "Almost ready"</div>
              <div className="animate-pulse text-text-primary-custom font-bold">_</div>
            </div>
          </div>
          
          <div className="absolute top-1/4 right-16 opacity-0 animate-fade-in hidden md:block" style={{ animationDelay: "1.8s" }}>
            <div className="w-16 h-16 border-2 border-accent-custom/30 rounded-lg animate-bounce-slow"></div>
          </div>
          
          <div className="absolute bottom-1/3 right-1/4 opacity-0 animate-fade-in hidden lg:block" style={{ animationDelay: "2s" }}>
            <div className="w-8 h-8 bg-accent-custom/20 rounded-full animate-pulse-slow"></div>
          </div>
      </section>
    </div>
  );
}