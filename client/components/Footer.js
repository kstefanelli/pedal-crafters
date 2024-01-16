import React from "react";

const Footer = () => (
  <div className='bottom-0 w-full left-0 right-0'>
    <div className='flex flex-col lg:flex-row items-center justify-center bg-[#f4f1e0] pt-8 md:pb-8 lg:px-10 md:px-7'>
      <ul className='w-full lg:text-center lg:items-center justify-center flex flex-col md:flex-row text-2xl lg:text-xl gap-2 lg:gap-4 text-start border-t border-[#321E1E] md:border-none pt-2 lg:pt-0'>
        {[
          { link: "https://kristinastefanelli.com", text: "CONTACT" },
          { link: "https://github.com/kstefanelli", text: "GITHUB" },
          { link: "", text: "FAQS" },
          { link: "", text: "PRIVACY POLICY" },
          { link: "", text: "TERMS OF SERVICE" },
        ].map((item, index) => (
          <li
            key={index}
            className='md:border-none border-b pb-2 md:pb-0 border-[#321E1E]'
          >
            <a
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
              className='pl-2 md:pl-0 text-[#321E1E] font-bold transition duration-200 hover:text-[#FFA364]'
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
      <p className='md:hidden pl-0 text-[#321E1E] font-extrabold text-[46px] tracking-tight'>
        PEDALCRAFTERS
      </p>
    </div>
  </div>
);

export default Footer;
