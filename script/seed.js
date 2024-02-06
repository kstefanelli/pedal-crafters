"use strict";

const {
  db,
  models: { User, Product, CartItem, Order },
} = require("../server/db");

const products = [
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of gravek cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "gravel",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "gravel",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced gravel bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "gravel",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "gravel",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "road",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of gravel cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "gravel",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "gravel",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced gravel bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "gravel",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "gravel",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "road",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of gravel cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "gravel",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "gravel",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced gravel bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "gravel",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "gravel",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "road",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of gravel cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "gravel",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "gravel",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced gravel bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "gravel",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "gravel",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "road",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of gravel cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "gravel",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "gravel",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced gravel bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "gravel",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "gravel",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "road",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of track cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "track",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "track",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced track bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "track",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "track",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "tracklocross",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of track cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "track",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "track",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced track bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "track",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "track",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "tracklocross",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of track cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "track",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "track",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced track bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "track",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "track",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "tracklocross",
  },
  {
    name: "875 MADISON RS PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/875-Madison-Rs/875-MADISON-RS-PROTEAM-BLACK-GLOSSY.jpg",
    price: 2500,
    description:
      "The Madison event is the ultimate symbol of track cycling. With its high-performance carbon composition, this 875 MADISON RS Proteam Black Glossy is an ode to the discipline. 20% high modulus carbon fibers make it impressively stiff and reactive. There is a good reason why it is the machine of choice for Olympic and world champions. Weighing but a breath over 7kg, it features a full Made by LOOK component range, from the seatpost to the stem and handlebars. The TRACK Black wheelset completes the glossy black package, set off by a white LOOK logo and the famous Mondrian line.",
    category: "track",
  },
  {
    name: "LAL 464 P PROTEAM BLACK GLOSSY",
    imageURL:
      "https://www.lookcycle.com/media/cache/product_large_thumbnail/products-bikes-2024/AL-464-P/AL-464-P-PROTEAM-BLACK-GLOSSY.jpg",
    price: 1800,
    description:
      "Available in a design that perfectly blends classic black and LOOK Mondrian, it features a 100% carbon, Made by LOOK seatpost.",
    category: "track",
  },
  {
    name: "PINARELLO MAAT FRAMESET",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkp_o7f6sk7xoNaNpfh9AEPikWhURq2AllA&usqp=CAU",
    price: 6500,
    description:
      "Maat is the most advanced track bike on the market and was conceived by listening to and involving technicians and athletes of the Italian National Team in all the design phases, from the definition of the technical characteristics of the frame and the design of the new integrated handlebar, to the study of particular specifications. geometries that can also be used in Sprint tests, given the exceptional lateral stiffness.",
    category: "track",
  },
  {
    name: "6061 BLACK LABEL V3 - GREY / FUCHSIA",
    imageURL:
      "https://www.statebicycle.com/cdn/shop/files/StateBicycleCo.6061BlackLabelv3-Grey_Fuchsia-1.jpg?v=1696826527",
    price: 749,
    description:
      "Introducing the 6061 Black Label v3 by State Bicycle Co.: A pinnacle in performance-focused urban cycling. Crafted with a lightweight aluminum frame, versatile 38c tire support, and a full-carbon fork.",
    category: "track",
  },
  {
    name: "EARTHSTONE - CORE-LINE",
    imageURL: "https://shop.gear.com/cdn/shop/files/StateBicycleCo.-Earthstone-Core-Line-2.jpg?v=1699996327&width=1000",
    price: 399,
    description: "Our Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality components, a flip-flop hub that will allow you to ride fixed gear or freewheel and Cult x Vans ‘waffle pattern” grips will keep you comfortable and riding hassle-free for years to come.",
    category: "tracklocross",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(products.map((product) => Product.create(product)));

    const admin = await User.create({
      email: "admin@gmail.com",
      password: "123",
      firstName: "Admin",
      lastName: "Admin",
      address: "1 Bike Blvd",
      isAdmin: true,
    });

    const bikeaddict = await User.create({
      email: "ilovebikes@bikes.com",
      password: "ilovebikes",
      firstName: "Ride",
      lastName: "Bikes",
      address: "600 RideYaBike Lane",
      isAdmin: false,
    });

    const bikeProducts = {};
    for (let i = 1; i <= 34; i++) {
      bikeProducts[`bike${i}`] = await Product.findByPk(i);
    }

    // admin orders
    const order1 = await Order.create({ status: "open" });
    const order2 = await Order.create({ status: "closed" });

    // user1 orders
    const order3 = await Order.create({ status: "open" });
    const order4 = await Order.create({ status: "closed" });

    // admin
    await order1.setUser(admin); // open
    await order2.setUser(admin); // closed

    // user1
    await order3.setUser(bikeaddict); // open
    await order4.setUser(bikeaddict); // closed

    // admin orders
    await order1.addProducts(Object.values(bikeProducts).slice(4, 6)); // open
    await order2.addProducts([bikeProducts.bike2, bikeProducts.bike3]); // closed

    // user1 orders
    await order3.addProducts(Object.values(bikeProducts).slice(2, 3)); // open
    await order4.addProducts(Object.values(bikeProducts).slice(0, 6)); // closed
  } catch (err) {
    console.log(err);
  }
};

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
