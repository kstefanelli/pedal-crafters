import React from "react";

const Footer = () => (
  <div className='bottom-0 w-full left-0 right-0'>
    <div className='bg-[#f4f1e0] p-7 lg:p-10 flex items-center justify-center'>
      <ul className='flex flex-col gap-2 md:flex-row text-start w-full lg:text-center lg:items-center justify-center m-0 p-0'>
        {[
          { link: "https://kristinastefanelli.com", text: "CONTACT" },
          { link: "https://github.com/kstefanelli", text: "GITHUB" },
          { link: "", text: "FAQS" },
          { link: "", text: "PRIVACY POLICY" },
          { link: "", text: "TERMS OF SERVICE" },
        ].map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#321E1E] transition duration-200 pr-10 font-bold hover:text-[#FFA364]'
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Footer;
